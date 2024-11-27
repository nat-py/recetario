import { Injectable } from '@angular/core';
import { Receta } from '../interfaces/Receta';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObtenerRecetaService {

  private receta!: Receta
  private obtReceta: BehaviorSubject<Receta> = new BehaviorSubject<Receta>({
    imagen: '',
    nombre: '',
    tiempo: '',
    porciones: '',
    dificultad: '',
    ingredientes: [],
    descripcion: ''
  });

  constructor() { }

  get recetaSend(){
    return this.obtReceta.asObservable();
  }

  public saveReceta(recetag: Receta){
    this.receta = recetag;
    this.obtReceta.next(recetag);
  }

}
