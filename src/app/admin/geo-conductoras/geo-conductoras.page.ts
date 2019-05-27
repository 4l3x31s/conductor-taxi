import { MdlGeoLocalizacion } from './../../modelo/mdlGeoLocalizacion';
import { MdlConductora } from './../../modelo/mldConductora';
import { GeolocalizacionService } from './../../services/db/geolocalizacion.service';
import { AlertService } from './../../services/util/alert.service';
import { ToastService } from './../../services/util/toast.service';
import { NavController, ModalController, Platform } from '@ionic/angular';
import { NavParamService } from './../../services/nav-param.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SesionService } from 'src/app/services/sesion.service';

declare var google;

@Component({
  selector: 'app-geo-conductoras',
  templateUrl: './geo-conductoras.page.html',
  styleUrls: ['./geo-conductoras.page.scss'],
})
export class GeoConductorasPage implements OnInit, OnDestroy {
  
  @ViewChild('mapge') mapElement: ElementRef;
  map: any;
  markers = [];
  watchID: any;
  listaGeoPosicionamiento: MdlGeoLocalizacion[] = [];
  constructor(public navCtrl: NavController,
    public geolocation: Geolocation,
    public geolocalizacionService: GeolocalizacionService) {}
  ngOnInit() {
    this.initMap();
    this.geolocalizacionService.listarCambios().subscribe( data => {
      console.log(data);
      this.listaGeoPosicionamiento = Object.assign(data);
      for (let geoObj of this.listaGeoPosicionamiento) {
        let image = 'assets/image/blue-bike.png';
          let updatelocation = new google.maps.LatLng(geoObj.latitude, geoObj.longitude);
          this.addMarker(updatelocation,image);
          this.setMapOnAll(this.map);
      }
    });
  }

  initMap() {
      navigator.geolocation.getCurrentPosition((resp) => {
        let mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          zoom: 15,
          center: mylocation,
          mapTypeControl: false,
          streetViewControl: false,
          fullScreenControl: false,
          zoomControl: false,
          scaleControl: false,
          rotateControl: false,
          fullscreenControl: false
        });
      }, (error) => {
        console.log("error current position")
        console.log(error);
      }, { enableHighAccuracy: true });

      //navigator.geolocation.clearWatch(watchID);
      /*this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
        let mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          zoom: 15,
          center: mylocation,
          mapTypeControl: false,
          streetViewControl: false,
          fullScreenControl: false,
          zoomControl: false,
          scaleControl: false,
          rotateControl: false,
          fullscreenControl: false
        });
      }, err => {
        console.log(err);
      });*/

        this.watchID = navigator.geolocation.watchPosition((data) => {
        this.deleteMarkers();
        let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
        let image = 'assets/image/blue-bike.png';
        this.addMarker(updatelocation,image);
        this.setMapOnAll(this.map);
      }, error => {
        console.log(error);
      });
      /*let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        this.deleteMarkers();
        let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
        let image = 'assets/image/blue-bike.png';
        this.addMarker(updatelocation,image);
        this.setMapOnAll(this.map);
      }, err => {
        console.log(err);
      });*/
  }
  addMarker(location, image) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: image
    });
    this.markers.push(marker);
  }
  setMapOnAll(map) {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  clearMarkers() {
    this.setMapOnAll(null);
  }
  deleteMarkers() {
    this.clearMarkers();
  }
  updateGeolocation(geoposicionamineto: MdlGeoLocalizacion) {
    this.geolocalizacionService.crearGeolocalizacion(geoposicionamineto);
  }
  ngOnDestroy(): void {
    navigator.geolocation.clearWatch(this.watchID);
  }
}
