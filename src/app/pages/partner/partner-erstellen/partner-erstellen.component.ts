import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-partner-erstellen',
  templateUrl: './partner-erstellen.component.html',
  styleUrls: ['./partner-erstellen.component.scss']
})
export class PartnerErstellenComponent implements OnInit {

  title!: string

  file: any;

  newPartner = new FormGroup({
    name: new FormControl('', [Validators.required]),
    website: new FormControl(''),
    file: new FormControl(),
  })

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
    {label: "Erstellen", route: ''},
  ]

  constructor(private activeRoute: ActivatedRoute, private toastr: ToastrService, private client: HttpClient) {
  }

  ngOnInit() {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })
  }

  post() {
    if (this.newPartner.invalid) {
      this.toastr.error("Bitte füllen Sie alle Felder aus!", "Fehler")
    } else {
      const body = this.newPartner.value
      this.client.post(environment.backend + '/partner/create', body, {withCredentials: true}).subscribe(data => {
        this.newPartner.reset()
        this.toastr.success("Es wurde erfolgreich ein neuer Partner angelegt")
        const formData = new FormData();
        const file = this.file;
        formData.append('file', file, file["name"])
        this.client.post(environment.backend + '/partner/single/' + data["id"] + '/picture', formData, {withCredentials: true}).subscribe(value => {
            this.toastr.success("Es wurde erfolgreich ein neues Bild hochgeladen");
        }, error => {
          console.log(error);
        });
      }, error => {
        console.log(error)
      })
    }
  }

  onFileChange($event: Event) {
    if ($event.target["files"].length > 0) {
      const file = $event.target["files"][0];
      this.file = file;
    }
  }
}
