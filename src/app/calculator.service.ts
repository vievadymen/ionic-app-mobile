import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private _tab = "http://127.0.0.1:8000/api/tab_frais"

  datas: any = {};
  montantfrais: number;
  data = {
    type: '',
    montant: ''
  }


  constructor(private http: HttpClient) { }

  getFrais() {
    return this.http.get<any>(this._tab).subscribe(data => this.datas = data);

  }

  showFrais(montant) {
    // let frais = 0;
    console.log(montant);
    
    this.getFrais();
    console.log(this.datas);
    
    // console.log(this.datas);
    for (const f in this.datas['hydra:member']) {
      
      if (this.datas['hydra:member'][f].min <= Number(montant) && this.datas['hydra:member'][f].max > Number(montant)) {
      
        this.montantfrais = this.datas['hydra:member'][f].frais;
        break;

      }
      return this.montantfrais;
    }
  }

}
