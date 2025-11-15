import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
  OwlDateTimeComponent,
  OwlDateTimeTriggerDirective,
  OwlDateTimeInputDirective,
  DateView
} from '../../../projects/picker/src/public_api';

/**
 * Advanced Configuration Demo
 * Demonstrates min/max dates, filters, disabled dates, and other advanced features
 */
@Component({
  selector: 'app-advanced-config',
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
      <h2>Advanced Configuration</h2>
      <p class="description">Min/max dates, filters, step intervals, and more.</p>

      <!-- Min/Max Dates -->
      <section class="demo-section">
        <h3>🔒 Min & Max Date Restrictions</h3>
        <p class="hint">Only dates in the next 30 days are selectable</p>
        <div class="input-group">
          <label for="min-max">Select date (next 30 days only):</label>
          <input
            id="min-max"
            [(ngModel)]="minMaxDate"
            [min]="minDate()"
            [max]="maxDate()"
            [owlDateTime]="dt1"
            [owlDateTimeTrigger]="dt1"
            placeholder="Choose date">
          <owl-date-time #dt1></owl-date-time>
          <div class="info-box">
            <div><strong>Min Date:</strong> {{ minDate() | date:'fullDate' }}</div>
            <div><strong>Max Date:</strong> {{ maxDate() | date:'fullDate' }}</div>
          </div>
          @if (minMaxDate()) {
            <div class="selected-value">
              Selected: <strong>{{ minMaxDate() | date:'fullDate' }}</strong>
            </div>
          }
        </div>
      </section>

      <!-- Date Filter (Weekends Only) -->
      <section class="demo-section">
        <h3>🎯 Date Filter - Weekends Only</h3>
        <p class="hint">Only Saturday and Sunday are selectable</p>
        <div class="input-group">
          <label for="weekends">Select weekend date:</label>
          <input
            id="weekends"
            [(ngModel)]="weekendDate"
            [owlDateTimeFilter]="weekendFilter"
            [owlDateTime]="dt2"
            [owlDateTimeTrigger]="dt2"
            placeholder="Choose weekend">
          <owl-date-time #dt2></owl-date-time>
          @if (weekendDate()) {
            <div class="selected-value">
              Selected: <strong>{{ weekendDate() | date:'EEEE, MMMM d, y' }}</strong>
            </div>
          }
        </div>
      </section>

      <!-- Date Filter (Weekdays Only) -->
      <section class="demo-section">
        <h3>💼 Date Filter - Weekdays Only</h3>
        <p class="hint">Only Monday to Friday are selectable</p>
        <div class="input-group">
          <label for="weekdays">Select weekday:</label>
          <input
            id="weekdays"
            [(ngModel)]="weekdayDate"
            [owlDateTimeFilter]="weekdayFilter"
            [owlDateTime]="dt3"
            [owlDateTimeTrigger]="dt3"
            placeholder="Choose weekday">
          <owl-date-time #dt3></owl-date-time>
          @if (weekdayDate()) {
            <div class="selected-value">
              Selected: <strong>{{ weekdayDate() | date:'EEEE, MMMM d, y' }}</strong>
            </div>
          }
        </div>
      </section>

      <!-- Time Step Intervals -->
      <section class="demo-section">
        <h3>⏱️ Custom Time Step Intervals</h3>
        <p class="hint">Hours: 2h steps, Minutes: 15min steps, Seconds: 30s steps</p>
        <div class="input-group">
          <label for="time-steps">Select time with custom steps:</label>
          <input
            id="time-steps"
            [(ngModel)]="timeSteps"
            [owlDateTime]="dt4"
            [owlDateTimeTrigger]="dt4"
            placeholder="Choose time">
          <owl-date-time
            #dt4
            [pickerType]="'timer'"
            [stepHour]="2"
            [stepMinute]="15"
            [stepSecond]="30"
            [showSecondsTimer]="true">
          </owl-date-time>
          @if (timeSteps()) {
            <div class="selected-value">
              Selected: <strong>{{ timeSteps() | date:'HH:mm:ss' }}</strong>
            </div>
          }
        </div>
      </section>

      <!-- First Day of Week -->
      <section class="demo-section">
        <h3>📆 Custom First Day of Week</h3>
        <p class="hint">Calendar starts on Monday</p>
        <div class="input-group">
          <label for="first-day">Select date (week starts Monday):</label>
          <input
            id="first-day"
            [(ngModel)]="firstDayDate"
            [owlDateTime]="dt5"
            [owlDateTimeTrigger]="dt5"
            placeholder="Choose date">
          <owl-date-time
            #dt5
            [firstDayOfWeek]="1">
          </owl-date-time>
          @if (firstDayDate()) {
            <div class="selected-value">
              Selected: <strong>{{ firstDayDate() | date:'fullDate' }}</strong>
            </div>
          }
        </div>
      </section>

      <!-- Hide Other Months -->
      <section class="demo-section">
        <h3>👁️ Hide Other Months</h3>
        <p class="hint">Only shows dates from the current month</p>
        <div class="input-group">
          <label for="hide-other">Select date (current month only visible):</label>
          <input
            id="hide-other"
            [(ngModel)]="hideOtherDate"
            [owlDateTime]="dt6"
            [owlDateTimeTrigger]="dt6"
            placeholder="Choose date">
          <owl-date-time
            #dt6
            [hideOtherMonths]="true">
          </owl-date-time>
          @if (hideOtherDate()) {
            <div class="selected-value">
              Selected: <strong>{{ hideOtherDate() | date:'fullDate' }}</strong>
            </div>
          }
        </div>
      </section>

      <!-- Start View -->
      <section class="demo-section">
        <h3>🎬 Custom Start View</h3>
        <p class="hint">Opens in year view instead of month view</p>
        <div class="input-group">
          <label for="start-view">Select date (starts in year view):</label>
          <input
            id="start-view"
            [(ngModel)]="startViewDate"
            [owlDateTime]="dt7"
            [owlDateTimeTrigger]="dt7"
            placeholder="Choose date">
          <owl-date-time
            #dt7
            [startView]="DateView.YEAR">
          </owl-date-time>
          @if (startViewDate()) {
            <div class="selected-value">
              Selected: <strong>{{ startViewDate() | date:'fullDate' }}</strong>
            </div>
          }
        </div>
      </section>

      <!-- Year Only -->
      <section class="demo-section">
        <h3>📅 Year Only Picker</h3>
        <p class="hint">Select only year and month</p>
        <div class="input-group">
          <label for="year-only">Select year and month:</label>
          <input
            id="year-only"
            [(ngModel)]="yearOnlyDate"
            [owlDateTime]="dt8"
            [owlDateTimeTrigger]="dt8"
            placeholder="Choose year/month">
          <owl-date-time
            #dt8
            [yearOnly]="true">
          </owl-date-time>
          @if (yearOnlyDate()) {
            <div class="selected-value">
              Selected: <strong>{{ yearOnlyDate() | date:'MMMM yyyy' }}</strong>
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
      border-left: 4px solid #9c27b0;
    }

    h3 {
      margin-top: 0;
      color: #333;
      font-size: 1.3rem;
    }

    .hint {
      color: #666;
      font-size: 0.9rem;
      font-style: italic;
      margin-bottom: 1rem;
      padding: 0.5rem;
      background: #fff;
      border-left: 3px solid #9c27b0;
      border-radius: 2px;
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
      border-color: #9c27b0;
    }

    .info-box {
      padding: 0.75rem;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 0.9rem;
    }

    .info-box > div {
      margin-bottom: 0.25rem;
    }

    .info-box > div:last-child {
      margin-bottom: 0;
    }

    .selected-value {
      margin-top: 0.5rem;
      padding: 0.75rem;
      background: #f3e5f5;
      border-radius: 4px;
      font-size: 0.9rem;
      color: #4a148c;
    }

    .selected-value strong {
      color: #7b1fa2;
    }
  `]
})
export class AdvancedConfigComponent {
  DateView = DateView;

  // Min/Max dates
  minDate = signal<Date>(new Date());
  maxDate = signal<Date>(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
  minMaxDate = signal<Date | null>(null);

  // Filtered dates
  weekendDate = signal<Date | null>(null);
  weekdayDate = signal<Date | null>(null);

  // Time steps
  timeSteps = signal<Date | null>(null);

  // Other configs
  firstDayDate = signal<Date | null>(null);
  hideOtherDate = signal<Date | null>(null);
  startViewDate = signal<Date | null>(null);
  yearOnlyDate = signal<Date | null>(null);

  // Filter for weekends only (Saturday = 6, Sunday = 0)
  weekendFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day === 0 || day === 6;
  };

  // Filter for weekdays only (Monday = 1 to Friday = 5)
  weekdayFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day >= 1 && day <= 5;
  };
}
