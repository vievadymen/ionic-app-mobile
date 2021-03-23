import { Component, OnInit } from '@angular/core';
import { AlertController } from "@ionic/angular";
import { CalculatorService } from '../calculator.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Component({
  selector: 'app-calculateur-frais',
  templateUrl: './calculateur-frais.page.html',
  styleUrls: ['./calculateur-frais.page.scss'],
})
export class CalculateurFraisPage {
  data = {
    type: '',
    montant: ''
  }

  datas: any = {};

  frais: {
    min: '',
    max: '',
    frais: ''
  }[];

  montantFrais;

  montantfrais: number;


  private tab = "http://127.0.0.1:8000/api/tab_frais"


  constructor(public alertController: AlertController, private http: HttpClient,
    private _router: Router) { }

  ngOnInit() {

    this.getFrais();
  }


  getFrais() {
    return this.http.get<any>(this.tab).subscribe(data => this.datas = data);

  }


  async calculatorModal() {
    const alert = this.alertController.create({
      header: 'Calculateur',
      subHeader: 'pour une transaction de ' + this.data.montant + ' ,les frais sont égal à <b>' + this.montantfrais, 
      message: 'Montant',
      buttons: ['Retour']
    });
    // console.log(this.data.montant);
    // console.log(this.data.type);
    await (await alert).present();
    let result = await (await alert).onDidDismiss();
    // console.log(result);


  }

  showFrais() {
    // let frais = 0;

    // console.log(this.datas);
    for (const f in this.datas['hydra:member']) {
      // console.log(this.datas['hydra:member'][f]);
      if (this.datas['hydra:member'][f].min <= Number(this.data.montant) && this.datas['hydra:member'][f].max > Number(this.data.montant)) {
       // console.log(this.datas['hydra:member'][f].frais);
        this.montantfrais = this.datas['hydra:member'][f].frais;
        break;

        
       
      }
      // return this.montantFrais;
    }

    this.calculatorModal();
    
  }





}
