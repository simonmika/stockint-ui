import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { AppComponent } from "./app.component"
import { LineChartComponent } from "./line-chart/line-chart.component"

@NgModule({
	declarations: [
		AppComponent,
		LineChartComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
