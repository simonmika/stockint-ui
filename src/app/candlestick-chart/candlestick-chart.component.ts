import { Component, OnInit, ViewChild, ElementRef } from "@angular/core"
import * as d3 from "d3"

import { DataService } from "../data.service"
import * as stockint from "stockint"
declare var techan: any

@Component({
	selector: "app-candlestick-chart",
	template: "<svg #svg></svg>",
	styleUrls: ["./candlestick-chart.component.css"],
	providers: [DataService],
})
export class CandlestickChartComponent implements OnInit {
	private transactions: stockint.Transactions
	private margin = {top: 20, right: 20, bottom: 30, left: 50}
	private width = 600
	private height = 500
	private get plotWidth(): number { return this.width - this.margin.left - this.margin.right }
	private get plotHeight(): number { return this.height - this.margin.top - this.margin.bottom }
	private x: d3.ScaleTime<number, number>
	private y: d3.ScaleLinear<number, number>
	private plot: d3.Selection<d3.BaseType, {}, HTMLElement, any>
	private candlestick: any
	@ViewChild("svg")
	svg: ElementRef
	constructor(private dataService: DataService) { }

	ngOnInit() {
		this.dataService.transactions.then(t => {
			this.transactions = t
			const splitted = t ? t.split(stockint.Intervall.FiveMinutes) : []
			this.plot = d3.select(this.svg.nativeElement)
				.attr("width", this.width)
				.attr("height", this.height)
				.append("g")
				.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
			this.x = techan.scale.financetime().range([0, this.plotWidth])
			this.y = d3.scaleLinear().range([this.plotHeight, 0])
			this.candlestick = techan.plot.candlestick().xScale(this.x).yScale(this.y)
			this.loadData(splitted)
		})
	}
	loadData(data: stockint.Transactions[]) {
		this.candlestick = techan.plot.candlestick().xScale(this.x).yScale(this.y)
		const accessor = this.candlestick.accessor()
		this.plot.append("g").attr("class", "candlestick")
		this.plot.append("g").attr("class", "x axis").attr("transform", "translate(0," + this.plotHeight + ")")

		this.plot.append("g")
						.attr("class", "y axis")
						.append("text")
						.attr("transform", "rotate(-90)")
						.attr("y", 6)
						.attr("dy", ".71em")
						.style("text-anchor", "end")
						.text("Price ($)")

		// Data to display initially
		this.draw(data)
	}
	draw(data: stockint.Transactions[]) {
		this.x.domain(data.map(this.candlestick.accessor().d))
		this.y.domain(techan.scale.plot.ohlc(data, this.candlestick.accessor()).domain())

		const xAxis = d3.axisBottom(this.x)
		const yAxis = d3.axisLeft(this.y)

		this.plot.selectAll("g.candlestick").datum(data).call(this.candlestick)
		this.plot.selectAll("g.x.axis").call(xAxis)
		this.plot.selectAll("g.y.axis").call(yAxis)
	}
}
