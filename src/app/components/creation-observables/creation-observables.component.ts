import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild} from '@angular/core';
import {from, fromEvent, Observable, of, Subject} from 'rxjs';
import {ajax} from 'rxjs/internal/ajax/ajax';

@Component({
  selector: 'app-creation-observables',
  templateUrl: './creation-observables.component.html',
  styleUrls: ['./creation-observables.component.scss'],
})
export class CreationObservablesComponent {


  ngOnInit(): void {
    // this.subscribeToObservable();
    // this.obs.subscribe((v) => console.log(v));
    this.getData('1');
  }

  clickObservable: Observable<Event> = fromEvent(document, 'click');
  static interval$: Observable<number> = new Observable<number>(
    (subscriber) => {
      let counter = 1;
      const interval = setInterval(() => {
        console.log('Emmited ', counter);
        subscriber.next(counter++);
      }, 2000);
      return () => {
        clearInterval(interval);
      };
    }
  );

  public getData(sub: string) {
    ajax<any>('https://random-data-api.com/api/name/random_name').subscribe(
      (data) => {
        console.log(sub + ' : ' + data.response.first_name);
      }
    );
  }

  private subscribeToObservable() {
    this.clickObservable.subscribe(() => {
      console.log(`The dom has been clicked!!`);
    });
  }
}

// const subscriptionInterval$ = CreationObservablesComponent.interval$.subscribe(
//     (x) => console.log(x)
// );

// // unsbscribe subscriptionInterval$
// setTimeout(() => {
//     console.log('unsbscribe ofInterval$ !!');
//     subscriptionInterval$.unsubscribe();
// }, 4000);
