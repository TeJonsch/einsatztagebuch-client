import { Component } from '@angular/core';
import { OperationsDiaryService } from '../../service/operations-diary.service';
import { interval, merge, Observable, switchMap } from 'rxjs';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { EntryComponent } from '../entry/entry.component';
import { OperationsDiaryDto } from '../../model/operations-diary.model';
import { OperationsDiaryComponent } from '../operations-diary/operations-diary.component';

@Component({
    selector: 'app-overview',
    imports: [AsyncPipe, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, NgForOf, EntryComponent, OperationsDiaryComponent],
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.css',
})
export class OverviewComponent {
    private static readonly TIMER_INTERVAL_IN_MS = 2000;

    operationsDiary$: Observable<OperationsDiaryDto>;

    constructor(private readonly operationsDiaryService: OperationsDiaryService) {
        const initialOperationsDiary$ = this.operationsDiaryService.loadOperationsDiary();
        const timer$ = interval(OverviewComponent.TIMER_INTERVAL_IN_MS).pipe(switchMap(() => this.operationsDiaryService.loadOperationsDiary()));
        this.operationsDiary$ = merge(initialOperationsDiary$, timer$);
    }
}
