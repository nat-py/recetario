import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ObtenerRecetaService } from '../../services/obtenerReceta.service';
import { Receta } from '../../interfaces/Receta';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {

  public receta!:  Receta

  constructor(private router:Router, private envView: ObtenerRecetaService ){}

  ngOnInit(): void {
    this.envView.recetaSend.subscribe(receta =>{
      this.receta = receta
    })
  }
  
  ingredientesMarcados: boolean[] = [];

  marcarIngrediente(index: number): void {
    // Inicializa el array si está vacío
    if (this.ingredientesMarcados[index] === undefined) {
      this.ingredientesMarcados[index] = false;
    }
    this.ingredientesMarcados[index] = !this.ingredientesMarcados[index];
  }



  irCrear(){
    this.router.navigate(['new']);
  }

}
