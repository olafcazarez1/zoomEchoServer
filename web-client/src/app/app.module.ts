import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { Logger } from './shared/log.service';
import { EchoService } from './echo-service.service';

import { ZoomComponent } from './zoom/zoom.component';


@NgModule({
  declarations: [
    AppComponent,
    ZoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [Logger],
  bootstrap: [AppComponent]
})
export class AppModule { }
