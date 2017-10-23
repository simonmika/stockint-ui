import { Injectable } from "@angular/core"
import * as stockint from "stockint"


@Injectable()
export class DataService {
	private instrument = stockint.Instrument.open("SE0007692124")
	constructor() { }
	async getTransactions(): Promise<stockint.Transactions | undefined> {
		const instrument = await this.instrument
		return instrument ? await instrument.getTransactions() : undefined
	}
}
