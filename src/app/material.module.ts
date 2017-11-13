import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatTableModule, MatPaginatorModule, MatToolbarModule, MatTabsModule } from "@angular/material"

@NgModule({
	imports: [
		MatTableModule,
		MatPaginatorModule,
		MatToolbarModule,
		MatTabsModule,
	],
	exports: [
		MatTableModule,
		MatPaginatorModule,
		MatToolbarModule,
		MatTabsModule,
	],
})
export class MaterialModule { }
