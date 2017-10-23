import { Component, OnInit } from "@angular/core"
import * as d3 from "d3"
import * as moment from "moment"

import { DataService } from "./data.service"
import * as stockint from "stockint"

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"],
	providers: [DataService]
})
export class AppComponent implements OnInit {
	transactions: stockint.Transactions
	title = "StockInt"
	subtitle = "Line Chart"
	private margin = {top: 20, right: 20, bottom: 30, left: 50}
	private width: number
	private height: number
	private x: d3.ScaleTime<number, number>
	private y: d3.ScaleLinear<number, number>
	private svg: any
	private line: d3.Line<[number, number]>
	constructor(private dataService: DataService) {
		this.width = 900 - this.margin.left - this.margin.right
		this.height = 500 - this.margin.top - this.margin.bottom
	}
	private getTransactions() {
		this.dataService.getTransactions().then(t => {
			console.log("Got transactions")
			this.transactions = t
			console.log(this.transactions)
			this.initSvg()
			this.initAxis(this.transactions)
			this.drawAxis()
			this.drawLine(t ? t.split(stockint.Intervall.TenMinutes).map(d => ({ date: d.startTime, value: d.averagePrice })) : [])
			})
	}
	ngOnInit() {
		this.getTransactions()
	}
	private initSvg() {
		this.svg = d3.select("svg")
			.append("g")
			.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
	}

	private initAxis(d: stockint.Transactions) {
		this.x = d3.scaleTime().range([0, this.width])
		this.y = d3.scaleLinear().range([this.height, 0])
		this.x.domain([d.startTime, d.endTime])
		this.y.domain([d.minimumPrice, d.maximumPrice])
	}

	private drawAxis() {
		this.svg.append("g")
			.attr("class", "axis axis--x")
			.attr("transform", "translate(0," + this.height + ")")
			.call(d3.axisBottom(this.x))
		this.svg.append("g")
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
		this.line = d3.line()
			.x( (d: any) => this.x(d.date) )
			.y( (d: any) => this.y(d.value) )
		this.svg.append("path")
			.datum(data)
			.attr("class", "line")
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("d", this.line)
	}
}
