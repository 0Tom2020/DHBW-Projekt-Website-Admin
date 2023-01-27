import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-informationsbeitrag-bearbeiten',
  templateUrl: './informationsbeitrag-bearbeiten.component.html',
  styleUrls: ['./informationsbeitrag-bearbeiten.component.scss']
})
export class InformationsbeitragBearbeitenComponent implements OnInit {

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
    {label: "Bearbeiten", route: ''},
  ]

  dropdownList;
  selectedItems;
  dropdownSettings;
  title!:string
  id:string

  editArticle = new FormGroup ({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    file: new FormControl,
    moreInfoLink: new FormControl,
    partners: new FormControl,
  })

  constructor(private activeRoute: ActivatedRoute, private client: HttpClient, private toastr: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })

    this.activeRoute.params.subscribe(params => {
      this.id = params['id']
    })

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

    this.client.get(environment.backend + '/infoEntry/single/' + this.id, {withCredentials: true}).subscribe((value: any) => {
      this.editArticle.patchValue({
        title: value.title,
        description: value.description,
        moreInfoLink: value.moreInfoLink,
      })
    })
    this.client.get(environment.backend + '/partner', {withCredentials: true}).subscribe((value: any) => {
      this.dropdownList = value
    })
    this.client.get(environment.backend + '/partner/infoEntry/' + this.id, {withCredentials: true}).subscribe((value: any) => {
      this.selectedItems = value
    })
  }

  post() {
    const body = this.editArticle.value
    console.log(body)
    this.client.put(environment.backend + '/infoEntry/single/' + this.id, body, {withCredentials: true}).subscribe(() => {
      this.toastr.success("Informationsbeitrag wurde erfolgreich bearbeitet")
    })
  }

  delete() {
    this.client.delete(environment.backend + '/infoEntry/single/' + this.id, {withCredentials:true}).subscribe(() => {
      this.toastr.success("Informationsbeitrag wurde erfolgreich gelöscht")
      this.router.navigate(['/informationsbeitrag/uebersicht'])
    })
  }

}
