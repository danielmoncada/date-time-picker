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
 * Custom Options Demo
 * Demonstrates customization of multi-year view and other advanced options
 */
@Component({
  selector: 'app-custom-options',
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
      <h2>Custom Options</h2>
      <p class="description">Configure multi-year view grid, calendar settings, and more.</p>

      <!-- Multi-Year View Configuration -->
      <section class="demo-section">
        <h3>📅 Multi-Year View Grid</h3>
        <p class="hint">
          The multi-year view is configured globally via <code>provideOwlDateTimeOptions()</code>
        </p>
        <div class="config-display">
          <h4>Current Configuration (from main.ts)</h4>
          <div class="config-grid">
            <div class="config-item">
              <div class="config-label">Years Per Row:</div>
              <div class="config-value">3</div>
            </div>
            <div class="config-item">
              <div class="config-label">Number of Rows:</div>
              <div class="config-value">5</div>
            </div>
            <div class="config-item total">
              <div class="config-label">Total Years Displayed:</div>
              <div class="config-value">15</div>
            </div>
          </div>
        </div>
        <div class="input-group">
          <label for="multiyear">Try the multi-year view:</label>
          <input
            id="multiyear"
            [(ngModel)]="multiYearDate"
            [owlDateTime]="dt1"
            [owlDateTimeTrigger]="dt1"
            placeholder="Click and select multi-year view">
          <owl-date-time
            #dt1
            [startView]="DateView.MULTI_YEARS">
          </owl-date-time>
          @if (multiYearDate()) {
            <div class="selected-value">
              Selected: <strong>{{ multiYearDate() | date:'fullDate' }}</strong>
            </div>
          }
        </div>
        <div class="code-example">
          <div class="code-title">💡 How to configure in main.ts:</div>
          <pre><code>import &#123; provideOwlDateTimeOptions &#125; from '&#64;danielmoncada/angular-datetime-picker';

bootstrapApplication(AppComponent, &#123;
  providers: [
    provideOwlDateTime(),
    provideOwlNativeDateTime(),
    provideOwlDateTimeOptions(&#123;
      multiYear: &#123;
        yearsPerRow: 3,  // 3 years per row
        yearRows: 5      // 5 rows = 15 years total
      &#125;
    &#125;)
  ]
&#125;)</code></pre>
        </div>
      </section>

      <!-- Show Calendar Weeks -->
      <section class="demo-section">
        <h3>📊 Show Calendar Weeks</h3>
        <p class="hint">Display week numbers in the calendar</p>
        <div class="input-group">
          <label for="weeks">Calendar with week numbers:</label>
          <input
            id="weeks"
            [(ngModel)]="weeksDate"
            [owlDateTime]="dt2"
            [owlDateTimeTrigger]="dt2"
            placeholder="See week numbers">
          <owl-date-time
            #dt2
            [showCalendarWeeks]="true">
          </owl-date-time>
          @if (weeksDate()) {
            <div class="selected-value">
              Selected: <strong>{{ weeksDate() | date:'fullDate' }}</strong>
              <div class="week-number">Week {{ getWeekNumber(weeksDate()) }} of {{ weeksDate() | date:'yyyy' }}</div>
            </div>
          }
        </div>
      </section>

      <!-- Year Only Mode -->
      <section class="demo-section">
        <h3>📆 Year Only Mode</h3>
        <p class="hint">Show only year and multi-year views (skip month/day selection)</p>
        <div class="input-group">
          <label for="year-only">Year-only picker:</label>
          <input
            id="year-only"
            [(ngModel)]="yearOnly"
            [owlDateTime]="dt3"
            [owlDateTimeTrigger]="dt3"
            placeholder="Select year">
          <owl-date-time
            #dt3
            [yearOnly]="true">
          </owl-date-time>
          @if (yearOnly()) {
            <div class="selected-value">
              Selected Year: <strong>{{ yearOnly() | date:'yyyy' }}</strong>
            </div>
          }
        </div>
      </section>

      <!-- Multi-Year Only Mode -->
      <section class="demo-section">
        <h3>🗓️ Multi-Year Only Mode</h3>
        <p class="hint">Show only multi-year view (no year or month/day selection)</p>
        <div class="input-group">
          <label for="multiyear-only">Multi-year only picker:</label>
          <input
            id="multiyear-only"
            [(ngModel)]="multiYearOnly"
            [owlDateTime]="dt4"
            [owlDateTimeTrigger]="dt4"
            placeholder="Select from multi-year view">
          <owl-date-time
            #dt4
            [multiyearOnly]="true">
          </owl-date-time>
          @if (multiYearOnly()) {
            <div class="selected-value">
              Selected: <strong>{{ multiYearOnly() | date:'yyyy' }}</strong>
            </div>
          }
        </div>
      </section>

      <!-- Combined Configuration Example -->
      <section class="demo-section highlight">
        <h3>✨ Combined Configuration Example</h3>
        <p class="hint">A picker with multiple custom options applied</p>
        <div class="input-group">
          <label for="combined">Combined options picker:</label>
          <input
            id="combined"
            [(ngModel)]="combinedDate"
            [min]="minDate()"
            [max]="maxDate()"
            [owlDateTimeFilter]="weekdayFilter"
            [owlDateTime]="dt5"
            [owlDateTimeTrigger]="dt5"
            placeholder="Feature-rich picker">
          <owl-date-time
            #dt5
            [pickerType]="'both'"
            [showSecondsTimer]="true"
            [hour12Timer]="true"
            [stepHour]="1"
            [stepMinute]="15"
            [stepSecond]="30"
            [firstDayOfWeek]="1"
            [showCalendarWeeks]="true"
            [hideOtherMonths]="true">
          </owl-date-time>
          @if (combinedDate()) {
            <div class="selected-value">
              Selected: <strong>{{ combinedDate() | date:'full' }}</strong>
            </div>
          }
        </div>
        <div class="feature-list">
          <h4>Applied Features:</h4>
          <ul>
            <li>✅ Date & Time selection</li>
            <li>✅ 12-hour format with seconds</li>
            <li>✅ 15-minute intervals</li>
            <li>✅ 30-second intervals</li>
            <li>✅ Week starts on Monday</li>
            <li>✅ Shows week numbers</li>
            <li>✅ Hides other months</li>
            <li>✅ Weekdays only filter</li>
            <li>✅ Min/Max date restrictions</li>
          </ul>
        </div>
      </section>

      <!-- Configuration Reference -->
      <section class="demo-section">
        <h3>📖 Configuration Reference</h3>
        <div class="reference-table">
          <div class="ref-header">
            <div class="ref-cell">Property</div>
            <div class="ref-cell">Type</div>
            <div class="ref-cell">Description</div>
          </div>
          <div class="ref-row">
            <div class="ref-cell"><code>pickerType</code></div>
            <div class="ref-cell">string</div>
            <div class="ref-cell">'both' | 'calendar' | 'timer'</div>
          </div>
          <div class="ref-row">
            <div class="ref-cell"><code>pickerMode</code></div>
            <div class="ref-cell">string</div>
            <div class="ref-cell">'popup' | 'dialog'</div>
          </div>
          <div class="ref-row">
            <div class="ref-cell"><code>selectMode</code></div>
            <div class="ref-cell">string</div>
            <div class="ref-cell">'single' | 'range' | 'rangeFrom' | 'rangeTo'</div>
          </div>
          <div class="ref-row">
            <div class="ref-cell"><code>startView</code></div>
            <div class="ref-cell">string</div>
            <div class="ref-cell">'month' | 'year' | 'multi-years'</div>
          </div>
          <div class="ref-row">
            <div class="ref-cell"><code>showSecondsTimer</code></div>
            <div class="ref-cell">boolean</div>
            <div class="ref-cell">Show/hide seconds in timer</div>
          </div>
          <div class="ref-row">
            <div class="ref-cell"><code>hour12Timer</code></div>
            <div class="ref-cell">boolean</div>
            <div class="ref-cell">12-hour format (AM/PM)</div>
          </div>
          <div class="ref-row">
            <div class="ref-cell"><code>stepHour</code></div>
            <div class="ref-cell">number</div>
            <div class="ref-cell">Hour step interval</div>
          </div>
          <div class="ref-row">
            <div class="ref-cell"><code>stepMinute</code></div>
            <div class="ref-cell">number</div>
            <div class="ref-cell">Minute step interval</div>
          </div>
          <div class="ref-row">
            <div class="ref-cell"><code>stepSecond</code></div>
            <div class="ref-cell">number</div>
            <div class="ref-cell">Second step interval</div>
          </div>
          <div class="ref-row">
            <div class="ref-cell"><code>firstDayOfWeek</code></div>
            <div class="ref-cell">number</div>
            <div class="ref-cell">0 (Sun) - 6 (Sat)</div>
          </div>
          <div class="ref-row">
            <div class="ref-cell"><code>hideOtherMonths</code></div>
            <div class="ref-cell">boolean</div>
            <div class="ref-cell">Hide dates from other months</div>
          </div>
          <div class="ref-row">
            <div class="ref-cell"><code>showCalendarWeeks</code></div>
            <div class="ref-cell">boolean</div>
            <div class="ref-cell">Show week numbers</div>
          </div>
          <div class="ref-row">
            <div class="ref-cell"><code>yearOnly</code></div>
            <div class="ref-cell">boolean</div>
            <div class="ref-cell">Year selection only</div>
          </div>
          <div class="ref-row">
            <div class="ref-cell"><code>multiyearOnly</code></div>
            <div class="ref-cell">boolean</div>
            <div class="ref-cell">Multi-year selection only</div>
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
      border-left: 4px solid #673ab7;
    }

    .demo-section.highlight {
      background: linear-gradient(135deg, #f3e5f5 0%, #e1f5fe 100%);
      border-left-color: #e91e63;
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

    .hint code {
      background: #fff;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: monospace;
      color: #673ab7;
    }

    .config-display {
      margin-bottom: 1.5rem;
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .config-display h4 {
      margin-top: 0;
      color: #673ab7;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }

    .config-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .config-item {
      background: #f3e5f5;
      padding: 1rem;
      border-radius: 4px;
      text-align: center;
    }

    .config-item.total {
      background: #673ab7;
      color: white;
    }

    .config-label {
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      opacity: 0.9;
    }

    .config-value {
      font-size: 2rem;
      font-weight: bold;
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
      border-color: #673ab7;
    }

    .selected-value {
      padding: 0.75rem;
      background: #f3e5f5;
      border-radius: 4px;
      font-size: 0.9rem;
      color: #4a148c;
    }

    .week-number {
      margin-top: 0.5rem;
      padding-top: 0.5rem;
      border-top: 1px solid #ce93d8;
      font-size: 0.85rem;
    }

    .code-example {
      margin-top: 1.5rem;
      background: #263238;
      color: #aed581;
      padding: 1.5rem;
      border-radius: 8px;
      font-family: 'Courier New', monospace;
      overflow-x: auto;
    }

    .code-title {
      color: #80cbc4;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .code-example pre {
      margin: 0;
    }

    .code-example code {
      font-size: 0.85rem;
      line-height: 1.6;
    }

    .feature-list {
      margin-top: 1rem;
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
    }

    .feature-list h4 {
      margin-top: 0;
      color: #333;
      margin-bottom: 1rem;
    }

    .feature-list ul {
      margin: 0;
      padding-left: 1.5rem;
      column-count: 2;
      column-gap: 2rem;
    }

    @media (max-width: 768px) {
      .feature-list ul {
        column-count: 1;
      }
    }

    .feature-list li {
      color: #555;
      margin-bottom: 0.5rem;
    }

    .reference-table {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .ref-header,
    .ref-row {
      display: grid;
      grid-template-columns: 200px 120px 1fr;
      border-bottom: 1px solid #e0e0e0;
    }

    .ref-header {
      background: #673ab7;
      color: white;
      font-weight: 600;
    }

    .ref-row:last-child {
      border-bottom: none;
    }

    .ref-row:nth-child(even) {
      background: #f5f5f5;
    }

    .ref-cell {
      padding: 1rem;
      border-right: 1px solid #e0e0e0;
    }

    .ref-cell:last-child {
      border-right: none;
    }

    .ref-header .ref-cell {
      border-right-color: rgba(255,255,255,0.3);
    }

    .ref-cell code {
      background: #f3e5f5;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: monospace;
      color: #673ab7;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .ref-header,
      .ref-row {
        grid-template-columns: 1fr;
      }

      .ref-cell {
        border-right: none;
        border-bottom: 1px solid #e0e0e0;
      }

      .ref-cell:last-child {
        border-bottom: none;
      }
    }
  `]
})
export class CustomOptionsComponent {
  DateView = DateView;

  multiYearDate = signal<Date | null>(null);
  weeksDate = signal<Date | null>(null);
  yearOnly = signal<Date | null>(null);
  multiYearOnly = signal<Date | null>(null);
  combinedDate = signal<Date | null>(null);

  minDate = signal<Date>(new Date());
  maxDate = signal<Date>(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000));

  // Filter for weekdays only
  weekdayFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day >= 1 && day <= 5;
  };

  getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }
}
