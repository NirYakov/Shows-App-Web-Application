import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { ShowsGameHighlowComponent } from "./shows-game/shows-game-highlow/shows-game-highlow.component";
import { SingleShowComponent } from "./cards/single-show/single-show.component";
import { ClipCreateComponent } from "./all-shows/clip-create/clip-create.component";
import { ShowsListComponent } from "./all-shows/shows-list/shows-list.component";
import { SingleShowViewComponent } from "./all-shows/single-show-view/single-show-view.component";
import { ShowCardComponent } from "./all-shows/show-card/show-card.component";
import { CardShowComponent } from "./cards/cardShow/cardShow.component";
import { ClipCardComponent } from "./all-shows/clip-card/clip-card.component";
import { FriendsListComponent } from "./friends/friends-list/friends-list.component";
import { FriendsSearchComponent } from "./friends/friends-search/friends-search.component";
import { FriendsShowsListComponent } from "./friends/friends-shows-list/friends-shows-list.component";
import { SingleShowViewUserComponent } from "./all-shows/single-show-view-user/single-show-view-user.component";
import { SingleShowViewFriendComponent } from "./all-shows/single-show-view-friend/single-show-view-friend.component";
import { InfoPageComponent } from "./info-page/info-page.component";
import { ChangePasswordComponent } from "./auth/change-password/change-password.component";
import { SettingsComponent } from "./settings/settings.component";

const routes: Routes = [

  // { path: "", component: ShowsListComponent },

  { path: "", component: InfoPageComponent },

  { path: "game", component: ShowsGameHighlowComponent },
  { path: "single", component: SingleShowComponent },
  { path: "testtcomnponent", component: CardShowComponent },
  { path: "testtcomnponent22", component: ClipCardComponent },
  { path: "testtcomnponent44", component: SingleShowViewComponent },


  // { path: "changepassword", component: ChangePasswordComponent, canActivate: [AuthGuard] }, // remove the gruard for my testing
  { path: "changepassword", component: ChangePasswordComponent }, // remove the gruard for my testing

  { path: "settings", component: SettingsComponent }, // remove the gruard for my testing


  { path: "myshows", component: ShowsListComponent, canActivate: [AuthGuard] }, // gurd

  { path: "myshows/:apiShowId", component: SingleShowViewUserComponent },

  { path: "friend/show/:apiShowId", component: SingleShowViewFriendComponent },

  { path: "myfriends", component: FriendsListComponent, canActivate: [AuthGuard] }, // gurd

  { path: "friend/:friendUsername", component: FriendsShowsListComponent, canActivate: [AuthGuard] }, // gurd

  { path: "searchfriend", component: FriendsSearchComponent, canActivate: [AuthGuard] }, // gurd

  { path: "addnewshow", component: ClipCreateComponent, canActivate: [AuthGuard] }, // gurd

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
