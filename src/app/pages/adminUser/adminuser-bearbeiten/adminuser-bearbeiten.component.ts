import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-adminuser-bearbeiten',
  templateUrl: './adminuser-bearbeiten.component.html',
  styleUrls: ['./adminuser-bearbeiten.component.scss']
})
export class AdminuserBearbeitenComponent implements OnInit {

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
    {label: "Bearbeiten", route: ''},
  ]

  id:string
  title!:string
  editAdminUser = new FormGroup ({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    passwordRepeat: new FormControl('',[Validators.required]),
  })


  constructor(private activeRoute: ActivatedRoute, private client: HttpClient, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })

    this.activeRoute.params.subscribe(params => {
      this.id = params['id']
    })

    this.client.get(environment.backend + '/auth/admin/' + this.id, {withCredentials: true}).subscribe((value: any) => {
      this.editAdminUser.patchValue({
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
      })
    }, error => {
      console.log(error)
    })
  }

  post() {
    const body = this.editAdminUser.value
    this.client.post(environment.backend + '/auth/admin/' + this.id, body, {withCredentials: true}).subscribe(() => {
      this.toastr.success("Informationsbeitrag wurde erfolgreich bearbeitet")
    }, error => {
      console.log(error)
    })
  }

  delete() {
    this.client.delete(environment.backend + '/auth/admin/' + this.id, {withCredentials:true}).subscribe(() => {
      this.toastr.success("Informationsbeitrag wurde erfolgreich gelöscht")
      this.router.navigate(['/admin/uebersicht'])
    }, error => {
        console.log(error)
    })
  }


}
