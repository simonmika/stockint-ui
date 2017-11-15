import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
	name: "integer"
})
export class IntegerPipe implements PipeTransform {
	transform(value: number): string {
		return value ? Math.floor(value).toLocaleString() : "0"
	}
}
