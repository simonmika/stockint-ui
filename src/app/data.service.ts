import { Injectable } from "@angular/core"
import * as stockint from "stockint"


@Injectable()
export class DataService {
	readonly instrument = stockint.Instrument.open("SE0007692124")
	private transactionsCache: Promise<stockint.Transactions>
	get transactions(): Promise<stockint.Transactions> {
		if (!this.transactionsCache)
			this.transactionsCache = this.instrument.then(async instrument => instrument ? await instrument.getTransactions() : undefined)
		return this.transactionsCache
	}
	private pricesCache: Promise<stockint.Prices>
	get prices(): Promise<stockint.Prices> {
		if (!this.pricesCache)
			this.pricesCache = this.transactions.then(transactions => stockint.Prices.create(transactions))
		return this.pricesCache
	}
	get orderBook(): Promise<stockint.OrderBook> {
		return this.instrument.then(async instrument => instrument ? await instrument.getOrderBook() : undefined)
	}
	constructor() { }
}
