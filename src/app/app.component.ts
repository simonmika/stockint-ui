import { Component, OnInit } from "@angular/core"

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
