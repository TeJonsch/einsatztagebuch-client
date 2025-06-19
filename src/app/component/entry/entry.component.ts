import { Component, Input } from '@angular/core';
import { DiaryEntryDto } from '../../model/diary-entry.model';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader } from '@angular/material/card';

@Component({
    selector: 'app-entry',
    imports: [MatCard, MatCardContent, MatCardFooter, MatCardHeader],
    templateUrl: './entry.component.html',
    styleUrl: './entry.component.scss',
})
export class EntryComponent {
    @Input() entry!: DiaryEntryDto;
}
