import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VoteComponent } from './vote/vote.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Md5 } from 'ts-md5';
import { UserService } from './services/user.service';
import { HeaderComponent } from './header/header.component';
import { VotesRowComponent } from './votes-row/votes-row.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    VoteComponent,
    HeaderComponent,
    VotesRowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [UserService, Md5],
  bootstrap: [AppComponent]
})
export class AppModule { }
