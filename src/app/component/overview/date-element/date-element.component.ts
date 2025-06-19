import { Component, Input } from '@angular/core';
import { TimeEntryDto } from '../../../model/time-entry.model';
import { NgIf } from '@angular/common';
import { TimesheetService } from '../../../service/timesheet.service';
import { catchError, of, Subject, tap } from 'rxjs';
import { TimesheetDto } from '../../../model/timesheet.model';

@Component({
    selector: 'app-date-element',
    imports: [NgIf],
    templateUrl: './date-element.component.html',
    styleUrl: './date-element.component.scss'
})
export class DateElementComponent {
    @Input({ required: true }) entry!: TimeEntryDto;
    @Input() nextEntry: TimeEntryDto | null = null;
    @Input({ required: true }) isLast!: boolean;
    @Input() deleteObservable$!: Subject<TimesheetDto>;

    constructor(private readonly timesheetService: TimesheetService) {}

    deleteEntry() {
        this.delete([this.entry.startUuid, this.entry.endUuid]);
    }

    deleteBreak() {
        this.delete([this.entry.endUuid, this.nextEntry?.startUuid]);
    }

    /**
     * Delete all given entries
     * @param uuids list may contain null
     * @private
     */
    private delete(uuids: Array<string | null | undefined>) {
        this.timesheetService
            .delete(this.filterNull(uuids))
            .pipe(
                catchError(() => {
                    return of(null);
                }),
                tap((timesheetDto) => {
                    if (timesheetDto != null) {
                        this.deleteObservable$.next(timesheetDto);
                    }
                }),
            )
            .subscribe();
    }

    private filterNull(uuids: Array<string | null | undefined>): Array<string> {
        const checkedUuids = [];
        for (const uuid of uuids) {
            if (uuid) {
                checkedUuids.push(uuid);
            }
        }

        return checkedUuids;
    }
}
