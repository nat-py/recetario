import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParseIMG64Service {

  constructor() { }

  public genImg64(file: any): Promise<string | ArrayBuffer | null>{

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result;
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

}
