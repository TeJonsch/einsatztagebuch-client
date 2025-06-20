import { DiaryEntryDto } from './diary-entry.model';

export interface OperationDto {
    uuid: string;
    controlCenterId: string;
    operationStartTimestamp: string;
    alarmKeyword: string;
    diaryEntries: Array<DiaryEntryDto>;
}
