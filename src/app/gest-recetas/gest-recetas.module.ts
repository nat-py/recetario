import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './pages/new/new.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ViewComponent } from './pages/view/view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorModule } from 'primeng/editor';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SafeHtmlPipe } from '../safe-html.pipe';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import '@lottiefiles/lottie-player';



@NgModule({
  declarations: [
    NewComponent,
    DashboardComponent,
    ViewComponent,
    ModalComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    BrowserAnimationsModule,
    EditorModule,
    CalendarModule,
    FloatLabelModule,
    ConfirmDialogModule,
    ToastModule

  ],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class GestRecetasModule { }
