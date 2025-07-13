import { Injectable } from '@angular/core';
import { OperationDto } from '../model/operation.model';
import { map, Observable } from 'rxjs';
import { DiaryEntryDto } from '../model/diary-entry.model';

@Injectable({
    providedIn: 'root',
})
export class OperationService {
    public getFilteredDiaryEntriesOf(operation$: Observable<OperationDto>) {
        return operation$.pipe(
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
}
