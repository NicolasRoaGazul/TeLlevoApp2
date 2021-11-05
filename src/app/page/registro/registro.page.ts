import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  EmailValidator
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  name: any;
  formularioRegistro: FormGroup;
  
  constructor(public fb: FormBuilder,
    public alertController: AlertController,private router: Router,public navCtrl: NavController) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'email': new FormControl("", Validators.required),
      'confirmacionPassword': new FormControl("", Validators.required)

    });
  }

  ngOnInit() {
  }
  
  async guardar(){
    var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
        
      });
  
      await alert.present();
      return;
    }

    var usuario = {
      nombre: f.nombre,
      password: f.password,
      email: f.email
    }

    localStorage.setItem('usuario',JSON.stringify(usuario));
    localStorage.setItem('ingresado','true');
    this.navCtrl.navigateRoot('menu/bienvenida');
  }

}