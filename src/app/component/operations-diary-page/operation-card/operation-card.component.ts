import { Component, Input } from '@angular/core';
import { OperationDto } from '../../../model/operation.model';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
    selector: 'app-operation-card',
    imports: [MatCard, MatCardHeader, MatCardContent],
    templateUrl: './operation-card.component.html',
    styleUrl: './operation-card.component.scss',
})
export class OperationCardComponent {
    @Input() operation!: OperationDto;

    constructor(private readonly router: Router) {}

    navigateToOperation(operation: OperationDto) {
        this.router.navigate(['/operations', operation.uuid]);
    }
}
