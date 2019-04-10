
import { MapaPageModule } from './comun/mapa/mapa.module';
import { AdminService } from './services/db/admin.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AngularFireStorageModule } from '@angular/fire/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyCC22o8Imks6DbAf4DXrxgtW_wPE6XYLHs',
  authDomain: 'mav-db.firebaseapp.com',
  databaseURL: 'https://mav-db.firebaseio.com',
  storageBucket: 'mav-db.appspot.com',
  messagingSenderId: '69193804419'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    MapaPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    AdminService,
    SQLite,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
