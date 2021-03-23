import { CalculatorService } from './../../calculator.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from "@ionic/angular";


@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit {
  data = {
    cni: '',
    nom: '',
    prenom: '',
    montant: 0,
    frais : 0,
    tel: '',
    nomRecep:'',
    numRecep: '',
    total: 0

  }

  private depot_url = "http://127.0.0.1:8000/api/admin/transaction/depot"
  private selectedSegment: string='emetteur'

  constructor(public alertController: AlertController, private calculfrais: CalculatorService) { }

  ngOnInit() {
  }

  segmentChanged(event:any){
    console.log(event.target.value);
    this.selectedSegment=event.target.value
  }

  value =0;

  onEnter(event) { // without type info
    console.log(this.calculfrais.showFrais(event.target.value));
   // console.log(typeof(event.target.value));
    this.data.frais = this.calculfrais.showFrais(event.target.value);
    this.data.total = this.data.frais + this.data.montant;
  }

  async depotModal() {
    const alert = this.alertController.create({
      header: 'Confirmation',
      message: 'Emetteur <br><b>'+this.data.nom+'</b><br>Telephone<br><b>'+this.data.tel+'</b><br> N° CNI<br><b>'
      +this.data.cni+'</b><br> Montant à envoyer<br><b>'+this.data.montant+'</b><br> Récepteur<br><b>'+this.data.nomRecep+
      '</b><br> Numéro recepteur <br><b>'+this.data.numRecep+'</b>',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmer',
          handler: () => {
            console.log('Dépot Confirmé');
          }
        }
      ]
    });
    // console.log(this.data.montant);
    // console.log(this.data.type);
    await (await alert).present();
    let result = await (await alert).onDidDismiss();
    // console.log(result);


  }

  genererCode(){
    var min=12000000; 
    var max=100000000;  
    var random = Math.floor(Math.random() * (max - min)) + min; 
    return random;
  }

  
}
