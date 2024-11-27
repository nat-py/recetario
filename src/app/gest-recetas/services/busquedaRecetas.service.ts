import { Injectable, OnInit } from '@angular/core';
import { Receta } from '../interfaces/Receta';
import { GuardarLocalService } from './guardarLocal.service';

@Injectable({
  providedIn: 'root'
})
export class BusquedaRecetasService {

  constructor(private obtRec: GuardarLocalService) { }

  private recetas!:  Receta[]

  private ttldis(){
    let receta: Receta
    let ttlLista: string[] = []
    let id  = localStorage.getItem('identificador');
    for (let key in localStorage) {
      if (key !== 'identificador' && key != id) {
        const item = localStorage.getItem(key);
        if (item !== null) {
          receta = (JSON.parse(item))
          ttlLista.push(receta.nombre)
        }
      }
    }
    return ttlLista
  }

  public obtUnaReceta(ttlReceta: string){
    this.recetas = this.obtRec.getTodas()
    let recetaF!:Receta
    for (let receta of this.recetas){
      if (receta.nombre == ttlReceta){
        recetaF = receta

      }
    }
    return recetaF
  }

  public buscartt(datbus: string){
    const recFiltradas: Receta[] = []
    const ttLis: string[] = this.ttldis()
    const ttlFil: string[] = []

    for (let ttl of ttLis){
      if (ttl.includes(datbus)){
        ttlFil.push(ttl)
      }
    }
    this.recetas = this.obtRec.getData()
    for(let receta of this.recetas){
      if (ttlFil.includes(receta.nombre)){
        recFiltradas.push(receta)
      }
    }
    return recFiltradas
  }



}
