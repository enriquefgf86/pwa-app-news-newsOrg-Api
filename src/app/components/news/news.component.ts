import { Article } from "./../../interfaces/interfaces";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.scss"],
})
export class NewsComponent implements OnInit {
  @Input() newsAll: Article[] = []; //proviene del tabs 1 especificamente del array de objectos asignanpods
  //a la variable newsAll

  @Input() inFavoritestab: boolean = false;

  constructor() {}

  ngOnInit() {}
}
