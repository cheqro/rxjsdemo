import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
    selector: 'app-behavior-subject',
    templateUrl: './behavior-subject.component.html',
    styleUrls: ['./behavior-subject.component.scss'],
})
export class BehaviorSubjectComponent implements OnInit {
    subject = new BehaviorSubject<string>('non goal');
    goall: number = 0;

    ngOnInit(): void {
        setTimeout(() => {}, 3000);
        this.subject.subscribe(console.log);
    }

    goal() {
        this.subject.next('first goaal ' + this.goall++);
    }

    sub() {
        console.log('new subscriber .........');
        this.subject.subscribe(console.log);
        console.log(this.subject.getValue());
    }
}
