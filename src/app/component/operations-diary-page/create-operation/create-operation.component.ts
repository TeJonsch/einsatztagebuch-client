import { Component, inject } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OperationsDiaryService } from '../../../service/operations-diary.service';
import { CreateOperationDto } from '../../../model/create-operation.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-create-operation',
    imports: [MatInputModule, MatFormField, MatLabel, ReactiveFormsModule, FormsModule, MatButtonModule],
    templateUrl: './create-operation.component.html',
    styleUrl: './create-operation.component.scss',
})
export class CreateOperationComponent {
    private readonly operationsDiaryService = inject(OperationsDiaryService);
    private readonly dialogRef = inject(MatDialogRef<CreateOperationComponent>);

    public operationStartTimestamp: string;

    readonly controlCenterIdFormControl = new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]);
    readonly alarmKeywordFormControl = new FormControl('', []);

    constructor() {
        this.operationStartTimestamp = this.createDateTimeNow();
    }

    createOperation(): void {
        if (this.controlCenterIdFormControl.errors) {
            console.error(this.controlCenterIdFormControl.errors);
            return;
        }
        if (this.controlCenterIdFormControl.value == null) {
            console.error('ControlCenterId required');
            return;
        }

        let controlCenterId = this.controlCenterIdFormControl.value;

        const createOperationDto: CreateOperationDto = {
            controlCenterId: controlCenterId,
            operationStartTimestamp: this.operationStartTimestamp,
            alarmKeyword: this.alarmKeywordFormControl.value,
        };
        this.operationsDiaryService.createOperation(createOperationDto).subscribe();

        console.info('Operation created');

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
