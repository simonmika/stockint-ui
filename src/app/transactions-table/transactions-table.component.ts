import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core"
import { MatPaginator, MatTableDataSource } from "@angular/material"
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
	@ViewChild(MatPaginator) paginator: MatPaginator
	constructor(private dataService: DataService) { }
	ngOnInit() {
		this.dataService.transactions.then(t => {
			this.source = new MatTableDataSource(t.map().reverse())
			if (this.paginator)
				this.source.paginator = this.paginator
		})
	}
	ngAfterViewInit() {
		if (this.source)
			this.source.paginator = this.paginator
	}
}
