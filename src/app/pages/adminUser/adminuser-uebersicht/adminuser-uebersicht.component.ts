import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

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

  constructor(private activeRoute: ActivatedRoute, private client: HttpClient) { }

  ngOnInit(): void {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })

    this.client.get('http://localhost:8080/auth/admins').subscribe(data => {
      this.adminUsers = data
    }, error => {
      console.log(error)
    })

  }

}





