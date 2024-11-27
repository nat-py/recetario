import { Injectable } from '@angular/core';
import { Receta } from '../interfaces/Receta';

@Injectable({
  providedIn: 'root'
})
export class GuardarLocalService {

  public saveInLocal(datos: object){
    //localStorage.clear()
    let id;
    let idj: string;

    if (localStorage.getItem('identificador') != null){
      let idj  = localStorage.getItem('identificador');
      id = parseInt(idj!);
      id += 1;
    }else{
      id = '1';
      localStorage.setItem('identificador', id);
    }
    id = id.toString()
    localStorage.setItem(id, JSON.stringify(datos))
    localStorage.setItem('identificador', id)
  }

  public estadoCantidad(){
    if (localStorage.getItem('identificador') != null){
      return true
    }
    return false
  }

  public getData(): Receta[] {
    let recetas: Receta[] = [];
    let id  = localStorage.getItem('identificador');
    for (let key in localStorage) {
      if (key !== 'identificador' && key != id) {
        const item = localStorage.getItem(key);
        if (item !== null) {
          recetas.push(JSON.parse(item));
        }
      }
    }
    return recetas;
  }
  public getTodas(): Receta[] {
    let recetas: Receta[] = [];
    let id  = localStorage.getItem('identificador');
    for (let key in localStorage) {
      if (key !== 'identificador') {
        const item = localStorage.getItem(key);
        if (item !== null) {
          recetas.push(JSON.parse(item));
        }
      }
    }
    return recetas;
  }


  public getLast(): Receta | null {
    let id  = localStorage.getItem('identificador');
    let receta = localStorage.getItem(id!);

    if (receta) {
      return JSON.parse(receta) as Receta; // Convertir el JSON parseado en un objeto Receta
    }
    return null;
  }



  constructor() { }

}
