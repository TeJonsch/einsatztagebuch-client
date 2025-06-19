import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    template: '',
    standalone: false
})
export abstract class DestroyableComponent implements OnDestroy {
    protected destroy$: Subject<void> = new Subject<void>();

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
