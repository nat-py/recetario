import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GuardarLocalService } from '../../services/guardarLocal.service';
import { ParseIMG64Service } from '../../services/parseIMG64.service';
import { Editor } from 'primeng/editor';
import { ModalComponent } from '../../components/modal/modal.component';
import { Confirmation, ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';



@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})

export class NewComponent implements OnInit {


  /* ------------------------------ DECLARACIOBES E INICIALIZACIONES JUNTO A EL ONINIT ------------------------------ */

  nReceta!: FormGroup;
  ttl!: AbstractControl;
  time!: FormArray;
  por!: AbstractControl;
  ingrediente!: FormArray;
  des!: AbstractControl;

  imagen!: any;
  file!: any;

  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'color': [] }],
    ],
  };

  constructor(private formBuilder: FormBuilder,
              private acLocal: GuardarLocalService,
              private gesImg: ParseIMG64Service,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private router:Router) {}

  inic(){
    this.nReceta = this.formBuilder.group({
      img: ['' ],
      ttl: ['', [Validators.required, Validators.minLength(5)]],
      por: ['', [Validators.required, Validators.min(1), Validators.max(999)]],
      horaI: ['', Validators.required],
      horaF: ['', Validators.required],
      ingrediente: this.formBuilder.array([]),
      des: ['', [Validators.required, Validators.minLength(5)]],
    });
  }


  Variables(){
    this.ttl = this.nReceta.controls['ttl'];
    this.des = this.nReceta.controls['des'];
    this.por = this.nReceta.controls['por'];
    this.imagen = document.getElementById('formFile')
    this.ingrediente = this.ingrediente;


  }


  ngOnInit(): void {
    this.inic();
    this.Variables();
  }




  backgroundImageUrl = ''
  simg = false;

  async hola(){
    if (this.imagen.value != ''){

      const file = this.imagen.files[0];
      let imgbg = await this.gesImg.genImg64(file);
      this.backgroundImageUrl = `url(${imgbg}) center/cover no-repeat`;
      this.nReceta.controls['img'].disable();
      return this.simg = true;
    }
    this.backgroundImageUrl = ''
    return this.simg = false;
  }

  sevaimg(){
    this.backgroundImageUrl = ''
    this.nReceta.controls['img'].enable();
    return this.simg = false;
  }

  s1 = false;
  s2 = false;
  s3 = false;
  dific = '';

  setdif(item: number = 0){
    if (item == 1) {
      this.s1 = true;
      this.s2 = false;
      this.s3 = false;
      this.dific = 'Fácil';
      return this.s1;
    }else if (item == 2){
      this.s1 = false;
      this.s2 = true;
      this.s3 = false;
      this.dific = 'Medio';
      return this.s2;
    }else if (item == 3){
      this.s1 = false;
      this.s2 = false;
      this.s3 = true;
      this.dific = 'Avanzado';
      return this.s3;
    }
    this.s1 = false;
    this.s2 = false;
    this.s3 = false;
    return false
  }

  @ViewChild('editorRef') editorComponent!: Editor;

  ngAfterViewInit() {
    const quillInstance = this.editorComponent.quill;

    if (quillInstance) {
      quillInstance.on('text-change', () => {
        this.largoLetras();
      });
    }
  }


  public largoPreparacion: number = 0
  largoLetras() {
    const text = this.editorComponent.quill.getLength() - 1;
    this.largoPreparacion = text
  }

  public cantidadPreparacion: number = 0
  contarPalabras() {
    let text = this.editorComponent.quill.getText();
    if (text == '\n'){
    this.cantidadPreparacion = 0;
    }else{
      text = text.replace(/\r?\n/g, " ");
      text = text.replace(/\s+/g, " ").trim();
      let palabras = text.split(" ");
      this.cantidadPreparacion = palabras.length ;
    }
  }




/* --------------------------------------------------------------------------------------------------------- */

  public newingrediente: FormControl = new FormControl('', Validators.required );

  agrNuevo():void {
    if ( this.newingrediente.invalid ) return;
    const newing = this.newingrediente.value;
    this.ingredientes.push(
      this.formBuilder.control( newing, Validators.required )
    );
    this.newingrediente.reset();
  }

  get ingredientes() {
    return this.nReceta.get('ingrediente') as FormArray;
  }

  eliIgre( index:number ):void {
    this.ingredientes.removeAt(index);
  }

