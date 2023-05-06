import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { combineLatest, fromEvent } from 'rxjs';

@Component({
    selector: 'app-water-boiling',
    templateUrl: './water-boiling.component.html',
    styleUrls: ['./water-boiling.component.scss'],
})
export class WaterBoilingComponent implements AfterViewInit {
    @ViewChild('inp') inp!: ElementRef;
    @ViewChild('select') select!: ElementRef;
    test: string | number = 'Please fill the above form';

    ngAfterViewInit(): void {
        let inp$ = fromEvent<InputEvent>(this.inp.nativeElement, 'input');
        let select$ = fromEvent<Event>(this.select.nativeElement, 'input');
        combineLatest([inp$, select$]).subscribe(([inpEvent, selectEvent]) => {
            if ((selectEvent.target as HTMLSelectElement).value === 'c-to-f') {
                this.test =
                    (Number((inpEvent.target as HTMLInputElement).value) * 9) /
                        5 +
                    32;
            } else if (
                (selectEvent.target as HTMLSelectElement).value === 'f-to-c'
            ) {
                this.test =
                    ((Number((inpEvent.target as HTMLInputElement).value) -
                        32) *
                        5) /
                    9;
            } else {
                this.test = 'Please choose a conversion';
            }
        });
    }
}
