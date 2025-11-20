import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '../../projects/picker/src/public_api';

/** One day in milliseconds */
const ONE_DAY = 24 * 60 * 60 * 1000;

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    DatePipe,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class AppComponent {
  protected readonly currentTab = signal<'date-range' | 'date-range-dialog' | 'date-time-inline'>('date-range');

  protected selectedDates: [Date, Date] = [
    new Date(Date.now() - ONE_DAY),
    new Date(Date.now() + ONE_DAY)
  ];

  protected currentValue: Date = new Date(this.selectedDates[0]);

  protected endValue: Date = new Date(this.selectedDates[1]);

  protected millisecondsValue: Date = (() => {
    const date = new Date();
    date.setMilliseconds(123); // Set a specific millisecond value for demonstration
    return date;
  })();

  protected selectedTrigger(date: Date): void {
    console.log(date);
  }

  protected millisecondsSelected(date: Date): void {
    this.millisecondsValue = date;
    console.log('Milliseconds demo - Selected date with milliseconds:', date, 'Milliseconds:', date.getMilliseconds());
  }
}
