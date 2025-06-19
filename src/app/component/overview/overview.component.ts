import { Component } from '@angular/core';
import { TimesheetDto } from '../../model/timesheet.model';
import { TimesheetService } from '../../service/timesheet.service';
import { catchError, interval, merge, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { DestroyableComponent } from '../shared/destroyable.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DateElementComponent } from './date-element/date-element.component';
import { ChuckNorrisService } from '../../service/chuck-norris.service';
import { ChuckNorrisModel } from '../../model/chuck-norris.model';

@Component({
    selector: 'app-overview',
    standalone: true,
    imports: [AsyncPipe, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, NgForOf, DateElementComponent],
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.css',
})
export class OverviewComponent extends DestroyableComponent {
    private static readonly TIMER_INTERVAL_IN_MS = 2000;

    timesheet$: Observable<TimesheetDto>;
    deleteObservable$ = new Subject<TimesheetDto>();
    chuckNorrisFact$: Observable<ChuckNorrisModel>;

    constructor(
        readonly chuckNorrisService: ChuckNorrisService,
        private readonly timesheetService: TimesheetService,
    ) {
        super();

        const initialTimesheet$ = this.timesheetService.loadTimesheet();
        const timer$ = interval(OverviewComponent.TIMER_INTERVAL_IN_MS).pipe(switchMap(() => this.timesheetService.loadTimesheet()));
        this.timesheet$ = merge(initialTimesheet$, timer$, this.deleteObservable$.asObservable());

        this.chuckNorrisFact$ = chuckNorrisService.getFact();
    }

    deleteAllOld() {
        this.timesheetService
            .deleteAllOld()
            .pipe(
                catchError(() => {
                    return of(null);
                }),
                tap((timesheetDto) => {
                    if (timesheetDto != null) {
                        this.deleteObservable$.next(timesheetDto);
                    }
                }),
            )
            .subscribe();
    }
}
