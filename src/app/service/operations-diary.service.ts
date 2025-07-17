import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, interval, merge, Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { OperationsDiaryDto } from '../model/operations-diary.model';
import { CreateOperationDto } from '../model/create-operation.model';
import { OperationDto } from '../model/operation.model';
import { CreateDiaryEntryDto } from '../model/create-diary-entry.model';

@Injectable({
    providedIn: 'root',
})
export class OperationsDiaryService {
    private static readonly API_PATH = 'api';
    private static readonly OPERATIONS_DIARY_PATH = 'operations-diary';
    private static readonly DIARY_ENTRIES_PATH = 'diary-entries';

    private static readonly TIMER_INTERVAL_IN_MS = 1000;

    private readonly operationsDiary$: Observable<OperationsDiaryDto>;

    constructor(private readonly httpClient: HttpClient) {
        const initialOperationsDiary$ = this.loadOperationsDiary();
        const timer$ = interval(OperationsDiaryService.TIMER_INTERVAL_IN_MS).pipe(switchMap(() => this.loadOperationsDiary()));

        this.operationsDiary$ = merge(initialOperationsDiary$, timer$);
    }

    public loadOperationsDiary(): Observable<OperationsDiaryDto> {
        return this.httpClient.get<OperationsDiaryDto>(this.getOperationsDiaryUrl(), {
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

    public createOperation(createOperationDto: CreateOperationDto) {
        return this.httpClient.post<OperationDto>(this.getOperationsDiaryUrl(), createOperationDto, {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    createDiaryEntry(createDiaryEntryDto: CreateDiaryEntryDto, operationDto: OperationDto) {
        return this.httpClient.post<OperationDto>(this.getDiaryEntriesUrl(operationDto), createDiaryEntryDto, {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    private getOperationsDiaryUrl() {
        return `${environment.serverBaseUrl}/${OperationsDiaryService.API_PATH}/${OperationsDiaryService.OPERATIONS_DIARY_PATH}`;
    }

    private getDiaryEntriesUrl(operationDto: OperationDto) {
        return `${this.getOperationsDiaryUrl()}/${operationDto.uuid}/${OperationsDiaryService.DIARY_ENTRIES_PATH}`;
    }
}
