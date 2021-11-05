import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/services/servicio.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  name: any;
  usuario: string;
  user:any;
  users:any;
  posts:any;
  post:any={
    id:null,
    title:"",
    body:"",
    userId:null,
  };
  constructor(private api: ServicioService,private activeRoute: ActivatedRoute,private router:Router) { 

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
  segmentChanged(event){
    console.log(event);
    let direccion=event.detail.value
    this.router.navigate(['perfil/'+direccion])
  }
  ngOnInit() {
    this.usuario=JSON.parse(localStorage.getItem('usuario'));
  }

}
