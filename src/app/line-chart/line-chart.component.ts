import { Component, OnInit, ViewChild, ElementRef } from "@angular/core"
import * as d3 from "d3"

import { DataService } from "../data.service"
import * as stockint from "stockint"

@Component({
	selector: "app-line-chart",
	template: "<svg #svg></svg>",
	styleUrls: ["./line-chart.component.css"],
	providers: [DataService],
})
export class LineChartComponent implements OnInit {
	private transactions: stockint.Transactions
	private margin = {top: 20, right: 20, bottom: 30, left: 50}
	private width = 600
	private height = 500
	private get plotWidth(): number { return this.width - this.margin.left - this.margin.right }
	private get plotHeight(): number { return this.height - this.margin.top - this.margin.bottom }
	private x: d3.ScaleTime<number, number>
	private y: d3.ScaleLinear<number, number>
	private plot: d3.Selection<d3.BaseType, {}, HTMLElement, any>
	@ViewChild("svg")
	svg: ElementRef
	constructor(private dataService: DataService) { }
	ngOnInit() {
		this.dataService.transactions.then(t => {
			this.transactions = t
			this.initSvg()
			this.initAxis(this.transactions)
			this.drawAxis()
			const splitted = t ? t.split(stockint.Intervall.OneMinute) : []
			this.drawLine(splitted.map(d => ({ date: d.date, value: d.average })))
			this.drawLine(splitted.map(d => ({ date: d.date, value: d.low })))
		})
	}
	private initSvg() {
		this.plot = d3.select(this.svg.nativeElement)
			.attr("width", this.width)
			.attr("height", this.height)
			.append("g")
			.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
	}

	private initAxis(d: stockint.Transactions) {
		this.x = d3.scaleTime().range([0, this.plotWidth])
		this.y = d3.scaleLinear().range([this.plotHeight, 0])
		this.x.domain([d.date, d.endDate]).nice()
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
			.append("text")
			.attr("class", "axis-title")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Price ($)")
	}

	private drawLine(data: {date: Date, value: number}[]) {
		const line = d3.line<{date: Date, value: number}>()
			.x(d => this.x(d.date))
			.y(d => this.y(d.value) )
		this.plot.append("path")
			.datum(data)
			.attr("class", "line")
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("d", line)
	}
}
