import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewComponent } from './gest-recetas/pages/new/new.component';
import { DashboardComponent } from './gest-recetas/pages/dashboard/dashboard.component';
import { ViewComponent } from './gest-recetas/pages/view/view.component';
import { ModalComponent } from './gest-recetas/components/modal/modal.component';
import { ConfirmationService, MessageService } from 'primeng/api';

const routes: Routes = [
  {path: '', component:DashboardComponent},
  {path: 'new', component:NewComponent},
  {path: 'view', component:ViewComponent},
  {path: 'a', component:ModalComponent},
  {path: '**', redirectTo: ''}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ConfirmationService, MessageService]
})
export class AppRoutingModule { }
