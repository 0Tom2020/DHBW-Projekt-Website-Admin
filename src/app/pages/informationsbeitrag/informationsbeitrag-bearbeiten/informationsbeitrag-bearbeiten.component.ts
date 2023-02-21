import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environments/environment";
import {timer} from "rxjs";

@Component({
  selector: 'app-informationsbeitrag-bearbeiten',
  templateUrl: './informationsbeitrag-bearbeiten.component.html',
  styleUrls: ['./informationsbeitrag-bearbeiten.component.scss']
})
export class InformationsbeitragBearbeitenComponent implements OnInit {

  breadcrumbItems = [
    {label: "Home", route: '/'},
    {label: "Übersicht", route: './..'},
    {label: "Bearbeiten", route: ''},
  ]
  dropdownList;
  selectedItems;
  dropdownSettings;
  title!:string
  id:string

  editArticle = new FormGroup ({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    file: new FormControl,
    moreInfoLink: new FormControl,
    partners: new FormControl,
  })

  images: string[] = [];

  files: File[] = [];

  constructor(private activeRoute: ActivatedRoute, private client: HttpClient, private toastr: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.activeRoute.data.subscribe(value => {
      this.title = value['title']
    })

    this.activeRoute.params.subscribe(params => {
      this.id = params['id']
    })

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

    this.client.get(environment.backend + '/infoEntry/single/' + this.id, {withCredentials: true}).subscribe((value: any) => {
      this.editArticle.patchValue({
        title: value.title,
        description: value.description,
        moreInfoLink: value.moreInfoLink,
      })
    }, error => {
      console.log(error)
    })
    this.client.get(environment.backend + '/partner', {withCredentials: true}).subscribe((value: any) => {
      this.dropdownList = value
    }, error => {
      console.log(error)
    })
    this.client.get(environment.backend + '/partner/infoEntry/' + this.id, {withCredentials: true}).subscribe((value: any) => {
      this.selectedItems = value
    }, error => {
      console.log(error)
    })

    this.client.get<any[]>(environment.backend + '/infoEntry/single/' + this.id + '/images', {withCredentials: true}).subscribe((value: any) => {
      for (const image of value) {
        this.images.push(image)
      }
    })
  }

  post() {
    const body = this.editArticle.value
    this.client.put(environment.backend + '/infoEntry/single/' + this.id, body, {withCredentials: true}).subscribe(() => {
      this.toastr.success("Informationsbeitrag wurde erfolgreich bearbeitet")
    }, error => {
      this.toastr.error(error.error.message, "Fehler")
    })

    const formData = new FormData();
    for (const file of this.files) {
      formData.append('file', file, file["name"])
    }
    this.client.post(environment.backend + '/infoEntry/single/' + this.id + '/images', formData, {withCredentials: true}).subscribe(value => {
      this.toastr.success("Es wurde erfolgreich '" + this.files.length + "' Bild(er) hochgeladen");
      this.images.splice(0, this.images.length)
      for (const file of this.files) {
        this.images.push(file["name"])
      }
      this.files.splice(0, this.files.length)
    }, error => {
      console.log(error);
    });
  }

  delete() {
    this.client.delete(environment.backend + '/infoEntry/single/' + this.id, {withCredentials:true}).subscribe(() => {
      this.toastr.success("Informationsbeitrag wurde erfolgreich gelöscht")
      this.router.navigate(['/informationsbeitrag/uebersicht'])
    }, error => {
      console.log(error)
    })
  }

  viewImage(imageName: any) {
    window.open(environment.backend + '/infoEntry/single/' + this.id + '/images/' + imageName, '_blank');
  }

  deleteImage(imageName: any) {
    this.client.delete(environment.backend + '/infoEntry/single/' + this.id + '/images/' + imageName, {withCredentials: true}).subscribe(value => {
      this.images.splice(this.images.indexOf(imageName), 1)
    }, error => {
      console.log(error);
    });
  }

  onFileChange($event: Event) {
    if ($event.target["files"].length > 0) {
      this.files = $event.target["files"];
    }
  }

}
