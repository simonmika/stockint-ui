import { Component, OnInit, ViewChild, ElementRef } from "@angular/core"
import * as d3 from "d3"

import { DataService } from "../data.service"
import * as stockint from "stockint"

@Component({
	selector: "app-prices-chart",
	template: "<svg #svg></svg>",
	providers: [DataService],
})
export class PricesChartComponent implements OnInit {
	private prices: stockint.Prices
	private margin = {top: 20, right: 20, bottom: 30, left: 50}
	private get width() { return Math.round(this.svg.nativeElement.clientWidth) }
	private get height() { return Math.round(this.svg.nativeElement.clientHeight) }
	private get plotWidth(): number { return this.width - this.margin.left - this.margin.right }
	private get plotHeight(): number { return this.height - this.margin.top - this.margin.bottom }
	private x: d3.ScaleLinear<number, number>
	private y: d3.ScaleLinear<number, number>
	private plot: d3.Selection<d3.BaseType, {}, HTMLElement, any>
	@ViewChild("svg")
	svg: ElementRef
	constructor(private dataService: DataService) { }
	ngOnInit() {
		this.dataService.prices.then(prices => {
			this.prices = prices
			d3.select(window).on("resize.updatesvg", () => this.draw())
			this.draw()
		})
	}
	private draw() {
		if (this.prices) {
			this.initSvg()
			this.initAxis(this.prices)
			this.drawAxis()
			this.drawLine(this.prices.volumes)
		}
	}
	private initSvg() {
		if (this.plot)
			this.plot.remove()
		this.plot = d3.select(this.svg.nativeElement)
			.attr("width", this.width)
			.attr("height", this.height)
			.append("g")
			.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
	}

	private initAxis(d: stockint.Prices) {
		this.x = d3.scaleLinear().range([0, this.plotWidth])
		this.y = d3.scaleLinear().range([this.plotHeight, 0])
		this.x.domain([d.minimumVolume, d.maximumVolume]).nice()
		this.y.domain([d.low, d.high]).nice()
	}

	private drawAxis() {
		this.plot.append("g")
			.attr("class", "axis axis--x")
			.attr("transform", "translate(0," + this.plotHeight + ")")
			.call(d3.axisBottom(this.x))
		this.plot.append("g")
			.attr("class", "axis axis--y")
			.call(d3.axisLeft(this.y))
	}

	private drawLine(data: {price: number, value: number}[]) {
		const line = d3.line<{price: number, value: number}>()
			.x(d => this.x(d.value))
			.y(d => this.y(d.price) )
		this.plot.append("path")
			.datum(data)
			.attr("class", "line")
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("d", line)
	}
}
