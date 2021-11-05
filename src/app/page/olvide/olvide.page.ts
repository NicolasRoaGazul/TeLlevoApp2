import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
@Component({
  selector: 'app-olvide',
  templateUrl: './olvide.page.html',
  styleUrls: ['./olvide.page.scss'],
})
export class OlvidePage implements OnInit {
  name: any;
  formularioLogin: FormGroup;
  email: String;


  constructor(public fb: FormBuilder,public toastController: ToastController, private router: Router, private alertCtrl: AlertController,
    public navCtrl: NavController,public alertController: AlertController) {
      this.formularioLogin = this.fb.group({
        'email': new FormControl("",Validators.required),

      })
  }
  ngOnInit() {
  }

  async recuperar(){
    var f = this.formularioLogin.value;

    var usuario = JSON.parse(localStorage.getItem('usuario'));

    if(usuario.email == f.email){
      console.log('recuperar')
      localStorage.setItem('recuperar','true');
      const myAlert = await this.alertCtrl.create({
        header:'Correo enviado',
        message: 'Se le ha enviado un correo',
  
        buttons: [
          {
            text: 'Enviar denuevo',
            handler: () => {
              console.log('Enviar denuevo');
  
            }
          }, {
            text: 'Inicio',
            handler: (blah) => {
              this.router.navigate(['/inicio']);
            }
          }
        ]
      });
      myAlert.present();
    

    }else{
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste son incorrectos.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
    }
  }
  
}