import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    debounceTime,
    distinctUntilChanged,
    fromEvent,
    map,
    switchMap,
} from 'rxjs';
import { ajax } from 'rxjs/internal/ajax/ajax';

@Component({
    selector: 'app-communes',
    templateUrl: './communes.component.html',
    styleUrls: ['./communes.component.scss'],
})
export class CommunesComponent implements AfterViewInit {
    @ViewChild('inp') inp!: ElementRef;
    @ViewChild('resultats') resultats!: ElementRef;

    /**
     * Le résultat attendu via l'utilisation d'RxJS
     */

    ngAfterViewInit(): void {
        const frappes$ = fromEvent<PointerEvent>(
            this.inp.nativeElement,
            'input'
        )
            .pipe(
                map((event) => (event.target as HTMLInputElement).value),
                distinctUntilChanged(),
                debounceTime(500),
                switchMap((text) =>
                    ajax('https://geo.api.gouv.fr/communes?nom=' + text)
                ),
                map((resultats) => resultats.response)
            )
            .subscribe((communes) => {
                console.log(communes);
            });
    }
}
