import { Component, Input } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { DiaryEntryDto } from '../../../model/diary-entry.model';

@Component({
    selector: 'app-diary-entry-card',
    imports: [MatCard, MatCardContent],
    templateUrl: './diary-entry-card.component.html',
    styleUrl: './diary-entry-card.component.scss',
})
export class DiaryEntryCardComponent {
    @Input('diary-entry') diaryEntry!: DiaryEntryDto;
}
