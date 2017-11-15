import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core"
import { MatTableDataSource, MatSort } from "@angular/material"
import { DataService } from "../data.service"
import * as stockint from "stockint"

@Component({
	selector: "app-brokers-table",
	templateUrl: "./brokers-table.component.html",
	styleUrls: ["./brokers-table.component.css"],
	providers: [DataService],
})
export class BrokersTableComponent implements OnInit, AfterViewInit {
	displayedColumns = ["broker", "boughtPrice", "bought", "sold", "soldPrice", "netto"]
	source: MatTableDataSource<{ broker: string, netto: number, buy: { price: number, volume: number, count: number }, sell: { price: number, volume: number, count: number } }>
	@ViewChild(MatSort)
	sort: MatSort
	constructor(private dataService: DataService) { }
	ngOnInit() {
		this.dataService.transactions.then(t => {
			this.source = new MatTableDataSource(stockint.Brokers.create(t).map())
			if (this.sort)
				this.source.sort = this.sort
		})
	}
	ngAfterViewInit() {
		if (this.source)
			this.source.sort = this.sort
}
}
