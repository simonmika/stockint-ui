import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import {
	MatTableModule,
	MatPaginatorModule,
	MatToolbarModule,
	MatTabsModule,
	MatProgressBarModule,
	MatProgressBar,
	MatSortModule,
} from "@angular/material"

@NgModule({
	imports: [
		MatTableModule,
		MatPaginatorModule,
		MatToolbarModule,
		MatTabsModule,
		MatProgressBarModule,
		MatSortModule,
	],
	exports: [
		MatTableModule,
		MatPaginatorModule,
		MatToolbarModule,
		MatTabsModule,
		MatProgressBarModule,
		MatSortModule,
	],
})
export class MaterialModule { }
