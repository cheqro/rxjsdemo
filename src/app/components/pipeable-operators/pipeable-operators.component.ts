import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';

@Component({
    selector: 'app-pipeable-operators',
    templateUrl: './pipeable-operators.component.html',
    styleUrls: ['./pipeable-operators.component.scss'],
})
export class PipeableOperatorsComponent implements OnInit {
    ngOnInit(): void {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!');
        let someObservable$ = new Observable<number>((subscriber) => {
            subscriber.next(1);
            subscriber.next(2);
            subscriber.next(3);
            subscriber.next(4);
            subscriber.next(5);
            //  subscriber.complete();
        });
        let subscribeToSomeObservable$ = someObservable$
            .pipe(
                filter((value) => value > 2),
                tap({
                    next: (next) => console.log('Spy:', next),
                    complete: () => console.log('Compleeeeete!!'),
                    error: (err) => console.log('error : ', err),
                    subscribe: () => console.log('subscribe to someObservable'),
                    unsubscribe: () =>
                        console.log('unsubscribe to someObservable'),
                    finalize: () => console.log('finalize to someObservable'),
                }),
                map((value) => value * 2)
            )
            .subscribe((x) => console.log('Output :', x));
        setTimeout(() => {
            subscribeToSomeObservable$.unsubscribe();
        }, 5000);
    }
}
