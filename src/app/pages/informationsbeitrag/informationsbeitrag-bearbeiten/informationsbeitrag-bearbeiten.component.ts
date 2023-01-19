import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-informationsbeitrag-bearbeiten',
  templateUrl: './informationsbeitrag-bearbeiten.component.html',
  styleUrls: ['./informationsbeitrag-bearbeiten.component.scss']
})
export class InformationsbeitragBearbeitenComponent implements OnInit{

  editArticle = new FormGroup ({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    file: new FormControl,
    linkage: new FormControl,
  })

  ngOnInit(): void {
  }

  post() {
    console.log(this.editArticle.value)

  }

  delete() {
    console.log("delete")
  }

}
