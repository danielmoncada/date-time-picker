import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { OwlDateTimeComponent } from '../../projects/picker/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('date_range_component', { static: true })
  date_range_component: OwlDateTimeComponent<AppComponent>;
  public selectedMoments = [];

  currentValue: Date = new Date('4/21/2020, 12:00 AM');
  endValue: Date = new Date('4/21/2020, 11:59 PM');

  open_once = false;

  ngAfterViewInit() {
  }
}
