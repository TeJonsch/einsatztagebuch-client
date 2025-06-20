import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, mergeMap, Observable } from 'rxjs';
import { OperationsDiaryService } from '../../../service/operations-diary.service';
import { OperationDto } from '../../../model/operation.model';
import { AsyncPipe } from '@angular/common';
import { DiaryEntryCardComponent } from '../diary-entry-card/diary-entry-card.component';

@Component({
    selector: 'app-diary-entry-overview',
    imports: [AsyncPipe, DiaryEntryCardComponent],
    templateUrl: './diary-entry-overview.component.html',
    styleUrl: './diary-entry-overview.component.scss',
})
export class DiaryEntryOverviewComponent implements OnInit {
    public operation$!: Observable<OperationDto>;
    private operationId$!: Observable<string | null>;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly operationsDiaryService: OperationsDiaryService,
    ) {}

    ngOnInit(): void {
        this.operationId$ = this.route.paramMap.pipe(mergeMap(async (params) => params?.get('id')));
        this.operation$ = this.operationId$.pipe(
            filter((operationId) => operationId != null),
            mergeMap((operationId) => this.operationsDiaryService.findOperation$(operationId)),
        );
    }
}
