import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environments/environment";


@Component({
  selector: 'app-informationsbeitrag-erstellen',
  templateUrl: './informationsbeitrag-erstellen.component.html',
  styleUrls: ['./informationsbeitrag-erstellen.component.scss'],
})
export class InformationsbeitragErstellenComponent implements OnInit {

  dropdownList: Object = [];
  dropdownSettings;
  title!:string

  newArticle = new FormGroup ({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    file: new FormControl,
    moreInfoLink: new FormControl,
    partners: new FormControl
  })

  constructor(private activeRoute: ActivatedRoute, private client: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })

    this.client.get(environment.backend + '/partner').subscribe(data => {
      this.dropdownList = data
    })



    this.dropdownList = [
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Alle Auswählen',
      unSelectAllText: 'Alle Abwählen',
      searchPlaceholderText: 'Suche',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }


  post() {
    if (this.newArticle.invalid) {
      this.toastr.error("Bitte füllen Sie alle Felder aus!", "Fehler")
    } else {
      const body = this.newArticle.value
      this.client.post(environment.backend + '/infoEntry/create', body, {withCredentials:true, }).subscribe(response => {
        console.log(body)
        //this.newArticle.reset()
        this.toastr.success("Es wurde erfolgreich ein neuer Partner angelegt")
      })

    }



  }


}
