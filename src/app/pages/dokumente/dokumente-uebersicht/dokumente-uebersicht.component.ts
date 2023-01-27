import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {timer} from "rxjs";

@Component({
  selector: 'app-dokumente-uebersicht',
  templateUrl: './dokumente-uebersicht.component.html',
  styleUrls: ['./dokumente-uebersicht.component.scss']
})

export class DokumenteUebersichtComponent implements OnInit {

  searchTerm:string = ""
  title!: string;
  documents = []
  value:string = ""

  constructor(private activeRoute: ActivatedRoute, private http: HttpClient) {

  }

  ngOnInit() {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })
    this.http.get<[]>(environment.backend + '/data-transfer/documents/', {withCredentials: true}).subscribe(value => {
      for (const doc of value) {
        this.documents.push(doc);
      }
    }, error => {
      console.log(error);
    });
  }

  onFileDropped($event: any) {
    this.upload($event);
  }

  private upload(files: Array<any>) {
    for(const file of files) {
      const formData = new FormData();
      formData.append('file', file, file.name)
      this.http.post<[]>(environment.backend + '/data-transfer/documents/', formData, {withCredentials: true}).subscribe(value => {
        for (const doc of value) {
          this.documents.push(doc);
        }
      }, error => {
        console.log(error);
      });


    }
  }

  viewDocument(singleDocument: any) {
    window.open(environment.backend + '/data-transfer/document/' + singleDocument.id + '/data', '_blank');
  }

  deleteDocument(singleDocument: any) {
    this.http.delete(environment.backend + '/data-transfer/document/' + singleDocument.id, {withCredentials: true}).subscribe(value => {
      this.documents.splice(this.documents.indexOf(singleDocument), 1)
      const tmp = this.searchTerm
      this.searchTerm = ""
      timer(1).subscribe(() => this.searchTerm = tmp)

    }, error => {
      console.log(error);
    });
  }
}
