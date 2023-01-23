import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-informationsbeitrag-bearbeiten',
  templateUrl: './informationsbeitrag-bearbeiten.component.html',
  styleUrls: ['./informationsbeitrag-bearbeiten.component.scss']
})
export class InformationsbeitragBearbeitenComponent implements OnInit{

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  title!:string

  editArticle = new FormGroup ({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    file: new FormControl,
    linkage: new FormControl,
    partners: new FormControl,
  })

  constructor(private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })

     this.dropdownList = [
     { documentID: 1, documentName: 'Projektpartner 1' },
     { documentID: 2, documentName: 'Test' },
     { documentID: 3, documentName: 'Ingo GmbH' },
     { documentID: 4, documentName: 'Navsari' },
     { documentID: 5, documentName: 'New Delhi' }
   ];
   this.selectedItems = [
     { documentID: 3, documentName: 'Ingo GmbH' },
     { documentID: 4, documentName: 'Navsari' }
   ];
   this.dropdownSettings = {
     singleSelection: false,
     idField: 'documentID',
     textField: 'documentName',
     selectAllText: 'Alle Auswählen',
     unSelectAllText: 'Alle Abwählen',
     searchPlaceholderText: 'Suche',
     itemsShowLimit: 3,
     allowSearchFilter: true
   };
  }

  post() {
    console.log(this.editArticle.value)

  }

  delete() {
    console.log("delete")
  }

}
