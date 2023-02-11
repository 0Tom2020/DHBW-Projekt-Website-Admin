import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {defineLocale, deLocale} from "ngx-bootstrap/chronos";
import {BsLocaleService} from "ngx-bootstrap/datepicker";
import {environment} from "../../../../environments/environment";


defineLocale('de', deLocale);

@Component({
    selector: 'app-seminare-erstellen',
    templateUrl: './seminar-erstellen.component.html',
    styleUrls: ['./seminar-erstellen.component.scss']
})
export class SeminarErstellenComponent implements OnInit {

    title!: string
    minDate = new Date()

    newSeminar = new FormGroup({
        price: new FormControl('50'),
        accommodationPrice: new FormControl('50'),
        mealsPrice: new FormControl('50'),
        startDate: new FormControl(''),
        startTime: new FormControl('', Validators.required),
        endDate: new FormControl(''),
        endTime: new FormControl('', Validators.required),
        capacity: new FormControl('10'),
        description: new FormControl('Testbeschreibung'),
        street: new FormControl('teststraße 1'),
        city: new FormControl('teststadt'),
        postal: new FormControl('testplz'),
        title: new FormControl('testseminar'),


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
        if (this.newSeminar.invalid) {
            this.toastr.error('Bitte überprüfen Sie Ihre Zeitangaben', 'Fehler')
            return
        }

        const startDate = new Date(this.newSeminar.controls['startDate'].value)
        const startTime = new Date(this.newSeminar.controls['startTime'].value)
        const endDate = new Date(this.newSeminar.controls['endDate'].value)
        const endTime = new Date(this.newSeminar.controls['endTime'].value)
        const startDateAndTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime.getHours(), startTime.getMinutes())
        const endDateAndTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endTime.getHours(), endTime.getMinutes())
        const body = {
            price: this.newSeminar.controls['price'].value,
            accommodationPrice: this.newSeminar.controls['accommodationPrice'].value,
            mealsPrice: this.newSeminar.controls['mealsPrice'].value,
            startDate: startDateAndTime,
            endDate: endDateAndTime,
            capacity: this.newSeminar.controls['capacity'].value,
            description: this.newSeminar.controls['description'].value,
            street: this.newSeminar.controls['street'].value,
            city: this.newSeminar.controls['city'].value,
            postal: this.newSeminar.controls['postal'].value,
            title: this.newSeminar.controls['title'].value,
        }
        this.client.post(environment.backend +'/seminar', body, {withCredentials: true}).subscribe(value => {
          this.toastr.success("Seminar erfolgreich erstellt!", "Erfolg")
        }, error => {
          this.toastr.error(error.error.message, "Fehler")
        })
    }
}
