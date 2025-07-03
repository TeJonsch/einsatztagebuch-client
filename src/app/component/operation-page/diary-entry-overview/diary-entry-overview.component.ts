import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, mergeMap, Observable } from 'rxjs';
import { OperationsDiaryService } from '../../../service/operations-diary.service';
import { OperationDto } from '../../../model/operation.model';
import { AsyncPipe } from '@angular/common';
import { DiaryEntryCardComponent } from '../diary-entry-card/diary-entry-card.component';
import { CreateDiaryEntryCardComponent } from '../create-diary-entry-card/create-diary-entry-card.component';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-diary-entry-overview',
    imports: [AsyncPipe, DiaryEntryCardComponent, MatIcon, MatIconButton],
    templateUrl: './diary-entry-overview.component.html',
    styleUrl: './diary-entry-overview.component.scss',
})
export class DiaryEntryOverviewComponent implements OnInit {
    private readonly dialog = inject(MatDialog);
    private readonly route = inject(ActivatedRoute);
    private readonly operationsDiaryService = inject(OperationsDiaryService);

    public operation$!: Observable<OperationDto>;
    private operationId$!: Observable<string | null>;

    ngOnInit(): void {
        this.operationId$ = this.route.paramMap.pipe(mergeMap(async (params) => params?.get('id')));
        this.operation$ = this.operationId$.pipe(
            filter((operationId) => operationId != null),
            mergeMap((operationId) => this.operationsDiaryService.findOperation$(operationId)),
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
