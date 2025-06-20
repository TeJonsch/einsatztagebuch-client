import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { OperationsDiaryDto } from '../../../model/operations-diary.model';
import { OperationsDiaryService } from '../../../service/operations-diary.service';
import { OperationCardComponent } from '../operation-card/operation-card.component';

@Component({
    selector: 'app-operations-overview',
    imports: [AsyncPipe, OperationCardComponent],
    templateUrl: './operations-overview.component.html',
    styleUrl: './operations-overview.component.scss',
})
export class OperationsOverviewComponent {
    operationsDiary$: Observable<OperationsDiaryDto>;

    constructor(private readonly operationsDiaryService: OperationsDiaryService) {
        this.operationsDiary$ = this.operationsDiaryService.getOperationsDiary$();
    }
}
