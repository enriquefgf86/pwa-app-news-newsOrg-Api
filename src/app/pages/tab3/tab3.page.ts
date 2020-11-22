import { Article } from "./../../interfaces/interfaces";
import { StorageService } from "./../../services/storage.service";
import { Component, OnInit } from "@angular/core";
import { DataServiceService } from "src/app/services/data-service.service";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page implements OnInit {
  pais: string = "";
  favorites: Article[] = [];
  constructor(
    private dataService: DataServiceService,
    public storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getFavoritesInstack();
  }

  async getFavoritesInstack() {
    let favorites = await this.storageService.newsSelectedFavorites;
    if (favorites) {
      this.favorites = favorites;
    }
    console.log(this.favorites);
  }

  async deleteFavorites() {
    await this.storageService.deleteAllFavoritesNews().then(() => {
      console.log("deleted All");
    });
  }

 
}
