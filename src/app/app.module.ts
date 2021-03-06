import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { ChartsModule } from 'ng2-charts'

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, DetailComponent],
  entryComponents: [DetailComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ChartsModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LocalNotifications,
    BackgroundMode
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
