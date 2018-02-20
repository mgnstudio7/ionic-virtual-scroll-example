import { Component,  } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'AboutPage';
  tab2Root = 'HomePage';
  tab3Root = 'ContactPage';

  constructor() {

  }
}
