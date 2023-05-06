import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
    BehaviorSubject,
    catchError,
    debounceTime,
    EMPTY,
    fromEvent,
    interval,
    map,
    Observable,
    of,
    Subject,
    takeUntil,
    takeWhile,
    tap,
    timer,
} from 'rxjs';

@Component({
    selector: 'app-debounce-time',
    templateUrl: './debounce-time.component.html',
    styleUrls: ['./debounce-time.component.scss'],
})
export class DebounceTimeComponent implements AfterViewInit {
    @ViewChild('input') inp!: ElementRef;
    localDate: any = 0;
    subject: Subject<number> = new BehaviorSubject<number>(0);

    ngAfterViewInit(): void {
        this.timer(1000);
        let intervall = interval(2000).subscribe((next) =>
            this.subject.next(next)
        );
        setTimeout(
            () =>
                this.subject.subscribe((x) =>
                    console.log('second subscribtion of subject ', x)
                ),
            15000
        );
        setTimeout(() => intervall.unsubscribe(), 8000);
        this.subject.subscribe(console.log);
        let inp$ = fromEvent<Event>(this.inp.nativeElement, 'input')
            .pipe(
                debounceTime(2000),
                map((event) => (event.target as HTMLInputElement).value)
            )
            .subscribe((sub) => {
                console.log(sub);
                //console.log((sub.target as HTMLInputElement).value);
            });

        const clicks = fromEvent(document, 'click');
        const result = clicks.pipe(debounceTime(1000));
        result.subscribe((x) => console.log(x));
        let error$ = new Observable((subscriber) => {
            subscriber.error(new Error('failed!!!!'));
        });
        error$
            .pipe(catchError((err) => EMPTY))
            .subscribe((x) => console.log(x));
        const clicks1 = fromEvent<PointerEvent>(document, 'click');
        const result1 = clicks1
            .pipe(tap((t) => console.log(t.clientX + ' ..' + t.clientY)))
            .pipe(takeWhile((ev) => ev.clientX > 200));
        result1.subscribe((x) => console.log(x));

        let timer$$ = timer(30000);
        timer$$.subscribe({
            next: (value) => console.log('timer$$ notifier, value :: ', value),
            complete: () => console.log('complete of timer$$'),
            error: (err) => console.log('error ', err),
        });
        interval(1000)
            .pipe(takeUntil(timer$$))
            .subscribe((x) => console.log('interval ::: ' + x));
    }

    private timer(ms: number) {
        interval(ms)
            .pipe(map(() => new Date().toLocaleTimeString()))
            .subscribe((x) => {
                this.localDate = x;
            });
    }
}
