import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AdquisicionListComponent } from './components/adquisiciones/adquisicion-list/adquisicion-list.component';
import { HistoryComponent } from './components/history/history.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent, pathMatch: 'full' },
  { path: 'adquisiciones', component: AdquisicionListComponent },
  { path: 'historial', component: HistoryComponent }, // Nueva ruta
  { path: '**', redirectTo: '' }
];