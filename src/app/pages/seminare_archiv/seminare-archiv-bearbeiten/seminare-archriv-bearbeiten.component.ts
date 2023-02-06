import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {formatDate} from "@angular/common";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-seminare-archiv-bearbeiten',
  templateUrl: './seminare-archriv-bearbeiten.component.html',
  styleUrls: ['./seminare-archriv-bearbeiten.component.scss']
})
export class SeminareArchrivBearbeitenComponent implements OnInit {
  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
    {label: "Detail", route: '/'},
  ]
  startDate
  endDate
  title!: string
  id: string
  participants: any

  editSeminar = new FormGroup({
    price: new FormControl({value: '', disabled: true}),
    accommodationPrice: new FormControl({value: '', disabled: true}),
    mealsPrice: new FormControl({value: '', disabled: true}),
    startDate: new FormControl({value: '', disabled: true}),
    endDate: new FormControl({value: '', disabled: true}),
    capacity: new FormControl({value: '', disabled: true}),
    description: new FormControl({value: '', disabled: true}),
    street: new FormControl({value: '', disabled: true}),
    city: new FormControl({value: '', disabled: true}),
    postal: new FormControl({value: '', disabled: true}),
    title: new FormControl({value: '', disabled: true}),
  })

  constructor(private router: Router, private toastr: ToastrService, private activeRoute: ActivatedRoute, private client: HttpClient) {
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

  }


}
