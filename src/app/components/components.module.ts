import { CountriesComponent } from './countries/countries.component';
import { RouterModule } from '@angular/router';
import { UniqueNewComponent } from "./unique-new/unique-new.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NewsComponent } from "./news/news.component";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UniqueNewComponent, NewsComponent,CountriesComponent],
  imports: [CommonModule, IonicModule,RouterModule,FormsModule,IonicModule,RouterModule],
  exports: [UniqueNewComponent, NewsComponent,CountriesComponent,FormsModule,IonicModule],
})
export class ComponentsModule {}
