import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OperationsDiaryDto } from '../model/operations-diary.model';

@Injectable({
    providedIn: 'root',
})
export class OperationsDiaryService {
    private static readonly OPERATIONS_DIARY_PATH = 'operations-diary';

    constructor(private readonly httpClient: HttpClient) {}

    public loadOperationsDiary(): Observable<OperationsDiaryDto> {
        return this.httpClient.get<OperationsDiaryDto>(`${environment.serverBaseUrl}/${OperationsDiaryService.OPERATIONS_DIARY_PATH}`, {
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
