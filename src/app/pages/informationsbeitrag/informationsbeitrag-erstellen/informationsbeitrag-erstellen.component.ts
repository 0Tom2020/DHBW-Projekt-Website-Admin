import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-informationsbeitrag-erstellen',
  templateUrl: './informationsbeitrag-erstellen.component.html',
  styleUrls: ['./informationsbeitrag-erstellen.component.scss'],
})
export class InformationsbeitragErstellenComponent implements OnInit {

  dropdownList = [];
  dropdownSettings = {};
  title!:string

  newArticle = new FormGroup ({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    file: new FormControl,
    linkage: new FormControl,
    partners: new FormControl
  })

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })
    this.dropdownList = [
      { partnerID: 1, partnerName: 'Projektpartner 1' },
      { partnerID: 2, partnerName: 'Test' },
      { partnerID: 3, partnerName: 'Ingo GmbH' },
      { partnerID: 4, partnerName: 'Navsari' },
      { partnerID: 5, partnerName: 'New Delhi' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'partnerID',
      textField: 'partnerName',
      selectAllText: 'Alle Auswählen',
      unSelectAllText: 'Alle Abwählen',
      searchPlaceholderText: 'Suche',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


  post() {
  /*  console.log(this.newArticle.value)
    this.dropdownList = [
      { item_id: 1, item_text: 'Projektpartner 1' },
      { item_id: 2, item_text: 'Test' },
      { item_id: 3, item_text: 'Ingo GmbH' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Alle Auswählen',
      unSelectAllText: 'Alle Abwählen',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };*/

  }


}
