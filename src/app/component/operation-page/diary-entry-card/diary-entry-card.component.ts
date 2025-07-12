import { Component, inject, Input, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { DiaryEntryDto } from '../../../model/diary-entry.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { CreateSubEntryDialogComponent } from '../create-sub-entry-dialog/create-sub-entry-dialog.component';

@Component({
    selector: 'app-diary-entry-card',
    imports: [MatCard, MatCardContent, MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: './diary-entry-card.component.html',
    styleUrl: './diary-entry-card.component.scss',
})
export class DiaryEntryCardComponent implements OnInit {
    private readonly dialog = inject(MatDialog);

    @Input('diary-entry') diaryEntry!: DiaryEntryDto;

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

    openSubEntryDialog(): void {
        const dialogRef = this.dialog.open(CreateSubEntryDialogComponent, {
            data: { diaryEntry: this.diaryEntry },
            height: '400px',
            width: '600px',
        });

        // dialogRef.afterClosed().subscribe((result) => {
        //     console.log('The dialog was closed');
        //     if (result !== undefined) {
        //         // TODO???
        //     }
        // });
    }
}
