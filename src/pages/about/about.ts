import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  @ViewChild('scroll') vscroll: ElementRef;
  private virtual: Array<any> = [];
  private list: Array<any> = [];


  constructor(public navCtrl: NavController, private http: Http) {

  }


  ionViewDidLoad() {

    this.vscroll.nativeElement.addEventListener('update', (event) => {
      console.log(event);
      this.virtual = event.detail;
      //this.changeDetector.detectChanges(); if need
    });

    this.vscroll.nativeElement.addEventListener('toBottom', (event) => {
      this.http.get('https://api.coinmarketcap.com/v1/ticker/?limit=20', {}).map(res => res.json()).subscribe(data => {
        this.vscroll.nativeElement.list = this.vscroll.nativeElement.list.concat(data);
        this.list = this.vscroll.nativeElement.list;

        if (this.vscroll.nativeElement.list.length > 200) {
          this.vscroll.nativeElement.setInfinateFinally();
        }
        else {
          this.vscroll.nativeElement.setInfinateOn();
        }
        //this.changeDetector.detectChanges(); if need
      });
    });
  }

  ionViewDidEnter() {
    
    this.list = [];
    this.vscroll.nativeElement.list = [];
    this.vscroll.nativeElement.clear();

    this.http.get('https://api.coinmarketcap.com/v1/ticker/?limit=20', {}).map(res => res.json()).subscribe(data => {
      console.log(data)
      this.list = data;
      this.vscroll.nativeElement.list = this.list;
      //this.changeDetector.detectChanges(); if need
    });
  }

}
