import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatInput, MatLabel } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { map, Observable, startWith } from 'rxjs';
import { CreateDiaryEntryDto } from '../../../model/create-diary-entry.model';
import { MessageType } from '../../../model/message-type.model';

@Component({
    selector: 'app-create-diary-entry-form',
    imports: [
        AsyncPipe,
        MatAutocomplete,
        MatAutocompleteTrigger,
        MatButton,
        MatCard,
        MatCardContent,
        MatFormField,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        ReactiveFormsModule,
    ],
    templateUrl: './create-diary-entry-form.component.html',
    styleUrl: './create-diary-entry-form.component.scss',
})
export class CreateDiaryEntryFormComponent implements OnInit, AfterViewInit {
    protected readonly MessageType = MessageType;

    @Output()
    submitTriggered = new EventEmitter<CreateDiaryEntryDto>();

    @ViewChild('messageTextarea')
    private readonly messageTextarea!: ElementRef<HTMLTextAreaElement>;

    displayReceiverInput = true;

    reporterOptions = ['Leitstelle', 'Einsatzleiter'];
    receiverOptions = ['Leitstelle', 'Einsatzleiter'];

    messageControl = new FormControl('', [Validators.required]);
    messageTypeControl = new FormControl(MessageType.FORWARDING, [Validators.required]);
    reporterControl = new FormControl('', [Validators.required]);
    receiverControl = new FormControl('', [Validators.required]);
    messageTimestampControl = new FormControl(this.createDateTimeNow(), [Validators.required]);
    authorControl = new FormControl('', [Validators.required]);

    filteredReporterOptions: Observable<string[]>;
    filteredReceiverOptions: Observable<string[]>;

    formGroup: FormGroup;

    constructor(private readonly formBuilder: FormBuilder) {}

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            message: this.messageControl,
            messageType: this.messageTypeControl,
            reporter: this.reporterControl,
            receiver: this.receiverControl,
            messageTimestamp: this.messageTimestampControl,
            author: this.authorControl,
        });

        this.filteredReporterOptions = this.reporterControl.valueChanges.pipe(
            startWith(''),
            map((value) => this.filterReporter(value ?? '')),
        );

        this.filteredReceiverOptions = this.receiverControl.valueChanges.pipe(
            startWith(''),
            map((value) => this.filterReceiver(value ?? '')),
        );
    }

    ngAfterViewInit(): void {
        this.focusMessageTextarea();
    }

    sendSubmitTriggered(formGroupDirective: FormGroupDirective): void {
        if (this.areAllFieldsValid()) {
            const createDiaryEntry: CreateDiaryEntryDto = {
                message: this.messageControl.value,
                messageType: this.messageTypeControl.value,
                reporter: this.reporterControl.value,
                receiver: this.receiverControl.value,
                messageTimestamp: this.messageTimestampControl.value,
                author: this.authorControl.value,
            };

            this.submitTriggered.emit(createDiaryEntry);

            this.resetForm(createDiaryEntry.author, formGroupDirective);
        } else {
            console.debug('Validator error(s) prevent the diary entry creation');
        }
    }

    private filterReporter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.reporterOptions.filter((option) => option.toLowerCase().includes(filterValue));
    }

    private filterReceiver(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.receiverOptions.filter((option) => option.toLowerCase().includes(filterValue));
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

    private areAllFieldsValid() {
        return (
            this.messageControl.valid &&
            this.messageTypeControl.valid &&
            this.reporterControl.valid &&
            (this.receiverControl.valid || !this.displayReceiverInput) &&
            this.messageTimestampControl.valid &&
            this.authorControl.valid
        );
    }

    onMessageTypeSelectionChange($event: MatSelectChange<any>) {
        this.displayReceiverInput = $event.value == MessageType.FORWARDING;
    }

    private focusMessageTextarea() {
        setTimeout(() => {
            this.messageTextarea.nativeElement.focus();
        }, 0);
    }

    resetForm(author: string | null, formGroupDirective: FormGroupDirective) {
        formGroupDirective.resetForm();
        this.formGroup.reset();

        this.messageTimestampControl.setValue(this.createDateTimeNow());
        this.authorControl.setValue(author);
        this.focusMessageTextarea();
    }
}
