import { Routes } from '@angular/router';
import { OperationsOverviewComponent } from './component/operations-diary-page/operations-overview/operations-overview.component';
import { DiaryEntryOverviewComponent } from './component/operation-page/diary-entry-overview/diary-entry-overview.component';

export const routes: Routes = [
    { path: '', component: OperationsOverviewComponent },
    { path: 'operations/:id', component: DiaryEntryOverviewComponent },
];
