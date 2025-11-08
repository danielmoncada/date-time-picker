import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
  OwlDateTimeComponent,
  OwlDateTimeTriggerDirective,
  OwlDateTimeInputDirective,
  DateView
} from '../../../projects/picker/src/public_api';

interface EventLog {
  timestamp: Date;
  event: string;
  data: any;
}

/**
 * Events & Callbacks Demo
 * Demonstrates all available events and how to handle them
 */
@Component({
  selector: 'app-events-callbacks',
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
      <h2>Events & Callbacks</h2>
      <p class="description">Monitor and respond to picker events in real-time.</p>

      <!-- Main Picker with All Events -->
      <section class="demo-section">
        <h3>📡 All Events</h3>
        <div class="input-group">
          <label for="events">Interact with this picker:</label>
          <input
            id="events"
            [(ngModel)]="eventDate"
            [owlDateTime]="dt1"
            [owlDateTimeTrigger]="dt1"
            placeholder="Choose date">
          <owl-date-time
            #dt1
            (beforePickerOpen)="onBeforeOpen()"
            (afterPickerOpen)="onAfterOpen()"
            (afterPickerClosed)="onAfterClosed($event)"
            (yearSelected)="onYearSelected($event)"
            (monthSelected)="onMonthSelected($event)"
            (dateSelected)="onDateSelected($event)">
          </owl-date-time>

          @if (eventDate()) {
            <div class="selected-value">
              Current Value: <strong>{{ eventDate() | date:'full' }}</strong>
            </div>
          }
        </div>

        <!-- Event Log -->
        <div class="event-log">
          <div class="log-header">
            <h4>Event Log</h4>
            <button (click)="clearLog()" class="btn-clear">Clear Log</button>
          </div>
          <div class="log-content">
            @if (eventLogs().length === 0) {
              <p class="no-events">No events yet. Interact with the picker above.</p>
            }
            @for (log of eventLogs(); track log.timestamp) {
              <div class="log-entry" [class]="'event-' + log.event">
                <span class="log-time">{{ log.timestamp | date:'HH:mm:ss.SSS' }}</span>
                <span class="log-event">{{ log.event }}</span>
                <span class="log-data">{{ formatData(log.data) }}</span>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Year Selection Event -->
      <section class="demo-section">
        <h3>📅 Year Selection Event</h3>
        <div class="input-group">
          <label for="year-select">Click on a year in multi-year view:</label>
          <input
            id="year-select"
            [(ngModel)]="yearDate"
            [owlDateTime]="dt2"
            [owlDateTimeTrigger]="dt2"
            placeholder="Choose date">
          <owl-date-time
            #dt2
            [startView]="DateView.MULTI_YEARS"
            (yearSelected)="onYearOnly($event)">
          </owl-date-time>
          @if (selectedYear()) {
            <div class="event-highlight">
              Year Selected: <strong>{{ selectedYear() | date:'yyyy' }}</strong>
            </div>
          }
        </div>
      </section>

      <!-- Month Selection Event -->
      <section class="demo-section">
        <h3>📆 Month Selection Event</h3>
        <div class="input-group">
          <label for="month-select">Click on a month in year view:</label>
          <input
            id="month-select"
            [(ngModel)]="monthDate"
            [owlDateTime]="dt3"
            [owlDateTimeTrigger]="dt3"
            placeholder="Choose date">
          <owl-date-time
            #dt3
            [startView]="DateView.YEAR"
            (monthSelected)="onMonthOnly($event)">
          </owl-date-time>
          @if (selectedMonth()) {
            <div class="event-highlight">
              Month Selected: <strong>{{ selectedMonth() | date:'MMMM yyyy' }}</strong>
            </div>
          }
        </div>
      </section>

      <!-- Picker Lifecycle -->
      <section class="demo-section">
        <h3>🔄 Picker Lifecycle</h3>
        <div class="lifecycle-grid">
          <div class="lifecycle-item" [class.active]="isOpening()">
            <div class="lifecycle-icon">⏳</div>
            <div class="lifecycle-label">beforePickerOpen</div>
            <div class="lifecycle-status">{{ isOpening() ? 'Active' : 'Inactive' }}</div>
          </div>
          <div class="lifecycle-item" [class.active]="isOpen()">
            <div class="lifecycle-icon">✅</div>
            <div class="lifecycle-label">afterPickerOpen</div>
            <div class="lifecycle-status">{{ isOpen() ? 'Active' : 'Inactive' }}</div>
          </div>
          <div class="lifecycle-item" [class.active]="isClosed()">
            <div class="lifecycle-icon">🔒</div>
            <div class="lifecycle-label">afterPickerClosed</div>
            <div class="lifecycle-status">{{ isClosed() ? 'Active' : 'Inactive' }}</div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-container {
      padding: 2rem;
      max-width: 900px;
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
      border-left: 4px solid #e91e63;
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
      border-color: #e91e63;
    }

    .selected-value {
      padding: 0.75rem;
      background: #fce4ec;
      border-radius: 4px;
      font-size: 0.9rem;
      color: #880e4f;
    }

    .event-log {
      margin-top: 1rem;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .log-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: #e91e63;
      color: white;
    }

    .log-header h4 {
      margin: 0;
      font-size: 1.1rem;
    }

    .btn-clear {
      padding: 0.5rem 1rem;
      background: white;
      color: #e91e63;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s;
    }

    .btn-clear:hover {
      background: #fce4ec;
    }

    .log-content {
      max-height: 400px;
      overflow-y: auto;
      padding: 1rem;
    }

    .no-events {
      text-align: center;
      color: #999;
      padding: 2rem;
      font-style: italic;
    }

    .log-entry {
      display: grid;
      grid-template-columns: 120px 180px 1fr;
      gap: 1rem;
      padding: 0.75rem;
      margin-bottom: 0.5rem;
      border-radius: 4px;
      font-size: 0.9rem;
      border-left: 3px solid;
      animation: slideIn 0.3s ease;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(-10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .log-entry.event-beforePickerOpen {
      background: #fff3e0;
      border-color: #ff9800;
    }

    .log-entry.event-afterPickerOpen {
      background: #e8f5e9;
      border-color: #4caf50;
    }

    .log-entry.event-afterPickerClosed {
      background: #fce4ec;
      border-color: #e91e63;
    }

    .log-entry.event-yearSelected {
      background: #e3f2fd;
      border-color: #2196f3;
    }

    .log-entry.event-monthSelected {
      background: #f3e5f5;
      border-color: #9c27b0;
    }

    .log-entry.event-dateSelected {
      background: #e0f2f1;
      border-color: #009688;
    }

    .log-time {
      color: #666;
      font-family: monospace;
    }

    .log-event {
      font-weight: 600;
      color: #333;
    }

    .log-data {
      color: #555;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .event-highlight {
      padding: 1rem;
      background: #fce4ec;
      border-radius: 4px;
      color: #880e4f;
      font-size: 1.1rem;
      text-align: center;
      margin-top: 0.5rem;
      animation: pulse 0.5s ease;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    .lifecycle-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .lifecycle-item {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      text-align: center;
      transition: all 0.3s;
      border: 2px solid #ddd;
    }

    .lifecycle-item.active {
      border-color: #e91e63;
      background: #fce4ec;
      transform: scale(1.05);
    }

    .lifecycle-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .lifecycle-label {
      font-weight: 600;
      color: #333;
      margin-bottom: 0.25rem;
      font-size: 0.9rem;
    }

    .lifecycle-status {
      color: #666;
      font-size: 0.8rem;
    }

    .lifecycle-item.active .lifecycle-status {
      color: #e91e63;
      font-weight: 600;
    }
  `]
})
export class EventsCallbacksComponent {
  DateView = DateView;

  eventDate = signal<Date | null>(null);
  yearDate = signal<Date | null>(null);
  monthDate = signal<Date | null>(null);

  eventLogs = signal<EventLog[]>([]);

  selectedYear = signal<Date | null>(null);
  selectedMonth = signal<Date | null>(null);

  isOpening = signal(false);
  isOpen = signal(false);
  isClosed = signal(false);

  private addLog(event: string, data: any) {
    const newLog: EventLog = {
      timestamp: new Date(),
      event,
      data
    };
    this.eventLogs.update(logs => [newLog, ...logs].slice(0, 50)); // Keep last 50 events
  }

  onBeforeOpen() {
    this.isOpening.set(true);
    this.isOpen.set(false);
    this.isClosed.set(false);
    this.addLog('beforePickerOpen', null);
    setTimeout(() => this.isOpening.set(false), 1000);
  }

  onAfterOpen() {
    this.isOpen.set(true);
    this.addLog('afterPickerOpen', null);
  }

  onAfterClosed(data: any) {
    this.isOpen.set(false);
    this.isClosed.set(true);
    this.addLog('afterPickerClosed', data);
    setTimeout(() => this.isClosed.set(false), 2000);
  }

  onYearSelected(date: Date) {
    this.addLog('yearSelected', date);
  }

  onMonthSelected(date: Date) {
    this.addLog('monthSelected', date);
  }

  onDateSelected(date: Date) {
    this.addLog('dateSelected', date);
  }

  onYearOnly(date: Date) {
    this.selectedYear.set(date);
  }

  onMonthOnly(date: Date) {
    this.selectedMonth.set(date);
  }

  clearLog() {
    this.eventLogs.set([]);
  }

  formatData(data: any): string {
    if (!data) return '—';
    if (data instanceof Date) {
      return data.toLocaleString();
    }
    if (Array.isArray(data)) {
      return data.map(d => d instanceof Date ? d.toLocaleDateString() : d).join(', ');
    }
    return JSON.stringify(data);
  }
}
