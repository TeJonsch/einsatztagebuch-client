import { Component, inject, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { OperationsDiaryService } from '../../../service/operations-diary.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CreateDiaryEntryFormComponent } from '../create-diary-entry-form/create-diary-entry-form.component';
import { CreateDiaryEntryDto } from '../../../model/create-diary-entry.model';
import { OperationDto } from '../../../model/operation.model';

@Component({
    selector: 'app-create-diary-entry-card',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        CreateDiaryEntryFormComponent,
    ],
    templateUrl: './create-diary-entry-card.component.html',
    styleUrl: './create-diary-entry-card.component.scss',
})
export class CreateDiaryEntryCardComponent {
    private readonly operationsDiaryService = inject(OperationsDiaryService);

    @Input({ required: true })
    operation!: OperationDto;

    createDiaryEntry(createDiaryEntry: CreateDiaryEntryDto): void {
        this.operationsDiaryService.createDiaryEntry(createDiaryEntry, this.operation).subscribe();
    }
}
