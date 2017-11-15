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
	MatIconModule,
	MatButtonModule,
} from "@angular/material"

@NgModule({
	imports: [
		MatTableModule,
		MatPaginatorModule,
		MatToolbarModule,
		MatTabsModule,
		MatProgressBarModule,
		MatSortModule,
		MatIconModule,
		MatButtonModule,
	],
	exports: [
		MatTableModule,
		MatPaginatorModule,
		MatToolbarModule,
		MatTabsModule,
		MatProgressBarModule,
		MatSortModule,
		MatIconModule,
		MatButtonModule,
	],
})
export class MaterialModule { }
