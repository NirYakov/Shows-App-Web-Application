import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { ShowsGameHighlowComponent } from "./shows-game/shows-game-highlow/shows-game-highlow.component";
import { SingleShowComponent } from "./cards/single-show/single-show.component";

const routes: Routes = [
  { path: "", component: ShowsGameHighlowComponent },
  { path: "single", component: SingleShowComponent },

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
