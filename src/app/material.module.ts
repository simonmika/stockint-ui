import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import {
	MatTableModule,
	MatPaginatorModule,
	MatToolbarModule,
	MatTabsModule,
	MatProgressBarModule,
	MatProgressBar,
} from "@angular/material"

@NgModule({
	imports: [
		MatTableModule,
		MatPaginatorModule,
		MatToolbarModule,
		MatTabsModule,
		MatProgressBarModule,
	],
	exports: [
		MatTableModule,
		MatPaginatorModule,
		MatToolbarModule,
		MatTabsModule,
		MatProgressBarModule,
	],
})
export class MaterialModule { }