/* --------------------------------------------------------------------------------------------------------- */

  vacio() {
    let ingredientes = this.ingredientes.value;
    if (ingredientes.length == 0 && this.newingrediente.touched ) {
      return true;
    }else if (ingredientes.length == 1){
      return true;
    }
    return false;
  }

  valido(campo: string ){
    return this.nReceta.controls[campo].errors && this.nReceta.controls[campo].touched;
  }

  valDesc = false
  validDescr(){
    const text = this.editorComponent.quill.getLength() - 1 ;
    if (text == 0){
      this.valDesc = true
    }
    else{

      this.valDesc = false
    }
  }

  saberError(campo: string) {
    if (campo == 'ingredientes'){
      return 'Deben haber minimo 2 ingredientes igresados';
    }
    if (campo === 'des' && this.largoPreparacion < 15 && this.largoPreparacion > 0){
      return 'Deben haber minimo 15 caracteres';
    }

    const errors = this.nReceta.controls[campo].errors || {};
    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
        case 'min':
          return 'El valor minimo es 1 ';
        case 'max':
          return 'El valor máximo es 999';
      }
    }
    return
  }

  valor = '';

  validarEspacio (campo: string):void{
    let camppo = this.nReceta.controls[campo];
    let campoval;
    if (campoval != null){
      campoval = camppo.value.trimStart();
    }

    if (campoval == ''){
      this.nReceta.controls[campo].setValue(campoval);
    }
  }

  valdif(){
    if (this.s1 && !this.s2 && !this.s3){
      return true;
    }
    return false;
  }

  tiempo = true
  valTiempo (val1:string, val2:string) {
    let tiem1: number = this.nReceta.controls[val1].value
    let tiem2: number = this.nReceta.controls[val2].value
    if (this.nReceta.controls[val1].touched && this.nReceta.controls[val2].touched){

      if(tiem2 - tiem1 < 0){
        this.tiempo = false
        return false
      }
    }
    return true

  }


  @ViewChild('cd') cd: Confirmation | undefined;
  resulModal = false
  modalIcon = ''

  modalConfirm(tipo: string) {
    if (tipo === 'confirm'){
      this.modalIcon = 'assets/icons/confirm.json'
      this.confirmationService.confirm({
          header: '¿Deseas guardar esta receta?',
          message: 'Si desea guardar esta receta presione aceptar',
          accept: () => {
            this.resulModal = true
            let datos: object = {
              'imagen': this.img,
              'nombre': this.nReceta.controls['ttl'].value,
              'tiempo': this.horaEnvia,
              'porciones': this.nReceta.controls['por'].value,
              'dificultad': this.dific,
              'ingredientes': this.ingredientes.value,
              'descripcion': this.nReceta.controls['des'].value
            };

            this.acLocal.saveInLocal(datos);
            this.nReceta.reset();

            this.s1 = false;
            this.s2 = false;
            this.s3 = false;
            this.dific = '';
            this.backgroundImageUrl = '';
            this.simg = false;

            setTimeout(() => this.modalConfirm('success'), 300);

          },
          reject: () => {
              this.messageService.add({ severity: 'error', summary: 'No guardado', detail: 'La receta no se ha guardado', life: 3000 });
              this.resulModal = false
            console.log(this.resulModal);

          }
      });
    }
    if (tipo === 'success'){
      this.modalIcon = 'assets/icons/success.json'
      this.confirmationService.confirm({
          header: 'Receta guardada con exito',
          message: 'Si desea volver al menú inicial presione aceptar',
          accept: () => {
          this.router.navigate(['']);
          },
          reject: () => {
              this.messageService.add({ severity: 'error', summary: 'No guardado', detail: 'La receta no se ha guardado', life: 3000 });
              this.resulModal = false
          }
      });
    }
  }


  @ViewChild('modal') modalComponent!: ModalComponent;
  invalid = false
  img:string | ArrayBuffer = '';
  horaEnvia: string = ''

  async to_val() {
    (this.nReceta.controls['ingredientes'] as FormArray) = this.formBuilder.array([]);

    let calH:number = (this.nReceta.controls['horaF'].value - this.nReceta.controls['horaI'].value) /1000 /60
    let horas: number = Math.floor(calH / 60);
    let minutos: number = Math.floor(calH % 60);


    if (horas > 0){
      this.horaEnvia = `${horas}:${minutos}`
    }else{
      this.horaEnvia = `${minutos} minutos`
    }

    if (this.nReceta.valid) {
      if (this.s1 || this.s2 || this.s3){
        this.invalid = false

        if (this.ingredientes.value.length >= 2){
          if (this.tiempo == true){
            const file = this.imagen.files[0];
            if (file != undefined){
              let imagParse = await this.gesImg.genImg64(file)
              this.img = imagParse!;
            };
            this.modalConfirm('confirm')

          }
        }
      }else{
        this.invalid = true
      }
    }
  }


}

