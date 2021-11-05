import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  nombre:String;
  constructor(private menuCtrl: MenuController, public toastController: ToastController, private router: Router) {}

  ngOnInit(){}
  toggleMenu(){
    this.menuCtrl.toggle();
  }

  registro(){
    let navigationextras: NavigationExtras={

    }
    this.router.navigate(['/registro'], navigationextras)
  }

  
    
  inicio(){
    let navigationextras: NavigationExtras={
      state:{ dato: this.nombre}
    }
    this.router.navigate(['/inicio'], navigationextras)
  }

  }
    
