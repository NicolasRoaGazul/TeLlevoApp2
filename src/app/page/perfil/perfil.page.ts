import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/services/servicio.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  viaje: string;


  constructor(private api: ServicioService,private activeRoute: ActivatedRoute,private router:Router) { 

  }
  ionViewWillEnter(){

    
  }

  segmentChanged(event){
    console.log(event);
    let direccion=event.detail.value
    this.router.navigate(['perfil/'+direccion])
  }
  ngOnInit() {
    this.viaje=JSON.parse(localStorage.getItem('viaje'));
    
  }

}
