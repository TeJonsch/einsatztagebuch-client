import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, interval, merge, Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { OperationsDiaryDto } from '../model/operations-diary.model';

@Injectable({
    providedIn: 'root',
})
export class OperationsDiaryService {
    private static readonly OPERATIONS_DIARY_PATH = 'operations-diary';
    private static readonly TIMER_INTERVAL_IN_MS = 2000;

    private readonly operationsDiary$: Observable<OperationsDiaryDto>;

    constructor(private readonly httpClient: HttpClient) {
        const initialOperationsDiary$ = this.loadOperationsDiary();
        const timer$ = interval(OperationsDiaryService.TIMER_INTERVAL_IN_MS).pipe(switchMap(() => this.loadOperationsDiary()));

        this.operationsDiary$ = merge(initialOperationsDiary$, timer$);
    }

    public loadOperationsDiary(): Observable<OperationsDiaryDto> {
        return this.httpClient.get<OperationsDiaryDto>(`${environment.serverBaseUrl}/${OperationsDiaryService.OPERATIONS_DIARY_PATH}`, {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    public getOperationsDiary$() {
        return this.operationsDiary$;
    }

    public findOperation$(operationUuid: string) {
        return this.operationsDiary$.pipe(
            switchMap((operationsDiary) => operationsDiary.operations),
            filter((operation) => operationUuid === operation.uuid),
        );
    }
}
