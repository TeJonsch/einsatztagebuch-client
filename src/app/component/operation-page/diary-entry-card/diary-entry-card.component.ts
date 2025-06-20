import { Component, Input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { DiaryEntryDto } from '../../../model/diary-entry.model';

@Component({
    selector: 'app-diary-entry-card',
    imports: [MatCard, MatCardContent, MatCardHeader],
    templateUrl: './diary-entry-card.component.html',
    styleUrl: './diary-entry-card.component.scss',
})
export class DiaryEntryCardComponent {
    @Input('diary-entry') diaryEntry!: DiaryEntryDto;
}
