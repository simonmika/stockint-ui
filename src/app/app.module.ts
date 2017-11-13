import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { MatTableModule, MatPaginatorModule, MatCardModule, MatToolbarModule, MatTabsModule } from "@angular/material"

import { AppComponent } from "./app.component"
import { LineChartComponent } from "./line-chart/line-chart.component"
import { TransactionsTableComponent } from "./transactions-table/transactions-table.component"
import { IntervallInformationComponent } from "./intervall-information/intervall-information.component"
import { OrderBookComponent } from "./order-book/order-book.component"
import { CandlestickChartComponent } from "./candlestick-chart/candlestick-chart.component"

@NgModule({
	declarations: [
		AppComponent,
		LineChartComponent,
		TransactionsTableComponent,
		IntervallInformationComponent,
		OrderBookComponent,
		CandlestickChartComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MatTableModule,
		MatPaginatorModule,
		MatCardModule,
		MatToolbarModule,
		MatTabsModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
