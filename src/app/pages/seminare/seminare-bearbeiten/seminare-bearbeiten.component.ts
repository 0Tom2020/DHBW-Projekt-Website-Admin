import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {formatDate} from "@angular/common";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-seminare-bearbeiten',
  templateUrl: './seminare-bearbeiten.component.html',
  styleUrls: ['./seminare-bearbeiten.component.scss']
})
export class SeminareBearbeitenComponent implements OnInit {

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
    {label: "Bearbeiten", route: '/'},
  ]
  startDate
  endDate
  title!: string
  id: string
  participants: any
  minDate = new Date()

  editSeminar = new FormGroup({
    price: new FormControl({value: '', disabled: true}),
    accommodationPrice: new FormControl({value: '', disabled: true}),
    mealsPrice: new FormControl({value: '', disabled: true}),
    startDate: new FormControl({value: '', disabled: true}),
    endDate: new FormControl({value: '', disabled: true}),
    capacity: new FormControl({value: '', disabled: true}),
    description: new FormControl(''),
    street: new FormControl({value: '', disabled: true}),
    city: new FormControl({value: '', disabled: true}),
    postal: new FormControl({value: '', disabled: true}),
    title: new FormControl(''),
  })

  constructor(private router: Router ,private toastr: ToastrService, private activeRoute: ActivatedRoute, private client: HttpClient) {
  }

  ngOnInit() {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })

    this.activeRoute.params.subscribe(value => {
      if (value['id']) {
        this.id = value['id'];
      }
    })

    this.client.get(environment.backend +'/seminar/' + this.id, {withCredentials: true}).subscribe(value => {

      this.editSeminar.controls['price'].setValue(value['price'])
      this.editSeminar.controls['accommodationPrice'].setValue(value['accommodationPrice'])
      this.editSeminar.controls['mealsPrice'].setValue(value['mealsPrice'])
      this.editSeminar.controls['startDate'].setValue(formatDate(value['startDate'], 'dd-MM-yyyy', 'en_US'))
      this.editSeminar.controls['endDate'].setValue(formatDate(value['endDate'], 'dd-MM-yyyy', 'en_US'))
      this.editSeminar.controls['capacity'].setValue(value['capacity'])
      this.editSeminar.controls['description'].setValue(value['description'])
      this.editSeminar.controls['street'].setValue(value['street'])
      this.editSeminar.controls['city'].setValue(value['city'])
      this.editSeminar.controls['postal'].setValue(value['postal'])
      this.editSeminar.controls['title'].setValue(value['title'])
    }, error => {
      this.toastr.error(error.error.message, "Fehler")
    })

    this.client.get(environment.backend +'/seminar/' + this.id + '/bookings', {withCredentials: true}).subscribe(value => {
      this.participants = value
      console.log(this.participants)
    }, error => {
      this.toastr.error(error.error.message, "Fehler")
    })
  }



  post() {

    const body = {
      description: this.editSeminar.value.description,
      title: this.editSeminar.value.title,
    }

    console.log(body)


    this.client.put(environment.backend +'/seminar/' + this.id, body, {withCredentials: true}).subscribe(value => {
      this.toastr.success("Seminar erfolgreich bearbeitet!", "Erfolg")
    }, error => {
      this.toastr.error(error.error.message, "Fehler")
    })
  }

  delete() {
    this.client.delete(environment.backend +'/seminar/' + this.id, {withCredentials: true}).subscribe(value => {
      this.toastr.success("Seminar erfolgreich gelöscht!", "Erfolg")
      this.router.navigate(['/seminare/uebersicht'])
    }, error => {
        this.toastr.error(error.error.message, "Fehler")
    })
  }

  deleteBooking(id) {
    this.client.delete(environment.backend +'/seminar/' + this.id + '/bookings/' + id, {withCredentials: true}).subscribe(value => {
      this.toastr.success("Buchung erfolgreich gelöscht!", "Erfolg")
      this.client.get(environment.backend +'/seminar/' + this.id + '/bookings', {withCredentials: true}).subscribe(value => {
        this.participants = value
      })
    })

  }

}
