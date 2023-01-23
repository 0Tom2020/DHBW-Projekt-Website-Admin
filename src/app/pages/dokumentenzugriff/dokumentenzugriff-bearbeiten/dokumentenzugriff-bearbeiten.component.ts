import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dokumentenzugriff-bearbeiten',
  templateUrl: './dokumentenzugriff-bearbeiten.component.html',
  styleUrls: ['./dokumentenzugriff-bearbeiten.component.scss']
})
export class DokumentenzugriffBearbeitenComponent implements OnInit {

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
    {label: "Test", route: '/'},
  ]

  searchTerm:string = ""
  searchTermAdded:string = ""
  documents = [
    {documentID: "1", documentName: "Testdokument1"},
    {documentID: "2", documentName: "Testdokument2"},
    {documentID: "3", documentName: "Testdokument3"},
    {documentID: "4", documentName: "Testdokument4"},
    {documentID: "5", documentName: "Testdokument5"},
    {documentID: "6", documentName: "Testdokument6"},
    {documentID: "7", documentName: "Testdokument7"},
    {documentID: "8", documentName: "Testdokument8"},
    {documentID: "9", documentName: "Testdokument9"},
  ]
  documentsAdded = []
  title! :string
  newAccessCode = new FormGroup({
    accessCode: new FormControl('',[this.onlyCharsValidator, Validators.required]),
    file: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
  })

  constructor(private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
  }



  ngOnInit() {
    this.activatedRoute.data.subscribe( value => {
      this.title = value['title']
    })



  }

  post() {
    if (this.newAccessCode.controls.accessCode.invalid) {
      return this.toastr.error("Es sind nur folgende Zeichen zugelassen: Klein- und Großbuchstaben, sowie Zahlen")
    }
  }

  generateCode (length:number):string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.newAccessCode.controls.accessCode.setValue(result)
    return result;
  }

  onlyCharsValidator(control: FormControl) {
    const onlyCharsRegex = /^[a-zA-Z1-9]*$/;
    if (!onlyCharsRegex.test(control.value)) {
      return { onlyChars: true };
    }
    return null;
  }

  delete () {

  }

  sortFunction (documentNameA, documentNameB) {
    const tmpDocumentNameA = documentNameA.documentName.toUpperCase();
    const tmpDocumentNameB = documentNameB.documentName.toUpperCase();
    if (tmpDocumentNameA < tmpDocumentNameB) {
      return -1;
    }
    if (tmpDocumentNameA > tmpDocumentNameB) {
      return 1;
    }
    return 0;
  }

  addDocument(documentID: string) {
    let tmpObj = this.documents.find(o => o.documentID === documentID);
    let index = this.documents.indexOf(tmpObj)
    this.documents.splice(index, 1)
    this.documentsAdded.push(tmpObj)
    this.documentsAdded.sort(this.sortFunction)
  }

  removeDocument(documentID: string) {
    let tmpObj = this.documentsAdded.find(o => o.documentID === documentID);
    let index = this.documentsAdded.indexOf(tmpObj)
    this.documentsAdded.splice(index, 1)
    this.documents.push(tmpObj)
    this.documents.sort(this.sortFunction)
  }

}

