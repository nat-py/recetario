import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { GuardarLocalService } from '../../services/guardarLocal.service';
import { Receta } from '../../interfaces/Receta';
import { BusquedaRecetasService } from '../../services/busquedaRecetas.service';
import { ObtenerRecetaService } from '../../services/obtenerReceta.service';
import { SliderService } from '../../services/slider.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {



  @ViewChild('bttl')
  public datoBuscar!: ElementRef<HTMLInputElement>;

  busTtl() {
    let datbus = this.datoBuscar.nativeElement.value;
    this.busFilt = true
    this.recetas = this.buscar.buscartt(datbus)
  }

  constructor(private router:Router, public acLocal: GuardarLocalService, public buscar: BusquedaRecetasService,
    public envView: ObtenerRecetaService, public acslid: SliderService){}

  public hayrecetas!: boolean
  public recetas!:  Receta[]
  public ultReceta!: Receta | null
  public busFilt: boolean = false
  public intervaloAuto!: any;


  iniciar(){
    this.hayrecetas = this.acLocal.estadoCantidad()
    this.recetas = this.acLocal.getData();
    this.ultReceta = this.acLocal.getLast()

  }

  ngOnInit(): void {
    this.iniciar()
    this.iniciarAutoDesplazamiento();
  }
  ngOnDestroy() {
    clearInterval(this.intervaloAuto);
  }

  navegar(titulo: string ){
    console.log(titulo);
    let datosRecet:Receta = this.buscar.obtUnaReceta(titulo)
    this.envView.saveReceta(datosRecet)
    this.router.navigate(['view']);
  }

  irCrear(){
    this.router.navigate(['new']);
  }



  /* -------------------------------------------------------------------- SLIDER  -------------------------------------------------------------------- */

  @ViewChildren('card')
  cards!: QueryList<ElementRef>;
  @ViewChild('fleiz')
  flechai!: ElementRef<HTMLLIElement>
  @ViewChild('flede')
  flechad!: ElementRef<HTMLLIElement>

  envio( accion: string){
    clearInterval(this.intervaloAuto);
    if (accion === 'siguiente'){
      this.acslid.sigcard(this.cards, this.flechai, this.flechad)
    }
    else if (accion === 'pasada'){
      this.acslid.pascard(this.cards, this.flechai, this.flechad)
    }




  }

  detenerDesplazamiento(){
    clearInterval(this.intervaloAuto);
  }

  iniciarAutoDesplazamiento() {
    this.intervaloAuto = setInterval(() => {
      this.acslid.sigcard(this.cards, this.flechai, this.flechad);
    }, 10000);
  }

}
