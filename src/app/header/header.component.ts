import { Component, OnInit } from "@angular/core"
import { DataService } from "../data.service"
import * as stockint from "stockint"

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.css"],
	providers: [DataService],
})
export class HeaderComponent implements OnInit {
	instrument: stockint.Instrument
	transactions: stockint.Transactions
	orderBook: stockint.OrderBook
	constructor(private dataService: DataService) { }

	ngOnInit() {
		this.dataService.instrument.then(i => this.instrument = i)
		this.dataService.transactions.then(t => this.transactions = t)
		this.dataService.orderBook.then(o => this.orderBook = o)
	}
}
