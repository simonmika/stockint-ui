import { Component, OnInit } from "@angular/core"
import { MatTableDataSource } from "@angular/material"
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
			this.maximumVolumeCache = Math.max(this.orderBook.buy.reduce((p, c) => c ? Math.max(p, c.volume) : p, 0), this.orderBook.sell.reduce((p, c) => c ? Math.max(p, c.volume) : p, 0))
		return this.maximumVolumeCache
	}
	readonly displayedColumns = ["buyCount", "buyVolume", "buyPrice", "buyShare", "sellShare", "sellPrice", "sellVolume", "sellCount"]
	source: MatTableDataSource<{ buy: stockint.Order; sell: stockint.Order; }>
	constructor(private dataService: DataService) { }

	ngOnInit() {
		this.dataService.orderBook.then(orderBook => {
			// orderBook = orderBook.selectDepth(10)
			this.orderBook = orderBook
			this.source = new MatTableDataSource(orderBook.zip())
		})
	}
}
