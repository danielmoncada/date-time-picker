import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
  OwlDateTimeComponent,
  OwlDateTimeTriggerDirective,
  OwlDateTimeInputDirective
} from '../../../projects/picker/src/public_api';

/**
 * Range Selection Demo
 * Demonstrates date range picking with various modes
 */
@Component({
  selector: 'app-range-selection',
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
      <h2>Range Selection</h2>
      <p class="description">Select date ranges for bookings, reports, and more.</p>

      <!-- Full Range -->
      <section class="demo-section">
        <h3>📊 Date Range (From & To)</h3>
        <div class="input-group">
          <label for="date-range">Select date range:</label>
          <input
            id="date-range"
            [(ngModel)]="dateRange"
            [selectMode]="'range'"
            [owlDateTime]="dt1"
            [owlDateTimeTrigger]="dt1"
            placeholder="Choose date range">
          <owl-date-time #dt1></owl-date-time>
          @if (dateRange()[0] && dateRange()[1]) {
            <div class="selected-value">
              <div><strong>From:</strong> {{ dateRange()[0] | date:'fullDate' }}</div>
              <div><strong>To:</strong> {{ dateRange()[1] | date:'fullDate' }}</div>
              <div class="range-info">
                Duration: <strong>{{ calculateDays(dateRange()[0], dateRange()[1]) }} days</strong>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- DateTime Range -->
      <section class="demo-section">
        <h3>⏱️ DateTime Range</h3>
        <div class="input-group">
          <label for="datetime-range">Select datetime range:</label>
          <input
            id="datetime-range"
            [(ngModel)]="dateTimeRange"
            [selectMode]="'range'"
            [owlDateTime]="dt2"
            [owlDateTimeTrigger]="dt2"
            placeholder="Choose datetime range">
          <owl-date-time #dt2 [pickerType]="'both'"></owl-date-time>
          @if (dateTimeRange()[0] && dateTimeRange()[1]) {
            <div class="selected-value">
              <div><strong>Start:</strong> {{ dateTimeRange()[0] | date:'medium' }}</div>
              <div><strong>End:</strong> {{ dateTimeRange()[1] | date:'medium' }}</div>
            </div>
          }
        </div>
      </section>

      <!-- Range From -->
      <section class="demo-section">
        <h3>➡️ Range From (Start Date Only)</h3>
        <div class="input-group">
          <label for="range-from">Select start date:</label>
          <input
            id="range-from"
            [(ngModel)]="rangeFrom"
            [selectMode]="'rangeFrom'"
            [owlDateTime]="dt3"
            [owlDateTimeTrigger]="dt3"
            placeholder="Choose start date">
          <owl-date-time #dt3></owl-date-time>
          @if (rangeFrom()[0]) {
            <div class="selected-value">
              <strong>Start Date:</strong> {{ rangeFrom()[0] | date:'fullDate' }}
            </div>
          }
        </div>
      </section>

      <!-- Range To -->
      <section class="demo-section">
        <h3>⬅️ Range To (End Date Only)</h3>
        <div class="input-group">
          <label for="range-to">Select end date:</label>
          <input
            id="range-to"
            [(ngModel)]="rangeTo"
            [selectMode]="'rangeTo'"
            [owlDateTime]="dt4"
            [owlDateTimeTrigger]="dt4"
            placeholder="Choose end date">
          <owl-date-time #dt4></owl-date-time>
          @if (rangeTo()[1]) {
            <div class="selected-value">
              <strong>End Date:</strong> {{ rangeTo()[1] | date:'fullDate' }}
            </div>
          }
        </div>
      </section>

      <!-- Pre-filled Range -->
      <section class="demo-section">
        <h3>✨ Pre-filled Range</h3>
        <p class="hint">Range is pre-filled with last 7 days</p>
        <div class="input-group">
          <label for="prefilled-range">Pre-filled date range:</label>
          <input
            id="prefilled-range"
            [(ngModel)]="prefilledRange"
            [selectMode]="'range'"
            [owlDateTime]="dt5"
            [owlDateTimeTrigger]="dt5"
            placeholder="Pre-filled range">
          <owl-date-time
            #dt5
            [startAt]="prefilledRange()[0]"
            [endAt]="prefilledRange()[1]">
          </owl-date-time>
          @if (prefilledRange()[0] && prefilledRange()[1]) {
            <div class="selected-value">
              <div><strong>From:</strong> {{ prefilledRange()[0] | date:'shortDate' }}</div>
              <div><strong>To:</strong> {{ prefilledRange()[1] | date:'shortDate' }}</div>
            </div>
          }
        </div>
      </section>

      <!-- Test Issue #229: null end date -->
      <section class="demo-section">
        <h3>🐛 Test: Null End Date (Issue #229)</h3>
        <p class="hint">Select only start date and confirm. End date should remain null, not 1/1/1970.</p>
        <div class="input-group">
          <label for="test-range">Test range picker:</label>
          <input
            id="test-range"
            [(ngModel)]="testRange"
            [selectMode]="'range'"
            [owlDateTime]="dt6"
            [owlDateTimeTrigger]="dt6"
            placeholder="Select range">
          <owl-date-time #dt6 [pickerMode]="'dialog'"></owl-date-time>
          <div class="selected-value">
            <div><strong>Raw value:</strong> {{ testRange() | json }}</div>
            @if (testRange()[0]) {
              <div><strong>Start:</strong> {{ testRange()[0] | date:'medium' }}</div>
            }
            @if (testRange()[1]) {
              <div><strong>End:</strong> {{ testRange()[1] | date:'medium' }}</div>
            } @else if (testRange()[0]) {
              <div><strong>End:</strong> null (correct!)</div>
            }
            @if (isEpochDate(testRange()[1])) {
              <div class="error"><strong>⚠️ BUG: End date is set to epoch (1/1/1970) instead of null!</strong></div>
            }
          </div>
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
      border-left: 4px solid #4caf50;
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
      border-color: #4caf50;
    }

    .selected-value {
      margin-top: 0.5rem;
      padding: 0.75rem;
      background: #e8f5e9;
      border-radius: 4px;
      font-size: 0.9rem;
      color: #1b5e20;
    }

    .selected-value > div {
      margin-bottom: 0.25rem;
    }

    .selected-value > div:last-child {
      margin-bottom: 0;
    }

    .selected-value strong {
      color: #2e7d32;
    }

    .range-info {
      margin-top: 0.5rem;
      padding-top: 0.5rem;
      border-top: 1px solid #c8e6c9;
    }

    .error {
      background: #ffebee;
      color: #c62828;
      padding: 0.5rem;
      border-radius: 4px;
      margin-top: 0.5rem;
      border-left: 3px solid #c62828;
    }
  `]
})
export class RangeSelectionComponent {
  dateRange = signal<Date[]>([]);
  dateTimeRange = signal<Date[]>([]);
  rangeFrom = signal<Date[]>([]);
  rangeTo = signal<Date[]>([]);
  testRange = signal<Date[]>([]);

  // Pre-filled with last 7 days
  prefilledRange = signal<Date[]>([
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    new Date()
  ]);

  calculateDays(from: Date, to: Date): number {
    const diffTime = Math.abs(to.getTime() - from.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  isEpochDate(date: Date | null | undefined): boolean {
    if (!date) return false;
    // Check if date is Jan 1, 1970 00:00:00 UTC (epoch)
    const epochTime = new Date(1970, 0, 1).getTime();
    const dateTime = date.getTime();
    // Allow for timezone differences - check if it's within 24 hours of epoch
    return Math.abs(dateTime - epochTime) < 24 * 60 * 60 * 1000;
  }
}
