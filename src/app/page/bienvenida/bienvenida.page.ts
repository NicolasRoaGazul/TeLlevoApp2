import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {
  name: string;
  usuario: string;

  constructor(private activeRoute: ActivatedRoute, private router: Router) { 
    this.activeRoute.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation().extras.state){
        this.name=this.router.getCurrentNavigation().extras.state.name;
        console.log(this.name)
      }
    });
  }

  ngOnInit() {
    this.usuario=JSON.parse(localStorage.getItem('usuario'));
  }
  perfil(){
    let navigationextras: NavigationExtras={

    }
    this.router.navigate(['menu/perfil'], navigationextras)
  }
  pasa(){
    let navigationextras: NavigationExtras={

    }
    this.router.navigate(['menu/agregarviaje'], navigationextras)
  }
  

}


