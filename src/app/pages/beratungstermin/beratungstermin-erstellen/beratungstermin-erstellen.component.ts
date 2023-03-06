import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {defineLocale, deLocale} from "ngx-bootstrap/chronos";
import {BsLocaleService} from "ngx-bootstrap/datepicker";
import {environment} from "../../../../environments/environment";


defineLocale('de', deLocale);

@Component({
  selector: 'app-beratungstermin-erstellen',
  templateUrl: './beratungstermin-erstellen.component.html',
  styleUrls: ['./beratungstermin-erstellen.component.scss']
})
export class BeratungsterminErstellenComponent implements OnInit {

  title!: string
  minDate = new Date()
  isChecked = false


  newConsultingAppointment = new FormGroup({
    price: new FormControl(''),
    date: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
    repetition: new FormControl(''),
  })

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
    {label: "Beratungstermin erstellen", route: ''},
  ]

  constructor(private toastr: ToastrService, private activeRoute: ActivatedRoute, private client: HttpClient, private bsLocaleService: BsLocaleService, private router: Router) {
    this.bsLocaleService.use('de')
  }

  ngOnInit() {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })
  }

  post() {
    const startDate = new Date(this.newConsultingAppointment.controls['date'].value)
    const startTime = new Date(this.newConsultingAppointment.controls['startTime'].value)
    const endTime = new Date(this.newConsultingAppointment.controls['endTime'].value)
    const startDateAndTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime.getHours(), startTime.getMinutes())
    const endDateAndTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), endTime.getHours(), endTime.getMinutes())
    if (this.newConsultingAppointment.invalid) {
        this.toastr.error('Bitte überprüfen Sie Ihre Zeitangaben', 'Fehler')
        return
    }

    if (startDateAndTime > endDateAndTime) {
      this.toastr.error('Bitte überprüfen Sie Ihre Zeitangaben', 'Fehler')
      return
    }
    const body = {
        price: this.newConsultingAppointment.controls['price'].value,
        startDate: startDateAndTime,
        endDate: endDateAndTime,
        repetition: this.newConsultingAppointment.controls['repetition'].value
    }

    this.client.post(environment.backend + '/consulting/create', body, {withCredentials: true}).subscribe(value => {
      this.toastr.success('Beratungstermin erfolgreich erstellt', 'Erfolg')
      this.router.navigate(['./../'+ value['id']], {relativeTo: this.activeRoute})

    }, error => {
        this.toastr.error(error.error.message, 'Fehler')
    })


  }
}
