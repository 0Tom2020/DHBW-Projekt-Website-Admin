import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {defineLocale, deLocale} from "ngx-bootstrap/chronos";
import {BsLocaleService} from "ngx-bootstrap/datepicker";
defineLocale('de', deLocale);

@Component({
  selector: 'app-seminare-erstellen',
  templateUrl: './seminar-erstellen.component.html',
  styleUrls: ['./seminar-erstellen.component.scss']
})
export class SeminarErstellenComponent implements OnInit {

  title!: string

  newSeminar = new FormGroup({
    price: new FormControl(''),
    accommodationPrice: new FormControl(''),
    mealsPrice: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    capacity: new FormControl(''),
    description: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    postal: new FormControl(''),
    title: new FormControl(''),
  })

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
  ]

  constructor(private toastr: ToastrService, private activeRoute: ActivatedRoute, private client: HttpClient, private bsLocaleService: BsLocaleService) {
    this.bsLocaleService.use('de')
  }

  ngOnInit() {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })
  }

  post() {
    console.log(this.newSeminar.value)
    this.client.post('http://localhost:8080/seminar', this.newSeminar.value, {withCredentials: true}).subscribe(value => {
      this.toastr.success("Seminar erfolgreich erstellt!", "Erfolg")
    }, error => {
      this.toastr.error(error.error.message, "Fehler")
    })
  }
}
