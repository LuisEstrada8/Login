import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

usuario: UsuarioModel = new UsuarioModel;
recordarme= false;

  constructor( private auth:AuthService, private router:Router ) { }

  ngOnInit() {

    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('item');
      this.recordarme = true;
    }

  }

  login( form: NgForm ){

    if(form.invalid) {return; }
      
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor',
      icon: 'info',
    });
    Swal.showLoading();

      this.auth.login(this.usuario)
      .subscribe( data => {

        console.log(data);
        Swal.close();

        if(this.recordarme){
          localStorage.setItem('email',this.usuario.email)
        }

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


