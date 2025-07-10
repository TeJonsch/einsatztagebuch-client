import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { OperationsDiaryService } from '../../../service/operations-diary.service';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { CreateDiaryEntryDto } from '../../../model/create-diary-entry.model';
import { OperationDto } from '../../../model/operation.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatSelect } from '@angular/material/select';

@Component({
    selector: 'app-create-diary-entry-card',
    imports: [
        FormsModule,
        MatButton,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        MatCard,
        MatCardContent,
        MatCardActions,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        AsyncPipe,
        MatSelect,
    ],
    templateUrl: './create-diary-entry-card.component.html',
    styleUrl: './create-diary-entry-card.component.scss',
})
export class CreateDiaryEntryCardComponent implements OnInit {
    private readonly operationsDiaryService = inject(OperationsDiaryService);

    @Input({ required: true }) operation!: OperationDto;

    myControl = new FormControl('');
    reporterOptions = ['Leitstelle', 'Einsatzleiter'];

    messageTimestamp = this.createDateTimeNow();
    message = '';
    filteredOptions: Observable<string[]>;

    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || '')),
        );
    }

    createDiaryEntry(): void {
        const createDiaryEntryDto: CreateDiaryEntryDto = {
            message: this.message,
            messageTimestamp: this.messageTimestamp,
        };
        this.operationsDiaryService.createDiaryEntry(createDiaryEntryDto, this.operation).subscribe();
    }

    cancel() {
        // TODO: delete content
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.reporterOptions.filter((option) => option.toLowerCase().includes(filterValue));
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
