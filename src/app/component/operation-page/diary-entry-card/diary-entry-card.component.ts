import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { DiaryEntryDto } from '../../../model/diary-entry.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-diary-entry-card',
    imports: [MatCard, MatCardContent, MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: './diary-entry-card.component.html',
    styleUrl: './diary-entry-card.component.scss',
})
export class DiaryEntryCardComponent implements OnInit {
    @Input('diary-entry')
    diaryEntry!: DiaryEntryDto;

    @Input('enableTools')
    enableTools = false;

    @Output()
    editTriggered = new EventEmitter<void>();

    @Output()
    addTriggered = new EventEmitter<void>();

    message: string;
    displayTools = false;

    ngOnInit(): void {
        this.message = this.getMessageWithTransformedLineBreaks();
    }

    private getMessageWithTransformedLineBreaks() {
        return this.diaryEntry.message.replace(/\n/g, '<br>');
    }

    setDisplayTools(displayTools: boolean) {
        this.displayTools = displayTools;
    }

    sendEditTriggered() {
        this.editTriggered.emit();
    }

    sendAddTriggered() {
        this.addTriggered.emit();
    }
}
