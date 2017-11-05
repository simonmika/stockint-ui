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
	transactions: stockint.Transaction[]
	constructor(private dataService: DataService) { }

	ngOnInit() {
		this.dataService.transactions.then(t => this.transactions = t.map())
	}
}
