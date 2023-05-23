import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { ShowsGameHighlowComponent } from "./shows-game/shows-game-highlow/shows-game-highlow.component";
import { SingleShowComponent } from "./cards/single-show/single-show.component";
import { ClipCreateComponent } from "./all-shows/clip-create/clip-create.component";
import { ShowsListComponent } from "./all-shows/shows-list/shows-list.component";

const routes: Routes = [

  // { path: "", component: ShowsListComponent },

  { path: "", component: ShowsGameHighlowComponent },

  { path: "game", component: ShowsGameHighlowComponent },
  { path: "single", component: SingleShowComponent },

  { path: "myshows", component: ShowsListComponent }, // gurd


  { path: "addnewshow", component: ClipCreateComponent }, // gurd

  { path: "auth", loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  // { path: '404', },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
