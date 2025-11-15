import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
  OwlDateTimeComponent,
  OwlDateTimeTriggerDirective,
  OwlDateTimeInputDirective
} from '../../../projects/picker/src/public_api';

/**
 * Basic Usage Demo
 * Demonstrates simple date, time, and datetime pickers
 */
@Component({
  selector: 'app-basic-usage',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    OwlDateTimeComponent,
    OwlDateTimeTriggerDirective,
    OwlDateTimeInputDirective
  ],
  template: `
    <div class="demo-container">
      <h2>Basic Usage</h2>
      <p class="description">Simple examples of date, time, and datetime pickers with default settings.</p>

      <!-- Date Picker -->
      <section class="demo-section">
        <h3>📅 Date Picker Only</h3>
        <div class="input-group">
          <label for="date-only">Select a date:</label>
          <input
            id="date-only"
            [(ngModel)]="dateValue"
            [owlDateTime]="dt1"
            [owlDateTimeTrigger]="dt1"
            placeholder="Choose date">
          <owl-date-time #dt1 [pickerType]="'calendar'"></owl-date-time>
          @if (dateValue()) {
            <div class="selected-value">
              Selected: <strong>{{ dateValue() | date:'fullDate' }}</strong>
            </div>
          }
        </div>
      </section>

      <!-- Time Picker -->
      <section class="demo-section">
        <h3>⏰ Time Picker Only</h3>
        <div class="input-group">
          <label for="time-only">Select a time:</label>
          <input
            id="time-only"
            [(ngModel)]="timeValue"
            [owlDateTime]="dt2"
            [owlDateTimeTrigger]="dt2"
            placeholder="Choose time">
          <owl-date-time
            #dt2
            [pickerType]="'timer'"
            [showSecondsTimer]="true">
          </owl-date-time>
          @if (timeValue()) {
            <div class="selected-value">
              Selected: <strong>{{ timeValue() | date:'medium' }}</strong>
            </div>
          }
        </div>
      </section>

      <!-- DateTime Picker -->
      <section class="demo-section">
        <h3>📆 Date & Time Picker</h3>
        <div class="input-group">
          <label for="datetime">Select date and time:</label>
          <input
            id="datetime"
            [(ngModel)]="dateTimeValue"
            [owlDateTime]="dt3"
            [owlDateTimeTrigger]="dt3"
            placeholder="Choose date and time">
          <owl-date-time #dt3 [pickerType]="'both'"></owl-date-time>
          @if (dateTimeValue()) {
            <div class="selected-value">
              Selected: <strong>{{ dateTimeValue() | date:'full' }}</strong>
            </div>
          }
        </div>
      </section>

      <!-- 12-Hour Format -->
      <section class="demo-section">
        <h3>🕐 12-Hour Format</h3>
        <div class="input-group">
          <label for="hour12">Time in 12-hour format:</label>
          <input
            id="hour12"
            [(ngModel)]="hour12Value"
            [owlDateTime]="dt4"
            [owlDateTimeTrigger]="dt4"
            placeholder="Choose time (12-hour)">
          <owl-date-time
            #dt4
            [pickerType]="'timer'"
            [hour12Timer]="true">
          </owl-date-time>
          @if (hour12Value()) {
            <div class="selected-value">
              Selected: <strong>{{ hour12Value() | date:'short' }}</strong>
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    h2 {
      color: #1976d2;
      margin-bottom: 0.5rem;
      font-size: 2rem;
    }

    .description {
      color: #666;
      margin-bottom: 2rem;
      font-size: 1rem;
    }

    .demo-section {
      margin-bottom: 2.5rem;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #1976d2;
    }

    h3 {
      margin-top: 0;
      color: #333;
      font-size: 1.3rem;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    label {
      font-weight: 500;
      color: #555;
    }

    input {
      padding: 0.75rem;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    input:focus {
      outline: none;
      border-color: #1976d2;
    }

    .selected-value {
      margin-top: 0.5rem;
      padding: 0.5rem;
      background: #e3f2fd;
      border-radius: 4px;
      font-size: 0.9rem;
      color: #0d47a1;
    }

    .selected-value strong {
      color: #1976d2;
    }
  `]
})
export class BasicUsageComponent {
  dateValue = signal<Date | null>(null);
  timeValue = signal<Date | null>(null);
  dateTimeValue = signal<Date | null>(null);
  hour12Value = signal<Date | null>(null);
}
