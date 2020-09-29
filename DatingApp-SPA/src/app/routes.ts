import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnSavedChanges } from './_guards/prevent-unsaved-chages.guard';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';

export const appRoutes: Routes = [
  // ordering of route is very important read routes in order they are porvided
  {path: '', component: HomeComponent},
  {
    path: '', // localhost:4200/''+'members' = localhost:4200/members
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      // add route here and if using resolver then include resolver with route
      // add resolver here
      {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
      {path: 'members/:id', component: MemberDetailComponent,
          resolve: {user: MemberDetailResolver}},
      {path: 'member/edit', component: MemberEditComponent,
          resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnSavedChanges]},
      {path: 'messages', component: MessagesComponent},
      {path: 'lists', component: ListsComponent},
    ]
  },

  // when no route found redirect to home// if this line is on top redirect to home always
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
