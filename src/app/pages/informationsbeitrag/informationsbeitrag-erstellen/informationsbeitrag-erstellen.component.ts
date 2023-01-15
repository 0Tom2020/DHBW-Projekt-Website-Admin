import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-informationsbeitrag-erstellen',
  templateUrl: './informationsbeitrag-erstellen.component.html',
  styleUrls: ['./informationsbeitrag-erstellen.component.scss']
})
export class InformationsbeitragErstellenComponent implements OnInit {

  newArticle = new FormGroup ({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    file: new FormControl,
    linkage: new FormControl,
  })

  constructor() {}

  ngOnInit(): void {

  }

  post() {
    console.log(this.newArticle.value)

  }


}
