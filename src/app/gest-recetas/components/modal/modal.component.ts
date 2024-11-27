
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  constructor(private confirmationService2: ConfirmationService, private messageService: MessageService, private router: Router) {}

  @Input() title!: string
  @Input() message!: string


  showDialog() {
    this.confirmationService2.confirm({
      header: this.title,
      message: this.message,
      accept: () => {
        this.router.navigate(['']);
      }
    });
  }



}
