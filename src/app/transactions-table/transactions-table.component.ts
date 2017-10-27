import { Component, OnInit } from "@angular/core"
import { DataService } from "../data.service"
import * as stockint from "stockint"

@Component({
	selector: "app-transactions-table",
	templateUrl: "./transactions-table.component.html",
	styleUrls: ["./transactions-table.component.css"],
	providers: [DataService],
})
export class TransactionsTableComponent implements OnInit {
	transactions: stockint.Transactions
	constructor(private dataService: DataService) { }

	ngOnInit() {
		this.dataService.getTransactions().then(t => this.transactions = t)
	}
}