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


    this.list = [];
    this.vscroll.nativeElement.list = [];
    this.vscroll.nativeElement.clear();


    this.vscroll.nativeElement.addEventListener('update', (event) => {
      console.log('event.detail', event.detail);
      this.virtual = [...event.detail];
      //this.changeDetector.detectChanges(); if need
    });

    this.http.get('https://api.coinmarketcap.com/v1/ticker/?limit=20', {}).map(res => res.json()).subscribe(data => {
      // console.log(data)
      this.list = data;
      this.vscroll.nativeElement.list = this.list;
      //this.changeDetector.detectChanges(); if need
    });

    this.vscroll.nativeElement.addEventListener('toBottom', (event) => {
      this.http.get('https://api.coinmarketcap.com/v1/ticker/?limit=20', {}).map(res => res.json()).subscribe(data => {

        setTimeout(() => {
          this.list = [...this.list, ...data];
          this.vscroll.nativeElement.list = this.list;

          if (this.vscroll.nativeElement.list.length > 200) {
            this.vscroll.nativeElement.setInfinateFinally();
          }
          else {
            this.vscroll.nativeElement.setInfinateOn();
          }
          //this.changeDetector.detectChanges(); if need
        }, 3500)
      });
    });

    // setTimeout(() => {
    //   this.virtual = [];
    // }, 10000)
  }

  ionViewDidEnter() {
    this.vscroll.nativeElement.forceUpdateComponent();
    
    // this.list = [];
    // this.vscroll.nativeElement.list = [];
    // this.vscroll.nativeElement.clear();

    // this.http.get('https://api.coinmarketcap.com/v1/ticker/?limit=20', {}).map(res => res.json()).subscribe(data => {
    //   // console.log(data)
    //   this.list = data;
    //   this.vscroll.nativeElement.list = this.list;
    //   //this.changeDetector.detectChanges(); if need
    // });
  }

}
