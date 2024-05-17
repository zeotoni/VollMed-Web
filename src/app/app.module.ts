import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditComponent } from './pages/edit/edit.component';
import { HomeComponent } from './pages/home/home.component';
import { FilterByName } from './pages/listing/filter-by-name.pipe';
import { ListingComponent } from './pages/listing/listing.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditComponent,
    SignUpComponent,
    ListingComponent,
    FilterByName,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
