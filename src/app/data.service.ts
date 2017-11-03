import { Injectable } from "@angular/core"
import * as stockint from "stockint"


@Injectable()
export class DataService {
	private instrument = stockint.Instrument.open("SE0007692124")
	private transactionsCache: Promise<stockint.Transactions>
	get transactions(): Promise<stockint.Transactions> {
		if (!this.transactionsCache)
			this.transactionsCache = this.instrument.then(async instrument => instrument ? await instrument.getTransactions() : undefined)
		return this.transactionsCache
	}
	get orderBook(): Promise<stockint.OrderBook> {
		return this.instrument.then(async instrument => instrument ? await instrument.getOrderBook() : undefined)
	}
	constructor() { }
}
