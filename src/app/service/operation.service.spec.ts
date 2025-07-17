import { OperationService } from './operation.service';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { OperationDto } from '../model/operation.model';
import { DiaryEntryDto } from '../model/diary-entry.model';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';

describe('OperationService', () => {
    let testScheduler: TestScheduler;
    let operationService: OperationService;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            return expect(actual).toEqual(expected);
        });

        operationService = TestBed.inject(OperationService);
    });

    it('diary entries are sorted decending by message timestamp', () => {
        const entry01 = createDiaryEntry('1', '2026-01-01T00:00:00'); // min values next year
        const entry02 = createDiaryEntry('2', '2025-12-31T23:59:59'); // max values
        const entry03 = createDiaryEntry('3', '2025-08-02T13:00:00');
        const entry04 = createDiaryEntry('4', '2025-08-01T21:12:10');
        const entry05 = createDiaryEntry('5', '2025-08-01T21:12:00');
        const entry06 = createDiaryEntry('6', '2025-08-01T21:11:00');
        const entry07 = createDiaryEntry('7', '2025-08-01T21:00:00');
        const entry08 = createDiaryEntry('8', '2025-08-01T13:00:00');
        const entry09 = createDiaryEntry('9', '2025-08-01T06:00:00');
        const entry10 = createDiaryEntry('10', '2025-07-01T13:00:00');
        const entry11 = createDiaryEntry('11', '2025-06-01T13:00:00');
        const entry12 = createDiaryEntry('12', '2024-07-01T13:00:00');

        const operation: OperationDto = {
            diaryEntries: new Array<DiaryEntryDto>(entry04, entry08, entry03, entry09, entry10, entry06, entry05, entry07, entry11, entry02, entry12, entry01),
            uuid: 'irrelevant',
            controlCenterId: 'irrelevant',
            operationStartTimestamp: 'irrelevant',
            alarmKeyword: 'irrelevant',
        } satisfies OperationDto;
        let operation$ = new ReplaySubject<OperationDto>();

        const diaryEntriesInExpectedOrder = new Array<DiaryEntryDto>(
            entry01,
            entry02,
            entry03,
            entry04,
            entry05,
            entry06,
            entry07,
            entry08,
            entry09,
            entry10,
            entry11,
            entry12,
        );

        diaryEntriesInExpectedOrder.forEach((diaryEntry) => {
            console.log(`${diaryEntry.messageTimestampTechnical} | ${Date.parse(diaryEntry.messageTimestampTechnical)}`);
        });

        operation$.next(operation);
        testScheduler.run(({ expectObservable }) => {
            expectObservable(operationService.getFilteredDiaryEntriesOf(operation$)).toBe('a', { a: diaryEntriesInExpectedOrder });
        });
    });

    function createDiaryEntry(uuid: string, messageTimestamp: string): DiaryEntryDto {
        return {
            uuid: uuid,
            messageTimestampTechnical: messageTimestamp,
            messageTimestampReadable: 'irrelevant',
            message: 'irrelevant',
            messageType: 'irrelevant',
            reporter: 'irrelevant',
            receiver: 'irrelevant',
            author: 'irrelevant',
        } satisfies DiaryEntryDto;
    }
});
