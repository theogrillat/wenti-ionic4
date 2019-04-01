import {
  MenuController,
  ToastController,
  Platform,
  LoadingController
} from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { generate } from 'rxjs';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutPage implements OnInit {
  map: GoogleMap;
  loading: any;
  name = 'Localisation';
  latitude = 0;
  longitude = 0;
  accur = 0;
  coords;
  addr;
  gotCoords = false;

  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(
    private nativeGeocoder: NativeGeocoder,
    private geolocation: Geolocation,
    private iab: InAppBrowser,
    public menu: MenuController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private platform: Platform
  ) { }


  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }


  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      styles: [
        {
          "stylers": [
            {
              "color": "#f1f9f8"
            }
          ]
        },
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f1f9f8"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffa745"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "lightness": 25
            },
            {
              "weight": 1
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "stylers": [
            {
              "color": "#f1f9f8"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
            {
              "lightness": 70
            },
            {
              "weight": 0.5
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ],
      camera: {
        target: {
          lat: 46.603354,
          lng: 1.8883335
        },
        zoom: 5.5,
        tilt: 0
      }
    });

  }

  async onButtonClick() {
    this.map.clear();

    this.loading = await this.loadingCtrl.create({
    });
    await this.loading.present();

    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => {
      this.loading.dismiss();
      console.log(JSON.stringify(location, null ,2));

      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 15,
        tilt: 0,
        duration: 1000,
      });

      // add a marker
      let marker: Marker = this.map.addMarkerSync({
        title: 'Vous êtes ici !',
        position: location.latLng,
        animation: GoogleMapsAnimation.BOUNCE
      });

      // show the infoWindow
      marker.showInfoWindow();

      // If clicked it, display the alert
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        this.showToast('clicked!');
      });
    })
    .catch(err => {
      this.loading.dismiss();
      this.showToast(err.error_message);
    });
  }

  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'middle'
    });

    toast.present();
  }












  click() {
    this.getCoords();
    // this.getAdress();
  }

  openMenu() {
    this.menu.open();
  }

  getCoords() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.coords = resp.coords;
      this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.coords.address = result[0];
        console.log(this.coords.address);
        this.gotCoords = true;
      })
      .catch((error: any) => {
        alert('Error getting location' + JSON.stringify(error));
      });
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}
