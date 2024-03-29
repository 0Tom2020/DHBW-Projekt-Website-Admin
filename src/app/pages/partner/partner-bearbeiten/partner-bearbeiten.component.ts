import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-partner-bearbeiten',
  templateUrl: './partner-bearbeiten.component.html',
  styleUrls: ['./partner-bearbeiten.component.scss']
})
export class PartnerBearbeitenComponent implements OnInit {

  title!: string
  partner
  id
  partnerPicture
  editPartner = new FormGroup({
    name: new FormControl('', [Validators.required]),
    website: new FormControl(''),
    file: new FormControl,
  })
  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
    {label: "Bearbeiten", route: ''},
  ]
  backend = environment.backend;
  existsPartnerPicture: boolean

  file: any;

  @ViewChild('PartnerImage') PartnerImageElement: any;

  constructor(private activeRoute: ActivatedRoute, private client: HttpClient, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })

    this.activeRoute.params.subscribe(params => {
      this.id = params['id']
      this.client.get(environment.backend + '/partner/single/' + this.id, {withCredentials: true}).subscribe(data => {
        this.partner = data
        this.existsPartnerPicture = this.partner['existsPartnerPicture']
        this.editPartner.controls['name'].setValue(this.partner['name'])
        this.editPartner.controls['website'].setValue(this.partner['website'])
      }, error => {
        console.log(error)
      })
    })


  }

  post() {

    const body = this.editPartner.value
    this.client.put(environment.backend + '/partner/single/' + this.id, body, {withCredentials: true}).subscribe(data => {
      this.toastr.success("Es wurde erfolgreich der Partner geändert")

      const formData = new FormData();
      if (this.file) {
        const file = this.file;
        formData.append('file', file, file["name"])
        this.client.post(environment.backend + '/partner/single/' + this.id + '/picture', formData, {withCredentials: true}).subscribe(value => {
          this.toastr.success("Es wurde erfolgreich ein neues Bild hochgeladen");
          this.refreshImage();
        }, error => {
          console.log(error);
        });
      }
    }, error => {
      console.log(error)
    })


  }

  delete() {
    this.client.delete(environment.backend + '/partner/single/' + this.id, {withCredentials: true}).subscribe(data => {
      this.toastr.success("Partner wurde erfolgreich gelöscht")
      this.router.navigate(['/partner/uebersicht'])
    }, error => {
      console.log(error)
    })
  }

  onFileChange($event: Event) {
    if ($event.target["files"].length > 0) {
      const file = $event.target["files"][0];
      this.file = file;
    }
  }

  refreshImage() {
    this.PartnerImageElement.nativeElement.src = this.PartnerImageElement.nativeElement.src + '?' + new Date().getTime();
  }
}
