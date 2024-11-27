import { ElementRef, Injectable, QueryList } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  constructor() { }

  desplazamiento = 0;
  desplazamientoPaso = 325;

  sigcard(cards: QueryList<ElementRef>, flechaI: ElementRef<HTMLLIElement>, flechaD: ElementRef<HTMLLIElement> ) {
    const limiteMaximo = (cards.length - 1) * this.desplazamientoPaso -650
    this.desplazamiento -= this.desplazamientoPaso;

    if (Math.abs(this.desplazamiento) > limiteMaximo) {
      this.desplazamiento = 0;
      flechaI.nativeElement.style.display= 'flex';
      flechaD.nativeElement.style.display= 'flex';
    }else if(Math.abs(this.desplazamiento) == limiteMaximo){
      console.log('esta en el ultimo');
      flechaI.nativeElement.style.display= 'none'
    }else{
      flechaI.nativeElement.style.display= 'flex';
      flechaD.nativeElement.style.display= 'flex';
    }

    this.aplicarDesplazamiento(cards);
  }

  pascard(cards: QueryList<ElementRef>,flechaI: ElementRef<HTMLLIElement>, flechaD: ElementRef<HTMLLIElement>) {
    const limiteMaximo = (cards.length - 1) * this.desplazamientoPaso;
    this.desplazamiento += this.desplazamientoPaso;
    flechaI.nativeElement.style.display= 'flex';
    if (this.desplazamiento > 0) {
      this.desplazamiento = -limiteMaximo;
    }
    if (this.desplazamiento == 0) {
      flechaD.nativeElement.style.display= 'none'
      flechaI.nativeElement.style.display= 'flex';
    }


    this.aplicarDesplazamiento(cards);
  }

  private aplicarDesplazamiento(cards: QueryList<ElementRef>) {
    cards.forEach((card) => {
      card.nativeElement.style.transform = `translateX(${this.desplazamiento}px)`;
    });
  }
}
