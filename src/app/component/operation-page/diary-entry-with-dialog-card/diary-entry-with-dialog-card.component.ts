import { Component, inject, Input } from '@angular/core';
import { DiaryEntryCardComponent } from '../diary-entry-card/diary-entry-card.component';
import { CreateSubEntryDialogComponent } from '../create-sub-entry-dialog/create-sub-entry-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DiaryEntryDto } from '../../../model/diary-entry.model';

@Component({
    selector: 'app-diary-entry-with-dialog-card',
    imports: [DiaryEntryCardComponent],
    templateUrl: './diary-entry-with-dialog-card.component.html',
    styleUrl: './diary-entry-with-dialog-card.component.scss',
})
export class DiaryEntryWithDialogCardComponent {
    private readonly dialog = inject(MatDialog);

    @Input('diary-entry') diaryEntry!: DiaryEntryDto;

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

    handleAdd() {
        // TODO
    }
}
