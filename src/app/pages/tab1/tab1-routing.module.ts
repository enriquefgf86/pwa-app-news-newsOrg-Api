import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Tab1Page } from "./tab1.page";

const routes: Routes = [
  {
    path: "",
    component: Tab1Page,
    children: [
      {
        path: "selected/:id",
        loadChildren: () =>
          import("../selectednew/selectednew.module").then(
            (m) => m.SelectednewPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1PageRoutingModule {}
