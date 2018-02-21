import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PushService } from './push.service';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PushService],
  bootstrap: [AppComponent]
})
export class AppModule { }
