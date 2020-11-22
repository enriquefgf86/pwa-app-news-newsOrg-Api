import { Article } from "./../../interfaces/interfaces";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { IonContent, IonSegment } from "@ionic/angular";
import { DataServiceService } from "src/app/services/data-service.service";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  @ViewChild("IonSegment") segment: IonSegment;
  @ViewChild(IonContent) content: IonContent;
  newsCategoryCountry: Article[] = [];
  categories: string[] = [
    "business",
    "entertainment",
    " general",
    " health",
    " science ",
    "sports ",
    "technology",
  ];

  pais: string = "";
  category: string;
  constructor(private dataService: DataServiceService) {}

  ionViewDidEnter() {
    this.segment.value = this.categories[0];
  }

  ngOnInit(): void {
    if (this.pais !== "") {
      this.pais;
    } else this.pais = "us";

    console.log(this.segment);
    this.dataService.counterTriggererCategoryNews();
    this.chargingNewsCategory(this.category, this.pais);
    
  }

  async seeChangeCategory(event) {
    console.log(event);
    this.category = await event.detail.value;
    await this.dataService.counterTriggererCategoryNews();
    this.newsCategoryCountry = await [];
    this.chargingNewsCategory(this.category, this.pais);
    this.content.scrollToTop();
  }

  async receiveCountryToSelectInCategory(event) {
    console.log(event);
    this.pais = await event;
    await this.dataService.counterTriggererCategoryNews();
    this.newsCategoryCountry = await [];

    this.chargingNewsCategory(this.category, this.pais);
    this.content.scrollToTop();
  }

  chargingNewsCategory(category: string, country: string, event?) {
    this.dataService
      .getAllNewsCategory(category, country)
      .subscribe((result) => {
        // this.newsCategoryCountry = [];
        this.newsCategoryCountry.push(...result.articles);
        if (event) {
          event.target.complete();
        }
        console.log(result);
      });
      
  }

  loadData(event) {
    console.log(event);

    this.chargingNewsCategory(this.category, this.pais, event);
  }

  loadDataByCategory(event) {
    console.log(event);

    this.chargingNewsCategory(this.category, this.pais, event);
  }
}
