import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-seminare-erstellen',
  templateUrl: './seminar-erstellen.component.html',
  styleUrls: ['./seminar-erstellen.component.scss']
})
export class SeminarErstellenComponent implements OnInit{

  title!:string

  newSeminar = new FormGroup({
    price: new FormControl('',[Validators.required]),
    priceAccommodation: new FormControl('',[Validators.required]),
    priceCatering: new FormControl('',[Validators.required]),
    startDate: new FormControl('',[Validators.required]),
    endDate: new FormControl('',[Validators.required]),
    capacity: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    street: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    postal: new FormControl('',[Validators.required]),
    title: new FormControl('',[Validators.required]),
  })

  constructor(private toastr: ToastrService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })
  }

  post () {
    if (this.newSeminar.invalid) {
      this.toastr.error("Bitte füllen Sie alle Felder aus!", "Fehler")
    }
  }

}
