import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario:UsuarioModel;

  constructor( private auth: AuthService, private router:Router ) { }

  ngOnInit() { 

  //this.pruebaUsuario();
  this.usuario = new UsuarioModel();
  

  }

  onSubmit( form:NgForm ){

  if( form.invalid ){ return; }

  Swal.fire({
    allowOutsideClick: false,
    text: 'Espere por favor',
    icon: 'info',
  });
  Swal.showLoading();

  this.auth.nuevoUsuario(this.usuario)
  .subscribe( data => {
    console.log(data);
    Swal.close();
    this.router.navigateByUrl('/home');
  },(err)=>{
    console.log(err.error.error.message);
    Swal.fire({
      text: err.error.error.message,
      icon: 'error',
    });
  });
  }
    
  }

