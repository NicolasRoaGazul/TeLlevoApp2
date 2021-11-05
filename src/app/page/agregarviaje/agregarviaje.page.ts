import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MapOperator } from 'rxjs/internal/operators/map';
import { ServicioService } from 'src/app/services/servicio.service';
import { MapboxServiceService, Feature } from 'src/app/services/mapbox-service.service';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

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

  user:any;
  users:any;
  posts:any;
  post:any={
    id:null,
    title:"",
    body:"",
    userId:null,
  };
  compareWith:any;
  

  map = null;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  // duoc -33.033688056595366, -71.53318359616668
  origin = { lat: -33.033688056595366, lng: -71.53318359616668};
  // hospital -33.029013567694825, -71.53903872506535
  // Mall marina -33.008778278312136, -71.54823003739084
  destination = { lat: -33.008778278312136, lng:-71.54823003739084 };

  /*
  markers: Marker[] = [
    {
      position: {
        lat: 4.658383846282959,
        lng: -74.09394073486328,
      },
      title: 'Parque Simón Bolivar'
    },
    {
      position: {
        lat: 4.667945861816406,
        lng: -74.09964752197266,
      },
      title: 'Jardín Botánico'
    },
    {
      position: {
        lat: 4.676802158355713,
        lng: -74.04825592041016,
      },
      title: 'Parque la 93'
    },
    {
      position: {
        lat: -33.033864573889836 ,
        lng: -71.53320556010551,
      },
      title: 'Duoc'
    },

    //this.addMarker(marker);
  ];
  */
  constructor(public geolocation: Geolocation,private mapboxService: MapboxServiceService,private api: ServicioService, public toastController:ToastController){}

  ngAfterViewInit() {
    this.geolocationNative();
  }

  geolocationNative() {
    this.geolocation.getCurrentPosition().then((geposition: Geoposition) =>{
      console.log(this.geolocation);
    })
  }


  ionViewWillEnter(){
    this.getUsuarios();
    this.getPosts();
  

    
  }
  getPosts() {
    this.api.getPosts().subscribe((data) =>{
      this.posts=data;
      this.posts.reverse();
    });
  }
  getUsuarios() {
    this.api.getUsuarios().subscribe((data)=>{
      this.users=data;
    })
  }
  guardarPost(){
    if (this.post.userId==null) {
      if (this.user==undefined) {
        this.presentToast("Debe seleccionar un conductor")
        return;
      }
      this.post.userId=this.user.id;
      this.api.createPost(this.post).subscribe(
        ()=>{
          this.presentToast("Viaje creado con éxito");
          this.getPosts();
        },
        error=>{
          this.presentToast("Error - "+error)
        }
      );
    } else{
      this.api.updatePost(this.post.id, this.post).subscribe(
        ()=>{
          this.presentToast("Viaje actualizado con éxito");
          this.getPosts();
        },
        error=>{
          this.presentToast("Error - "+error)
        }
      )

    }
  }

  setPost(post){
    this.post=post;
    this.getUsuario(post.userId);
    this.compareWith=this.compareWithFn;
  }
  getUsuario(userId: any) {
    this.api.getUsuario(userId).subscribe((data)=>{
      this.user=data;
    })
  }

  eliminarPost(post){
    this.api.deletePost(post.id).subscribe(
      success=>{
        this.presentToast("Viaje eliminado con éxito")
        this.getPosts();
      },
      error=>{
        this.presentToast("Error - "+error)
      }
    )
  }

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  async presentToast(msg:string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  


  ngOnInit() {
    this.loadMap();
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
/*
  renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
    });
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }
*/

}
