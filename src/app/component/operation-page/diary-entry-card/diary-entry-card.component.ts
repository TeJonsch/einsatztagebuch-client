import { Component, Input, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { DiaryEntryDto } from '../../../model/diary-entry.model';

@Component({
    selector: 'app-diary-entry-card',
    imports: [MatCard, MatCardContent],
    templateUrl: './diary-entry-card.component.html',
    styleUrl: './diary-entry-card.component.scss',
})
export class DiaryEntryCardComponent implements OnInit {
    @Input('diary-entry') diaryEntry!: DiaryEntryDto;

    message: string;

    ngOnInit(): void {
        this.message = this.getMessageWithTransformedLineBreaks();
    }

    private getMessageWithTransformedLineBreaks() {
        return this.diaryEntry.message.replace(/\n/g, '<br>');
    }
}
