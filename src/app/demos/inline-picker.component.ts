import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { OwlDateTimeInlineComponent } from '../../../projects/picker/src/public_api';

/**
 * Inline Picker Demo
 * Demonstrates inline date/time pickers that are always visible
 */
@Component({
  selector: 'app-inline-picker',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    OwlDateTimeInlineComponent
  ],
  template: `
    <div class="demo-container">
      <h2>Inline Picker</h2>
      <p class="description">Always-visible pickers embedded directly in your page.</p>

      <!-- Single Date Inline -->
      <section class="demo-section">
        <h3>📅 Inline Date Picker</h3>
        <div class="picker-layout">
          <div class="picker-wrapper">
            <owl-date-time-inline
              [(ngModel)]="singleDate"
              [pickerType]="'calendar'">
            </owl-date-time-inline>
          </div>
          <div class="result-panel">
            <h4>Selected Date</h4>
            @if (singleDate()) {
              <div class="date-display">
                <div class="date-large">{{ singleDate() | date:'d' }}</div>
                <div class="date-month">{{ singleDate() | date:'MMMM yyyy' }}</div>
                <div class="date-full">{{ singleDate() | date:'fullDate' }}</div>
              </div>
            } @else {
              <p class="no-selection">No date selected</p>
            }
          </div>
        </div>
      </section>

      <!-- DateTime Inline -->
      <section class="demo-section">
        <h3>🕐 Inline DateTime Picker</h3>
        <div class="picker-layout">
          <div class="picker-wrapper">
            <owl-date-time-inline
              [(ngModel)]="dateTime"
              [pickerType]="'both'"
              [showSecondsTimer]="true">
            </owl-date-time-inline>
          </div>
          <div class="result-panel">
            <h4>Selected DateTime</h4>
            @if (dateTime()) {
              <div class="date-display">
                <div class="datetime-info">
                  <span class="label">Date:</span>
                  <span class="value">{{ dateTime() | date:'fullDate' }}</span>
                </div>
                <div class="datetime-info">
                  <span class="label">Time:</span>
                  <span class="value">{{ dateTime() | date:'longTime' }}</span>
                </div>
                <div class="datetime-info full">
                  <span class="label">Full:</span>
                  <span class="value">{{ dateTime() | date:'full' }}</span>
                </div>
              </div>
            } @else {
              <p class="no-selection">No datetime selected</p>
            }
          </div>
        </div>
      </section>

      <!-- Range Inline -->
      <section class="demo-section">
        <h3>📊 Inline Range Picker</h3>
        <div class="picker-layout">
          <div class="picker-wrapper">
            <owl-date-time-inline
              [(ngModel)]="dateRange"
              [selectMode]="'range'"
              [pickerType]="'both'"
              [startAt]="startDate()"
              [endAt]="endDate()">
            </owl-date-time-inline>
          </div>
          <div class="result-panel">
            <h4>Selected Range</h4>
            @if (dateRange()[0] && dateRange()[1]) {
              <div class="range-display">
                <div class="range-item start">
                  <div class="range-label">Start</div>
                  <div class="range-date">{{ dateRange()[0] | date:'medium' }}</div>
                </div>
                <div class="range-separator">→</div>
                <div class="range-item end">
                  <div class="range-label">End</div>
                  <div class="range-date">{{ dateRange()[1] | date:'medium' }}</div>
                </div>
                <div class="range-duration">
                  <strong>Duration:</strong> {{ calculateDuration(dateRange()[0], dateRange()[1]) }}
                </div>
              </div>
            } @else {
              <p class="no-selection">No range selected</p>
            }
          </div>
        </div>
      </section>

      <!-- Time Only Inline -->
      <section class="demo-section">
        <h3>⏰ Inline Time Picker</h3>
        <div class="picker-layout">
          <div class="picker-wrapper">
            <owl-date-time-inline
              [(ngModel)]="timeOnly"
              [pickerType]="'timer'"
              [hour12Timer]="true"
              [showSecondsTimer]="true">
            </owl-date-time-inline>
          </div>
          <div class="result-panel">
            <h4>Selected Time</h4>
            @if (timeOnly()) {
              <div class="time-display">
                <div class="time-large">{{ timeOnly() | date:'shortTime' }}</div>
                <div class="time-full">{{ timeOnly() | date:'longTime' }}</div>
                <div class="time-24h">24-hour format: {{ timeOnly() | date:'HH:mm:ss' }}</div>
              </div>
            } @else {
              <p class="no-selection">No time selected</p>
            }
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-container {
      padding: 2rem;
      max-width: 1200px;
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
      margin-bottom: 3rem;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #ff9800;
    }

    h3 {
      margin-top: 0;
      color: #333;
      font-size: 1.3rem;
      margin-bottom: 1.5rem;
    }

    .picker-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      align-items: start;
    }

    @media (max-width: 768px) {
      .picker-layout {
        grid-template-columns: 1fr;
      }
    }

    .picker-wrapper {
      background: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .result-panel {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      min-height: 200px;
    }

    .result-panel h4 {
      margin-top: 0;
      color: #555;
      font-size: 1.1rem;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #ff9800;
    }

    .no-selection {
      color: #999;
      font-style: italic;
      text-align: center;
      padding: 2rem;
    }

    .date-display {
      text-align: center;
    }

    .date-large {
      font-size: 4rem;
      font-weight: bold;
      color: #ff9800;
      line-height: 1;
    }

    .date-month {
      font-size: 1.5rem;
      color: #666;
      margin-bottom: 1rem;
    }

    .date-full {
      font-size: 1rem;
      color: #999;
      padding: 0.5rem;
      background: #fff3e0;
      border-radius: 4px;
    }

    .datetime-info {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem;
      margin-bottom: 0.5rem;
      background: #fff3e0;
      border-radius: 4px;
    }

    .datetime-info.full {
      flex-direction: column;
      gap: 0.5rem;
    }

    .datetime-info .label {
      font-weight: 600;
      color: #e65100;
    }

    .datetime-info .value {
      color: #333;
    }

    .range-display {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .range-item {
      padding: 1rem;
      border-radius: 4px;
      text-align: center;
    }

    .range-item.start {
      background: #e3f2fd;
    }

    .range-item.end {
      background: #fce4ec;
    }

    .range-label {
      font-size: 0.9rem;
      font-weight: 600;
      text-transform: uppercase;
      color: #666;
      margin-bottom: 0.5rem;
    }

    .range-date {
      font-size: 1.1rem;
      color: #333;
    }

    .range-separator {
      text-align: center;
      font-size: 2rem;
      color: #ff9800;
    }

    .range-duration {
      padding: 1rem;
      background: #fff3e0;
      border-radius: 4px;
      text-align: center;
      color: #e65100;
    }

    .time-display {
      text-align: center;
    }

    .time-large {
      font-size: 3rem;
      font-weight: bold;
      color: #ff9800;
      margin-bottom: 1rem;
    }

    .time-full {
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 0.5rem;
    }

    .time-24h {
      font-size: 1rem;
      color: #999;
      padding: 0.5rem;
      background: #fff3e0;
      border-radius: 4px;
    }
  `]
})
export class InlinePickerComponent {
  singleDate = signal<Date | null>(null);
  dateTime = signal<Date | null>(null);
  dateRange = signal<Date[]>([]);
  timeOnly = signal<Date | null>(null);

  // Default start and end dates for range
  startDate = signal<Date>(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  endDate = signal<Date>(new Date());

  calculateDuration(start: Date, end: Date): string {
    const diff = Math.abs(end.getTime() - start.getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    const parts = [];
    if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);

    return parts.join(', ') || '0 minutes';
  }
}
