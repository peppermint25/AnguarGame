import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyGameComponent } from './my-game/my-game.component';

@NgModule({
  declarations: [
    AppComponent,
    MyGameComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent, MyGameComponent],
})
export class AppModule { }
