import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { from, fromEvent, interval, of, timer } from 'rxjs';

@Component({
    selector: 'app-creation-operators',
    templateUrl: './creation-operators.component.html',
    styleUrls: ['./creation-operators.component.scss'],
})
export class CreationOperatorsComponent implements OnInit, AfterViewInit {
    @ViewChild('btn') btn!: ElementRef;

    ngOnInit(): void {
        of(1, 2).subscribe((a) => console.log(a));
        from([11, 22]).subscribe((v) => console.log(v));
        timer(3000).subscribe((x) => console.log(x));
        let intervalSub = interval(2000).subscribe((value) =>
            console.log('interval ', value)
        );
        setTimeout(() => {
            intervalSub.unsubscribe();
            console.log('Unsbscribe from interval Observable in 10Sec!');
        }, 10000);
    }

    ngAfterViewInit(): void {
        fromEvent<MouseEvent>(this.btn.nativeElement, 'click').subscribe((c) =>
            console.log('btn clicked !! ', c.type, c.x, c.y)
        );
    }
}
