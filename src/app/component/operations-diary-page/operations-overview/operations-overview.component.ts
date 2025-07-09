import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { OperationsDiaryDto } from '../../../model/operations-diary.model';
import { OperationsDiaryService } from '../../../service/operations-diary.service';
import { OperationCardComponent } from '../operation-card/operation-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CreateOperationComponent } from '../create-operation/create-operation.component';
import { MatDialog } from '@angular/material/dialog';
import { OperationDto } from '../../../model/operation.model';

@Component({
    selector: 'app-operations-overview',
    imports: [AsyncPipe, OperationCardComponent, MatButtonModule, MatIconModule],
    templateUrl: './operations-overview.component.html',
    styleUrl: './operations-overview.component.scss',
})
export class OperationsOverviewComponent {
    private readonly dialog = inject(MatDialog);

    sortedOperations: Observable<OperationDto[]>;

    constructor(private readonly operationsDiaryService: OperationsDiaryService) {
        this.sortedOperations = this.operationsDiaryService.getOperationsDiary$().pipe(
            map((operationsDiaryDtos: OperationsDiaryDto) => {
                return operationsDiaryDtos.operations;
            }),
            map((operations: OperationDto[]) => {
                return operations.sort((a, b) => {
                    return Date.parse(b.operationStartTimestamp) - Date.parse(a.operationStartTimestamp);
                });
            }),
        );
    }

    openCreateDialog() {
        this.dialog.open(CreateOperationComponent, {
            height: '400px',
            width: '600px',
        });
    }
}
