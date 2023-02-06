import {Component, Input} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-dashboard-event-modal',
  templateUrl: './dashboard-event-modal.component.html',
  styleUrls: ['./dashboard-event-modal.component.scss']
})
export class DashboardEventModalComponent {

  @Input() eventEntry: any;

  constructor(private modalRef: BsModalRef) { }

  close() {
    this.modalRef.hide();
  }

  getTitle() {
    switch (this.eventEntry.extendedProps.type) {
      case "MACHINE":
        return "Maschine: " + this.eventEntry.title;
      case "TRAINING":
        return "Schulung: " + this.eventEntry.title;
      case "CONSULTING":
        return "Beratungstermin: " + this.eventEntry.title;
      default:
        return this.eventEntry.title;
    }
  }
}
