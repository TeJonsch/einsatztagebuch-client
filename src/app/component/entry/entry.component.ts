import { Component, Input } from '@angular/core';
import { DiaryEntryDto } from '../../model/diary-entry.model';

@Component({
    selector: 'app-entry',
    imports: [],
    templateUrl: './entry.component.html',
    styleUrl: './entry.component.scss',
})
export class EntryComponent {
    @Input() entry!: DiaryEntryDto;
}
