import { StorageService } from "./../../services/storage.service";
import { Article } from "./../../interfaces/interfaces";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { ActionSheetController, Platform } from "@ionic/angular";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-unique-new",
  templateUrl: "./unique-new.component.html",
  styleUrls: ["./unique-new.component.scss"],
})
export class UniqueNewComponent implements OnInit {
  @Input() new: Article;
  @Input() i: number;
  @Input() inFavoritestab;

  id: string;
  buttonInFavorites: string = "heart";

  constructor(
    private route: ActivatedRoute,
    private goToUrlInBrowser: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private nativeStorage: NativeStorage,
    public storageService: StorageService,
    private router: Router,
    public toastController: ToastController,
    private platForm: Platform
  ) {}

  ngOnInit() {
    // this.id = this.route.snapshot.params['id']
    if (this.inFavoritestab) {
      this.buttonInFavorites = "heart-outline";
    } else {
      this.buttonInFavorites = "heart";
    }
  }

  async showActions() {
    let inFavorite: any;

    if (!this.inFavoritestab) {
      inFavorite = {
        cssClass: "dark-action",
        text: "Favorite",
        icon: "heart",
        handler: () => {
          console.log("Favorite clicked");
          this.storageService.saveFavoriteSelected(this.new);
          this.addedToFavoriteNotification();
        },
      };
    } else if (this.inFavoritestab) {
      inFavorite = {
        cssClass: "dark-action",
        text: "Delete Of Favorite",
        icon: "trash",
        handler: () => {
          console.log("Favorite clicked");
          this.storageService.deleteAFavoriteNew(this.new);
        },
      };
    }
    const actionSheet = await this.actionSheetController.create({
      cssClass: "dark-action",
      buttons: [
        {
          cssClass: "dark-action",
          text: "Share",
          icon: "share",
          handler: () => {
            this.shareNewsInWeb();
            // console.log("Share clicked");
          },
        },
        inFavorite,
        {
          cssClass: "dark-action1",
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            // console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }

  goToSiteUrl() {
    console.log("Noticia", this.new.url);

    this.goToUrlInBrowser.create(this.new.url);
  }

  async dislikeFavorite() {
    await this.storageService.deleteAFavoriteNew(this.new);
    this.storageService.getFavoritesNews();
  }

  async likeFavorite() {
    await this.storageService.saveFavoriteSelected(this.new);
    await this.addedToFavoriteNotification();
  }

  async addedToFavoriteNotification() {
    const toast = await this.toastController.create({
      message: "Added To Favorite.",
      duration: 1000,
    });
    toast.present();
    setTimeout(() => {
      this.router.navigate(["/tabs/tab3"]);
    }, 1000);
  }

  shareNewsInWeb() {//fucnion para la comparticion de la pwa
    if (this.platForm.is("capacitor")) {
      this.socialSharing.share(
        this.new.title,
        this.new.author,
        "",
        this.new.url
      );
    } else {
      if (navigator.share) {
        navigator
          .share({
            title: this.new.title,
            text: this.new.description,
            url: this.new.url,
          })
          .then(() => console.log("Successful share"))
          .catch((error) => console.log("Error sharing", error));
      }else{
        console.log('unable to share not supported');
        
      }
    }
  }
}
