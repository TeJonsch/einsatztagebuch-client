import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, mergeMap, Observable } from 'rxjs';
import { OperationsDiaryService } from '../../../service/operations-diary.service';
import { OperationDto } from '../../../model/operation.model';
import { AsyncPipe } from '@angular/common';
import { CreateDiaryEntryCardComponent } from '../create-diary-entry-card/create-diary-entry-card.component';
import { DiaryEntryDto } from '../../../model/diary-entry.model';
import { DiaryEntryWithDialogCardComponent } from '../diary-entry-with-dialog-card/diary-entry-with-dialog-card.component';
import { OperationService } from '../../../service/operation.service';

@Component({
    selector: 'app-diary-entry-overview',
    imports: [AsyncPipe, CreateDiaryEntryCardComponent, DiaryEntryWithDialogCardComponent],
    templateUrl: './diary-entry-overview.component.html',
    styleUrl: './diary-entry-overview.component.scss',
})
export class DiaryEntryOverviewComponent implements OnInit {
    private readonly route = inject(ActivatedRoute);
    private readonly operationsDiaryService = inject(OperationsDiaryService);
    private readonly operationService = inject(OperationService);

    public operation$!: Observable<OperationDto>;
    public sortedDiaryEntries$: Observable<DiaryEntryDto[]>;
    private operationId$!: Observable<string | null>;

    ngOnInit(): void {
        this.operationId$ = this.route.paramMap.pipe(mergeMap(async (params) => params?.get('id')));
        this.operation$ = this.operationId$.pipe(
            filter((operationId) => operationId != null),
            mergeMap((operationId) => this.operationsDiaryService.findOperation$(operationId)),
        );

        this.sortedDiaryEntries$ = this.operationService.getFilteredDiaryEntriesOf(this.operation$);
    }
}
