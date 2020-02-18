import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Usuarios } from '../../modelos/usuarios';
import { ApiService } from '../../servicios/api.service';

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.page.html',
  styleUrls: ['./info-usuario.page.scss'],
})
export class InfoUsuarioPage implements OnInit {

  private data : Usuarios;

  private activo : Boolean;

  id =null;
  user =null;
  type =null;

  constructor(private apiService : ApiService,private activeRoute: ActivatedRoute) { this.data = new Usuarios(); }

  ngOnInit() {
    this.id=this.activeRoute.snapshot.paramMap.get('id');
    this.user=this.activeRoute.snapshot.paramMap.get('user');
    this.type=this.activeRoute.snapshot.paramMap.get('type');
    console.log(this.id,this.user,this.type);
    try{
      this.getData();
    }catch(Item){}
  }

  getData(){
    //Cargar de la API la informacion de un usuario en particular
    //this.popUpMensaje('Cargando Usuario: '+this.codigoEmpleado);
    this.apiService.getItem(this.id as Number).subscribe( response => {
        this.data = response;
        if(response.active == 0)
          this.activo = false
        else
          this.activo = true
    });
  }

}
