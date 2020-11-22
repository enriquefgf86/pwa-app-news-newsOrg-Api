import { Article } from "./../interfaces/interfaces";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

import { NativeStorage } from "@ionic-native/native-storage/ngx";
@Injectable({
  providedIn: "root",
})
export class StorageService {
  newsSelectedFavorites: Article[] = [];

  constructor(private storage: Storage, private nativeStorage: NativeStorage) {
    this.getFavoritesNews();
  }

  saveFavoriteSelected(newSelected: Article) {
    const favoriteExists = this.newsSelectedFavorites.find(
      (favorite) => favorite.title === newSelected.title
    );

    if (!favoriteExists) {
      this.newsSelectedFavorites.push(newSelected);
      this.storage.set("FavoriteNews", this.newsSelectedFavorites);
    }
  }

  async getFavoritesNews() {
    const inStorage = await this.storage.get("FavoriteNews");

    if (inStorage) {
      this.newsSelectedFavorites = inStorage;
    } else {
      this.newsSelectedFavorites = [];
    }
  }
  async deleteAllFavoritesNews() {
    await this.storage.remove("FavoriteNews");
    this.getFavoritesNews();
  }

  async deleteAFavoriteNew(aNew: Article) {
    this.newsSelectedFavorites = this.newsSelectedFavorites.filter(
      (result) => result.title !== aNew.title
    );

    this.storage.set("FavoriteNews", this.newsSelectedFavorites);
  }
}
