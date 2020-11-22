import { DataServiceService } from 'src/app/services/data-service.service';
import { ElementRef } from '@angular/core';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IonSelect } from '@ionic/angular';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  @ViewChild('country') childCountry:IonSelect;

  @Output()countrySelected=new EventEmitter<string>();

  countries:string[]=[
    "ae","ar","at","au","be","bg","br","ca","ch","cn","co","cu",
    "cz","de","eg","fr","gb","gr","hk","hu","id","ie","il","in",
    "it","jp","kr","lt","lv","ma","mx","my","ng","nl","no","nz",
    "ph","pl","pt","ro","rs","ru","sa","se","sg","si","sk","th",
    "tr","tw","ua","us","ve","za"]

    pais:string='us'
  constructor() { }

  ngOnInit():void {
    console.log(this.childCountry);
    
  }

  // ionViewDidEnter() {
  //   this.childCountry.value = this.categories[0];
  // }

  async click(event){
   await  console.log(event);
   this.pais=await event.detail.value
   await  this.countrySelected.emit(this.pais)

    
  }



 

}
