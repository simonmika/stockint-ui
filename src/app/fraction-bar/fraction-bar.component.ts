import { Component, OnInit, Input } from "@angular/core"

@Component({
	selector: "app-fraction-bar",
	templateUrl: "./fraction-bar.component.html",
	styleUrls: ["./fraction-bar.component.css"],
})
export class FractionBarComponent implements OnInit {
	@Input()
	value: number
	constructor() { }

	ngOnInit() {
	}

}
