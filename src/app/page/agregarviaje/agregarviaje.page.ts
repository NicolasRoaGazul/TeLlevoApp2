import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { MapOperator } from 'rxjs/internal/operators/map';
import { ServicioService } from 'src/app/services/servicio.service';
import { MapboxServiceService, Feature } from 'src/app/services/mapbox-service.service';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import {   FormGroup,
  FormControl,
  Validators,
  FormBuilder } from '@angular/forms';



declare var google;
interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}
@Component({
  selector: 'app-agregarviaje',
  templateUrl: './agregarviaje.page.html',
  styleUrls: ['./agregarviaje.page.scss'],
})
export class AgregarviajePage implements OnInit {
  formularioViaje: FormGroup;
  viaje: string;
  toLowCase: null;


  
  //npm install ionic-angular@latest --save (actualizar angular)
  map = null;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  // duoc -33.033688056595366, -71.53318359616668
  origin = { lat: -33.033688056595366, lng: -71.53318359616668};
  // hospital -33.029013567694825, -71.53903872506535
  // Mall marina -33.008778278312136, -71.54823003739084
  destination = { lat: -33.008778278312136, lng:-71.54823003739084 };



  constructor(private mapboxService:MapboxServiceService, public alertController: AlertController,public navCtrl: NavController,
    public fb: FormBuilder,private router: Router,public geolocation: Geolocation,
    private api: ServicioService, 
    public toastController:ToastController){

    this.formularioViaje = this.fb.group({
      'voy': new FormControl("",Validators.required),
      'precio': new FormControl("",Validators.required)
    })

  }


  addresses: string[] = [];
  selectedAddress = null;

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapboxService
        .search_word(searchTerm)
        .subscribe((features: Feature[]) => {
          this.addresses = features.map(feat => feat.place_name);
        });
      } else {
        this.addresses = [];
      }
  }

  onSelect(address: string) {
    this.selectedAddress = address;
    this.addresses = [];
  }



  ngAfterViewInit() {
    this.geolocationNative();
  }

  geolocationNative() {
    this.geolocation.getCurrentPosition().then((geposition: Geoposition) =>{
      console.log(this.geolocation);
    })
  }




  ngOnInit() {
    this.viaje=JSON.parse(localStorage.getItem('viaje'));
    this.loadMap();
  }
  async guardarPost(){
    var f = this.formularioViaje.value;
    var viaje = {
      voy: f.voy,
      precio: f.precio,

    }

    if(!f.voy){
      this.presentToast('Debe indicar a que lugar va');
      return;
      
    }
    if(!f.precio){
      this.presentToast('Debe poner un precio para su viaje');
      return;
    }
    if(f.precio >2000){
      this.presentToast('Tu tarifa de viaje NO debe ser mayor a 2000 pesos');
      return;
    }
    else{
      
      this.presentToast('Su viaje ha sido creado con éxito')
      

    }
    

    localStorage.setItem('viaje',JSON.stringify(viaje));
    localStorage.setItem('direcciones','true');

  }
  async presentToast(msg:string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  loadMap() {

    const mapEle: HTMLElement = document.getElementById('map');

    //const myLatLng = {lat: -33.033864573889836, lng: -71.53320556010551}; 

    this.map = new google.maps.Map(mapEle, {
      center: this.origin,
      zoom: 12
    });


    this.directionsDisplay.setMap(this.map);

  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {

      mapEle.classList.add('show-map');
      //this.renderMarkers();
      this.calculateRoute();

    });
  }
//calculo de ruta
  private calculateRoute() {
    this.directionsService.route({
      origin: this.origin,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Hubo un error inesperado: ' + status);
      }
    });
  }


}
