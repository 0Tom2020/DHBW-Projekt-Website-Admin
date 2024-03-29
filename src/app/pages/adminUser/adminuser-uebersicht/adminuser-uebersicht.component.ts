import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-adminuser-uebersicht',
  templateUrl: './adminuser-uebersicht.component.html',
  styleUrls: ['./adminuser-uebersicht.component.scss']
})
export class AdminuserUebersichtComponent implements OnInit {

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
  ];
  title!: string;
  adminUsers: any;

  constructor(private activeRoute: ActivatedRoute, private client: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })

    this.client.get(environment.backend +'/auth/admins').subscribe(data => {
      this.adminUsers = data
    }, error => {
      this.toastr.error(error.error.message)
    })

  }

}





