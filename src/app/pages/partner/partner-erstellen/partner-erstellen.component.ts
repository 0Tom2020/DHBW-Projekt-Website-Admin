import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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

  constructor(private activeRoute: ActivatedRoute, private toastr: ToastrService, private client: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })
  }

  post() {
    let partnerID: string;
    const body = {
      name: this.newPartner.value.name,
      website: this.newPartner.value.website,
    }
    this.client.post (environment.backend + '/partner/create', body, {withCredentials: true}).subscribe(async data => {
      this.toastr.success("Es wurde erfolgreich ein neuer Partner angelegt")
      partnerID = data["id"]
      if (this.file) {
        const formData = new FormData();
        const file = this.file;
        formData.append('file', file, file["name"])
        this.client.post(environment.backend + '/partner/single/' + partnerID + '/picture', formData, {withCredentials: true}).subscribe(value => {
          this.toastr.success("Es wurde erfolgreich ein neues Bild hochgeladen");
          this.router.navigate(['./../' + partnerID], {relativeTo: this.activeRoute})
        }, error => {
          this.toastr.error(error.error.message, "Fehler")
        });
      } else {
        this.router.navigate(['./../' + partnerID], {relativeTo: this.activeRoute})
      }

    }, error => {
      this.toastr.error(error.error.message, "Fehler")
    })

  }
  fileUpload(id) {
    if (this.file) {
      const formData = new FormData();
      const file = this.file;
      formData.append('file', file, file["name"])
      this.client.post(environment.backend + '/partner/single/' + id + '/picture', formData, {withCredentials: true}).subscribe(value => {
        this.toastr.success("Es wurde erfolgreich ein neues Bild hochgeladen");
        this.router.navigate(['./../' + id], {relativeTo: this.activeRoute})
      }, error => {
        this.toastr.error(error.error.message, "Fehler")
      });
    }

  }


  onFileChange($event: Event) {
    if ($event.target["files"].length > 0) {
      const file = $event.target["files"][0];
      this.file = file;
    }
  }
}
