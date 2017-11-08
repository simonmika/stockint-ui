import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core"
import { MatTableDataSource } from "@angular/material"
import { DataService } from "../data.service"
import * as stockint from "stockint"

@Component({
	selector: "app-transactions-table",
	templateUrl: "./transactions-table.component.html",
	styleUrls: ["./transactions-table.component.css"],
	providers: [DataService],
})
export class TransactionsTableComponent implements OnInit, AfterViewInit {
	displayedColumns = ["price", "volume", "seller", "buyer", "time"]
	source: MatTableDataSource<stockint.Transaction>
	transactions: stockint.Transaction[]
	constructor(private dataService: DataService) { }
	ngOnInit() {
		this.dataService.transactions.then(t => this.source = new MatTableDataSource(this.transactions = t.map()))
	}
	ngAfterViewInit() {
	}
}
