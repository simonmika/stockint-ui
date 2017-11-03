import { Component, OnInit } from "@angular/core"

import { DataService } from "../data.service"
import * as stockint from "stockint"

@Component({
	selector: "app-order-book",
	templateUrl: "./order-book.component.html",
	styleUrls: ["./order-book.component.css"],
	providers: [DataService],
})
export class OrderBookComponent implements OnInit {
	orderBook: stockint.OrderBook
	maximumVolumeCache: number
	get sellWidth() { return (this.orderBook.sell.volume > this.orderBook.buy.volume ? 100 : this.orderBook.sell.volume / this.orderBook.buy.volume * 100).toString() + "%" }
	get buyWidth() { return (this.orderBook.buy.volume > this.orderBook.sell.volume ? 100 : this.orderBook.buy.volume / this.orderBook.sell.volume * 100).toString() + "%" }
	get maximumVolume() {
		if (!this.maximumVolumeCache)
			this.maximumVolumeCache = Math.max(this.orderBook.buy.reduce((p, c) => Math.max(p, c.volume), 0), this.orderBook.sell.reduce((p, c) => Math.max(p, c.volume), 0))
		return this.maximumVolumeCache
	}
	constructor(private dataService: DataService) { }

	ngOnInit() {
		this.dataService.orderBook.then(orderBook => {
			orderBook = orderBook.selectDepth(5)
			this.orderBook = orderBook
		})
	}
}
