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
                    // sorts the array in descending order of the message timestamp
                    return Date.parse(b.messageTimestampTechnical) - Date.parse(a.messageTimestampTechnical);
                });
            }),
        );
    }
}
