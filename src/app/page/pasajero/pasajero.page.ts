import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/services/servicio.service';
@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit {
  usuario: string;
  name: any;
  posts:any;
  post:any={};
  constructor(private activeRoute: ActivatedRoute,private router:Router) { 
    this.activeRoute.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation().extras.state){
        this.name=this.router.getCurrentNavigation().extras.state.name;
        console.log(this.name)
      }
    });
    this.router.navigate(['pasajero/uno']) 
  }
  segmentChanged(event){
    console.log(event);
    let direccion=event.detail.value
    this.router.navigate(['pasajero/'+direccion])
  }
  ngOnInit() {
    this.usuario=JSON.parse(localStorage.getItem('usuario'));
  }

}