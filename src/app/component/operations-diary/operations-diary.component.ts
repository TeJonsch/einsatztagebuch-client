import { Component, Input } from '@angular/core';
import { OperationsDiaryDto } from '../../model/operations-diary.model';
import { EntryComponent } from '../entry/entry.component';

@Component({
    selector: 'app-operations-diary',
    imports: [EntryComponent],
    templateUrl: './operations-diary.component.html',
    styleUrl: './operations-diary.component.scss',
})
export class OperationsDiaryComponent {
    @Input('operations-diary') operationsDiary!: OperationsDiaryDto;
}
