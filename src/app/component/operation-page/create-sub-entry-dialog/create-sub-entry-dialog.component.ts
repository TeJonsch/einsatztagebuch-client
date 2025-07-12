import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DiaryEntryDto } from '../../../model/diary-entry.model';
import { MatCard } from '@angular/material/card';
import { CreateSubEntryCardComponent } from '../create-sub-entry-card/create-sub-entry-card.component';
import { DiaryEntryCardComponent } from '../diary-entry-card/diary-entry-card.component';

@Component({
    selector: 'app-create-sub-entry-dialog',
    imports: [MatCard, CreateSubEntryCardComponent, DiaryEntryCardComponent],
    templateUrl: './create-sub-entry-dialog.component.html',
    styleUrl: './create-sub-entry-dialog.component.scss',
})
export class CreateSubEntryDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<CreateSubEntryDialogComponent>);

    constructor(@Inject(MAT_DIALOG_DATA) public data: { diaryEntry: DiaryEntryDto }) {
        console.log('Dialog was created');
        console.log(data);
    }

    closeDialog() {
        this.dialogRef.close();
    }
}
