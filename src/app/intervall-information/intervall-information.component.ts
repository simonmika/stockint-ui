import { Component, OnInit } from "@angular/core"
import { DataService } from "../data.service"
import * as stockint from "stockint"

@Component({
	selector: "app-intervall-information",
	templateUrl: "./intervall-information.component.html",
	styleUrls: ["./intervall-information.component.css"],
	providers: [DataService],
})
export class IntervallInformationComponent implements OnInit {
	transactions: stockint.Transactions
	constructor(private dataService: DataService) { }

	ngOnInit() {
		this.dataService.transactions.then(t => this.transactions = t)
	}
}
