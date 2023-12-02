import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { EditComponent } from './pages/edit/edit.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, EditComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
