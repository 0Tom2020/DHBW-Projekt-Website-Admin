import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

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
  response

  title!: string
  id: string
  editSeminar = new FormGroup({
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

  constructor(private toastr: ToastrService, private activeRoute: ActivatedRoute, private client: HttpClient) {
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

    this.client.get('http://localhost:8080/seminar/' + this.id, {withCredentials: true}).subscribe(value => {

      const startDate = new Date(value['startDate']).toLocaleDateString()
      const endDate = new Date(value['endDate']).toLocaleDateString()
      this.startDate = startDate
      this.endDate = endDate

      this.editSeminar.controls['price'].setValue(value['price'])
      this.editSeminar.controls['accommodationPrice'].setValue(value['accommodationPrice'])
      this.editSeminar.controls['mealsPrice'].setValue(value['mealsPrice'])
      this.editSeminar.controls['startDate'].setValue(startDate)
      this.editSeminar.controls['endDate'].setValue(endDate)
      this.editSeminar.controls['capacity'].setValue(value['capacity'])
      this.editSeminar.controls['description'].setValue(value['description'])
      this.editSeminar.controls['street'].setValue(value['street'])
      this.editSeminar.controls['city'].setValue(value['city'])
      this.editSeminar.controls['postal'].setValue(value['postal'])
      this.editSeminar.controls['title'].setValue(value['title'])
    }, error => {
      this.toastr.error(error.error.message, "Fehler")
    })
  }

  reformatDate(date) {
    const parts = date.split(".");
    const year = parseInt(parts[2], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[0], 10);
    return new Date(year, month, day).toDateString();
  }


  post() {

    const tmpStartDate = this.editSeminar.value.startDate
    const tmpEndDate = this.editSeminar.value.endDate
    // @ts-ignore
    if (tmpStartDate instanceof Date) {
      this.startDate = this.editSeminar.value.startDate
    } else {
      this.startDate = this.reformatDate(this.editSeminar.value.startDate)
    }

    // @ts-ignore
    if (tmpEndDate instanceof Date) {
      this.endDate = this.editSeminar.value.endDate
    } else {
      this.endDate = this.reformatDate(this.editSeminar.value.endDate)
    }

    const body = {
      price: this.editSeminar.value.price,
      accommodationPrice: this.editSeminar.value.accommodationPrice,
      mealsPrice: this.editSeminar.value.mealsPrice,
      startDate: this.startDate,
      endDate: this.endDate,
      capacity: this.editSeminar.value.capacity,
      description: this.editSeminar.value.description,
      street: this.editSeminar.value.street,
      city: this.editSeminar.value.city,
      postal: this.editSeminar.value.postal,
      title: this.editSeminar.value.title,
    }

    console.log(body)


    this.client.put('http://localhost:8080/seminar/' + this.id, body, {withCredentials: true}).subscribe(value => {
      this.toastr.success("Seminar erfolgreich bearbeitet!", "Erfolg")
    }, error => {
      this.toastr.error(error.error.message, "Fehler")
    })
  }

  delete() {

  }

}
