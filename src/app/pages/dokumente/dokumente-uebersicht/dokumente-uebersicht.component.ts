import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dokumente-uebersicht',
  templateUrl: './dokumente-uebersicht.component.html',
  styleUrls: ['./dokumente-uebersicht.component.scss']
})

export class DokumenteUebersichtComponent implements OnInit {

  searchTerm:string = ""
  title!: string;
  documents = [
    {documentID: "15648945631", documentName: "Testdokument1"},
    {documentID: "45671534657", documentName: "Testdokument2"},
    {documentID: "45646544564", documentName: "Testdokument3"},
    {documentID: "78918978975", documentName: "Testdokument4"},
    {documentID: "78975156489", documentName: "Testdokument5"},
    {documentID: "14571312548", documentName: "Testdokument6"},
    {documentID: "31548943155", documentName: "Testdokument7"},
    {documentID: "14878325988", documentName: "Testdokument8"},
    {documentID: "15648913548", documentName: "Testdokument9"},
  ]

  constructor(private activeRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })
  }

}
