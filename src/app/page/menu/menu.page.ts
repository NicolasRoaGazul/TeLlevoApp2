import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  indiceSeleccionado: number = 0;

  paginas = [
    {
      titulo: 'Inicio',
      url: '/menu/bienvenida',
      icono: 'home'
    },
    {
      titulo: 'Agregar viaje',
      url: '/menu/agregarviaje',
      icono: 'book'
    },
    {
      titulo: 'Mi Perfil',
      url: '/menu/pasajero',
      icono: 'person'
    }
  ]

  constructor(public alertController: AlertController,
    public navCtrl: NavController) { }
    ngOnInit() {
    }

  cambiarIndiceSeleccionado(i){
    this.indiceSeleccionado = i;
  }

  async salir(){
    const alert = await this.alertController.create({
      header: 'Salir',
      message: '¿Estas seguro que quieres salir?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            
          }
        }, {
          text: 'Si, estoy seguro',
          handler: () => {
            localStorage.removeItem('ingresado');
            this.navCtrl.navigateRoot('inicio');
          }
        }
      ]
    });

    await alert.present();
  }

}