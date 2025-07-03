import { Component, Inject, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInput, MatLabel } from '@angular/material/input';
import { OperationsDiaryService } from '../../../service/operations-diary.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { CreateDiaryEntryDto } from '../../../model/create-diary-entry.model';
import { OperationDto } from '../../../model/operation.model';

@Component({
    selector: 'app-create-diary-entry-card',
    imports: [FormsModule, MatButton, MatFormField, MatInput, MatLabel, ReactiveFormsModule],
    templateUrl: './create-diary-entry-card.component.html',
    styleUrl: './create-diary-entry-card.component.scss',
})
export class CreateDiaryEntryCardComponent {
    private readonly operationsDiaryService = inject(OperationsDiaryService);
    private readonly dialogRef = inject(MatDialogRef<CreateDiaryEntryCardComponent>);

    messageTimestamp = this.createDateTimeNow();
    message = '';

    constructor(@Inject(MAT_DIALOG_DATA) public data: { operationDto: OperationDto }) {}

    createDiaryEntry(): void {
        const createDiaryEntryDto: CreateDiaryEntryDto = {
            message: this.message,
            messageTimestamp: this.messageTimestamp,
        };
        this.operationsDiaryService.createDiaryEntry(createDiaryEntryDto, this.data.operationDto).subscribe();

        console.info('Diary entry created');

        this.dialogRef.close();
    }

    cancel() {
        this.dialogRef.close();
    }

    // TODO: refactor duplicate code
    private createDateTimeNow() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }
}
