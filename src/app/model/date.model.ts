import { TimeEntryDto } from './time-entry.model';

export interface DateDto {
    entries: Array<TimeEntryDto>;
    date: string;
    totalDurationOfWorkingTime: string;
}
