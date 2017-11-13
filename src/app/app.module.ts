import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { MaterialModule } from "./material.module"

import { AppComponent } from "./app.component"
import { LineChartComponent } from "./line-chart/line-chart.component"
import { TransactionsTableComponent } from "./transactions-table/transactions-table.component"
import { IntervallInformationComponent } from "./intervall-information/intervall-information.component"
import { FractionBarComponent } from "./fraction-bar/fraction-bar.component"
import { OrderBookComponent } from "./order-book/order-book.component"
import { CandlestickChartComponent } from "./candlestick-chart/candlestick-chart.component"
import { PricesChartComponent } from "./prices-chart/prices-chart.component"

@NgModule({
	declarations: [
		AppComponent,
		LineChartComponent,
		TransactionsTableComponent,
		IntervallInformationComponent,
		FractionBarComponent,
		OrderBookComponent,
		CandlestickChartComponent,
		PricesChartComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MaterialModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
