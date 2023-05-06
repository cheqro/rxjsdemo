import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { JInputModule } from "@kasso/weather";
import { AppComponent } from './app.component';
import { CreationObservablesComponent } from './components/creation-observables/creation-observables.component';
import { CreationOperatorsComponent } from './components/creation-operators/creation-operators.component';
import { WaterBoilingComponent } from './components/water-boiling/water-boiling.component';
import { PipeableOperatorsComponent } from './components/pipeable-operators/pipeable-operators.component';
import { DebounceTimeComponent } from './components/debounce-time/debounce-time.component';
import { UsersComponent } from './components/users/users.component';
import { BehaviorSubjectComponent } from './components/behavior-subject/behavior-subject.component';
import { CommunesComponent } from './components/communes/communes.component';

@NgModule({
    declarations: [
        AppComponent,
        CreationOperatorsComponent,
        CreationObservablesComponent,
        WaterBoilingComponent,
        PipeableOperatorsComponent,
        DebounceTimeComponent,
        UsersComponent,
        BehaviorSubjectComponent,
        CommunesComponent,
    ],
    imports: [BrowserModule, JInputModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
