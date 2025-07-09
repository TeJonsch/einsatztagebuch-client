import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap, Observable } from 'rxjs';
import { OperationsDiaryService } from '../../../service/operations-diary.service';
import { OperationDto } from '../../../model/operation.model';
import { AsyncPipe } from '@angular/common';
import { DiaryEntryCardComponent } from '../diary-entry-card/diary-entry-card.component';
import { CreateDiaryEntryCardComponent } from '../create-diary-entry-card/create-diary-entry-card.component';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DiaryEntryDto } from '../../../model/diary-entry.model';

@Component({
    selector: 'app-diary-entry-overview',
    imports: [AsyncPipe, DiaryEntryCardComponent, MatIcon, MatIconButton, CreateDiaryEntryCardComponent],
    templateUrl: './diary-entry-overview.component.html',
    styleUrl: './diary-entry-overview.component.scss',
})
export class DiaryEntryOverviewComponent implements OnInit {
    private readonly dialog = inject(MatDialog);
    private readonly route = inject(ActivatedRoute);
    private readonly operationsDiaryService = inject(OperationsDiaryService);

    public operation$!: Observable<OperationDto>;
    public sortedDiaryEntries$: Observable<DiaryEntryDto[]>;
    private operationId$!: Observable<string | null>;

    ngOnInit(): void {
        this.operationId$ = this.route.paramMap.pipe(mergeMap(async (params) => params?.get('id')));
        this.operation$ = this.operationId$.pipe(
            filter((operationId) => operationId != null),
            mergeMap((operationId) => this.operationsDiaryService.findOperation$(operationId)),
        );

        this.sortedDiaryEntries$ = this.operation$.pipe(
            map((operation) => {
                return operation.diaryEntries;
            }),
            map((diaryEntries: DiaryEntryDto[]) => {
                return diaryEntries.sort((a, b) => {
                    return Date.parse(b.messageTimestamp) - Date.parse(a.messageTimestamp);
                });
            }),
        );
    }

    openCreateDialog(operationDto: OperationDto) {
        this.dialog.open(CreateDiaryEntryCardComponent, {
            data: { operationDto: operationDto },
            height: '400px',
            width: '600px',
        });
    }
}
