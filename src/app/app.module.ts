import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SecurityComponent } from './security/security.component';
import {FormsModule} from "@angular/forms";
import {AppRequestService} from "./services/app-request.service";
import {HttpClientModule} from "@angular/common/http";
import { HistoriesComponent } from './histories/histories.component';
import { SumdataComponent } from './sumdata/sumdata.component';

@NgModule({
  declarations: [
    AppComponent,
    SecurityComponent,
    HistoriesComponent,
    SumdataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AppRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
