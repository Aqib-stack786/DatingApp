import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
  // ordering of route is very important read routes in order they are porvided
  {path: '', component: HomeComponent},
  {
    path: '', // localhost:4200/''+'members' = localhost:4200/members
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent},
      {path: 'messages', component: MessagesComponent},
      {path: 'lists', component: ListsComponent},
    ]
  },

  // when no route found redirect to home// if this line is on top redirect to home always
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
