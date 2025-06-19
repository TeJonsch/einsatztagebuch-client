import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimesheetDto } from '../model/timesheet.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TimesheetService {
    private static readonly TIMESHEET_PATH = 'timesheet';
    private static readonly DELETE_PATH = 'timesheet';
    private static readonly DELETE_ALL_OLD_PATH = 'timesheet/old';

    constructor(private readonly httpClient: HttpClient) {}

    public loadTimesheet(): Observable<TimesheetDto> {
        console.log();
        return this.httpClient.get<TimesheetDto>(`${environment.serverBaseUrl}/${TimesheetService.TIMESHEET_PATH}`, {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    public delete(uuids: Array<string>): Observable<TimesheetDto> {
        return this.httpClient.delete<TimesheetDto>(`${environment.serverBaseUrl}/${TimesheetService.DELETE_PATH}`, {
            headers: { 'Content-Type': 'application/json' },
            body: uuids,
        });
    }

    deleteAllOld() {
        return this.httpClient.delete<TimesheetDto>(`${environment.serverBaseUrl}/${TimesheetService.DELETE_ALL_OLD_PATH}`, {
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
