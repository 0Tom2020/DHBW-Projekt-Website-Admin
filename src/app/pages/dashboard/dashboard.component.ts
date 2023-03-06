import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions, EventSourceInput} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import {FullCalendarComponent} from "@fullcalendar/angular";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {formatDate} from "@angular/common";
import {BsModalService} from "ngx-bootstrap/modal";
import {DashboardEventModalComponent} from "@components/dashboard-event-modal/dashboard-event-modal.component";
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    height: '85vh',
    initialView: 'dayGridMonth',
    firstDay: 1,
    locale: 'de',
    plugins: [dayGridPlugin],
    events: [],
  };

  constructor(private client: HttpClient, private modalService: BsModalService) { }

  ngAfterViewInit(): void {
    this.loadData(this.calendarComponent.getApi().view.activeStart, this.calendarComponent.getApi().view.activeEnd);
    this.calendarComponent.getApi().on('datesSet', (info) => {
      this.loadData(info.start, info.end);
    })
    this.calendarComponent.getApi().on('eventClick', (info) => {
      this.modalService.show(DashboardEventModalComponent, {initialState: {eventEntry: info.event}})
    })
  }

  loadData(start: Date, end: Date) {
    // load data from server
    this.client.get<any[]>(environment.backend + '/calendar', {withCredentials: true, params: {start: formatDate(start, 'yyy-MM-dd', 'en_US'), end: formatDate(end, 'yyy-MM-dd', 'en_US')}}).subscribe(value => {
      this.calendarComponent.getApi().removeAllEvents();
      // add events to calendar
      for (const event of value) {
        const eventEntry = {
          title: event.title,
          date: event.start,
          end: event.end,
          display: 'block',
          extendedProps: event.metadata
        }

        eventEntry.extendedProps.type = event.type;

        switch (event.type) {
          case "MACHINE":
            eventEntry['backgroundColor'] = 'green';
            eventEntry['borderColor'] = 'green';
            const endDate = new Date(eventEntry['end']);
            endDate.setDate(endDate.getDate() + 1);
            eventEntry['end'] = formatDate(endDate, 'yyyy-MM-dd', 'en_US');
            break;
          case "TRAINING":
            eventEntry['backgroundColor'] = 'blue';
            eventEntry['borderColor'] = 'blue';
            break;
          case "CONSULTING":
            if (event['metadata']['assigned'] && event['metadata']['accepted']) {
              eventEntry['backgroundColor'] = 'red';
            } else {
              eventEntry['backgroundColor'] = 'white';
              eventEntry['textColor'] = 'black';
            }
            eventEntry['borderColor'] = 'red';
            break;
        }


        this.calendarComponent.getApi().addEvent(eventEntry);
      }
    })
  }


}
