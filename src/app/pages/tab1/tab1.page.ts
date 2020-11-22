import { Article } from "./../../interfaces/interfaces";
import { DataServiceService } from "./../../services/data-service.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { IonContent } from "@ionic/angular";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  newsAll: Article[] = [];
  pais: string = "us";
  formerPais: string = "us";

  constructor(
    private dataService: DataServiceService,
    private newOnBrowser: InAppBrowser
  ) {}

  ngOnInit(): void {
    this.chargingNewsHome(this.pais);
  }

  async receiveCountryToSelect(event) {
    this.newsAll = await [];
    this.pais = await event;
    await this.dataService.counterTriggererAllNews();
    console.log(this.dataService.pageCounterAllNewshome);
    
    this.chargingNewsHome(this.pais);
    this.content.scrollToTop();
  }

  loadDataHome(event) {
    console.log(event);
    this.chargingNewsHome(this.pais, event);
  }

  async chargingNewsHome(country: string, event?) {
    (await this.dataService.getAllNews(country)).subscribe((result) => {
      this.newsAll.push(...result.articles);
      if (event) {
        event.target.complete();
        console.log(event);
      }//this for infinite scroll.
      console.log(this.newsAll);
    });
  }
}
