import { Component,ElementRef, ViewChild } from '@angular/core';
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

  constructor(public navCtrl: NavController, private http: Http) {

  }


  ionViewDidEnter() {
    
    this.vscroll.nativeElement.addEventListener('update', (event) => {
      this.virtual = event.detail;
      //this.changeDetector.detectChanges(); if need
    });

    this.vscroll.nativeElement.addEventListener('toBottom', (event) => {
      this.http.get('https://jsonplaceholder.typicode.com/photos', {}).map(res => res.json()).subscribe(data => {
        this.vscroll.nativeElement.list = this.vscroll.nativeElement.list.concat(data.splice(0, 50))

        if (this.vscroll.nativeElement.list.length > 200) {
          this.vscroll.nativeElement.setInfinateFinally();
        }
        else {
          this.vscroll.nativeElement.setInfinateOn();
        }
        //this.changeDetector.detectChanges(); if need
      });
    });

    this.http.get('https://jsonplaceholder.typicode.com/photos', {}).map(res => res.json()).subscribe(data => {
      this.vscroll.nativeElement.list = data.splice(0, 50);
        //this.changeDetector.detectChanges(); if need
    });
  }

}
