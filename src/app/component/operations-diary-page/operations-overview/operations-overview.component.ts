import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { OperationsDiaryDto } from '../../../model/operations-diary.model';
import { OperationsDiaryService } from '../../../service/operations-diary.service';
import { OperationCardComponent } from '../operation-card/operation-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CreateOperationComponent } from '../create-operation/create-operation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-operations-overview',
    imports: [AsyncPipe, OperationCardComponent, MatButtonModule, MatIconModule],
    templateUrl: './operations-overview.component.html',
    styleUrl: './operations-overview.component.scss',
})
export class OperationsOverviewComponent {
    readonly dialog = inject(MatDialog);

    operationsDiary$: Observable<OperationsDiaryDto>;

    constructor(private readonly operationsDiaryService: OperationsDiaryService) {
        this.operationsDiary$ = this.operationsDiaryService.getOperationsDiary$();
    }

    openCreateDialog() {
        let dialogRef = this.dialog.open(CreateOperationComponent, {
            height: '400px',
            width: '600px',
        });
    }
}
