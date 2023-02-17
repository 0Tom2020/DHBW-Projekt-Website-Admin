import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
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

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
    {label: "Erstellen", route: ''},
  ]

  newArticle = new FormGroup ({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    file: new FormControl,
    moreInfoLink: new FormControl,
    partners: new FormControl
  })

  files: File[] = [];
  infoEntryId!: string;

  constructor(private activeRoute: ActivatedRoute, private client: HttpClient, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })

    this.client.get(environment.backend + '/partner').subscribe(data => {
      this.dropdownList = data
    }, error => {
      console.log(error)
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
      const body = this.newArticle.value
      this.client.post(environment.backend + '/infoEntry/create', body, {withCredentials:true, }).subscribe(response => {
        this.toastr.success("Es wurde erfolgreich ein neuer Informationsbeitrag angelegt")
        this.infoEntryId = response["id"]
        const formData = new FormData();
        for (const file of this.files) {
          formData.append('file', file, file["name"])
        }
        this.client.post(environment.backend + '/infoEntry/single/' + response["id"] + '/images', formData, {withCredentials: true}).subscribe(value => {
          this.toastr.success("Es wurde erfolgreich '" + this.files.length + "' Bild(er) hochgeladen");
          this.router.navigate(['./informationsbeitrag/uebersicht/' + this.infoEntryId ])
        }, error => {
          console.log(error);
        });
      }, error => {
        this.toastr.error(error.error.message, "Fehler")
      })


    }


  onFileChange($event: Event) {
    if ($event.target["files"].length > 0) {
      this.files = $event.target["files"];
    }
  }
}
