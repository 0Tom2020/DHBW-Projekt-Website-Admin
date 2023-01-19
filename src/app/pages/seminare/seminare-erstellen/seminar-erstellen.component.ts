import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-seminare-erstellen',
  templateUrl: './seminar-erstellen.component.html',
  styleUrls: ['./seminar-erstellen.component.scss']
})
export class SeminarErstellenComponent implements OnInit{

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

  constructor(private toastr: ToastrService) {
  }

  ngOnInit() {

  }

  post () {
    if (this.newSeminar.invalid) {
      this.toastr.error("Bitte füllen Sie alle Felder aus!", "Fehler")
    }
  }

}
