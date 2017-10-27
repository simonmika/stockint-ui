import { Component, OnInit } from "@angular/core"
import * as d3 from "d3"

declare namespace techan {
	let scale: {
		financetime: () => any
	}
	function candlestick(): Candlestick
	class Candlestick {
		xScale(scale: d3.ScaleTime<number, number>): Candlestick
		yScale(scale: d3.ScaleTime<number, number>): Candlestick
		accessor(): any
	}
}

import { DataService } from "./data.service"
import * as stockint from "stockint"

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"],
	providers: [DataService]
})
export class AppComponent implements OnInit {
	title = "StockInt"
	subtitle = "Line Chart"
	constructor(private dataService: DataService) {
	}
	ngOnInit() {
	}
}
