import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
  OwlDateTimeComponent,
  OwlDateTimeTriggerDirective,
  OwlDateTimeInputDirective,
  OwlDateTimeInlineComponent
} from '../../../projects/picker/src/public_api';

/**
 * Auto-Select Demo
 * Demonstrates automatic date selection without requiring "OK" button
 */
@Component({
  selector: 'app-auto-select',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    OwlDateTimeComponent,
    OwlDateTimeTriggerDirective,
    OwlDateTimeInputDirective,
    OwlDateTimeInlineComponent
  ],
  template: `
    <div class="demo-container">
      <h2>Auto-Select Behavior</h2>
      <p class="description">Select dates automatically without clicking "OK" button - just like inline mode!</p>

      <!-- Auto-Select in Popup Mode (Calendar Only) -->
      <section class="demo-section">
        <h3>⚡ Auto-Select in Popup (Calendar Only)</h3>
        <p class="hint">
          When using <code>pickerType="calendar"</code> with <code>pickerMode="popup"</code>,
          the picker automatically closes after selecting a date - no OK button needed!
        </p>
        <div class="input-group">
          <label for="auto-popup">Click to select date (auto-closes):</label>
          <input
            id="auto-popup"
            [(ngModel)]="autoPopupDate"
            [owlDateTime]="dt1"
            [owlDateTimeTrigger]="dt1"
            placeholder="Select date">
          <owl-date-time
            #dt1
            [pickerType]="'calendar'"
            [pickerMode]="'popup'">
          </owl-date-time>
          @if (autoPopupDate()) {
            <div class="selected-value">
              ✅ Auto-selected: <strong>{{ autoPopupDate() | date:'fullDate' }}</strong>
            </div>
          }
        </div>
        <div class="code-example">
          <div class="code-title">Code:</div>
          <pre><code>&lt;owl-date-time
  [pickerType]="'calendar'"
  [pickerMode]="'popup'"&gt;
&lt;/owl-date-time&gt;</code></pre>
        </div>
      </section>

      <!-- Comparison: With Time Picker (Requires OK) -->
      <section class="demo-section">
        <h3>🕐 With Time Picker (Requires OK)</h3>
        <p class="hint">
          When using <code>pickerType="both"</code>, you must click OK because
          you need to select both date and time.
        </p>
        <div class="input-group">
          <label for="with-time">Date & Time picker (requires OK):</label>
          <input
            id="with-time"
            [(ngModel)]="withTimeDate"
            [owlDateTime]="dt2"
            [owlDateTimeTrigger]="dt2"
            placeholder="Select date & time">
          <owl-date-time
            #dt2
            [pickerType]="'both'"
            [pickerMode]="'popup'">
          </owl-date-time>
          @if (withTimeDate()) {
            <div class="selected-value">
              Selected: <strong>{{ withTimeDate() | date:'medium' }}</strong>
            </div>
          }
        </div>
        <div class="code-example">
          <div class="code-title">Code:</div>
          <pre><code>&lt;owl-date-time
  [pickerType]="'both'"
  [pickerMode]="'popup'"&gt;
&lt;/owl-date-time&gt;</code></pre>
        </div>
      </section>

      <!-- Auto-Select Range -->
      <section class="demo-section">
        <h3>📅 Auto-Select Range</h3>
        <p class="hint">
          Range pickers also auto-close after selecting BOTH start and end dates
          when in popup mode with calendar-only.
        </p>
        <div class="input-group">
          <label for="auto-range">Select date range (auto-closes after both dates):</label>
          <input
            id="auto-range"
            [(ngModel)]="autoRangeDate"
            [selectMode]="'range'"
            [owlDateTime]="dt3"
            [owlDateTimeTrigger]="dt3"
            placeholder="Select range">
          <owl-date-time
            #dt3
            [pickerType]="'calendar'"
            [pickerMode]="'popup'">
          </owl-date-time>
          @if (autoRangeDate()[0] && autoRangeDate()[1]) {
            <div class="selected-value">
              ✅ From: <strong>{{ autoRangeDate()[0] | date:'shortDate' }}</strong>
              to <strong>{{ autoRangeDate()[1] | date:'shortDate' }}</strong>
            </div>
          } @else if (autoRangeDate()[0]) {
            <div class="pending-value">
              ⏳ Start: <strong>{{ autoRangeDate()[0] | date:'shortDate' }}</strong> - Select end date...
            </div>
          }
        </div>
        <div class="code-example">
          <div class="code-title">Code:</div>
          <pre><code>&lt;input
  [(ngModel)]="rangeDate"
  [selectMode]="'range'"
  [owlDateTime]="dt"&gt;
&lt;owl-date-time
  #dt
  [pickerType]="'calendar'"
  [pickerMode]="'popup'"&gt;
&lt;/owl-date-time&gt;</code></pre>
        </div>
      </section>

      <!-- Dialog Mode (Always Requires OK) -->
      <section class="demo-section">
        <h3>💬 Dialog Mode (Always Requires OK)</h3>
        <p class="hint">
          Dialog mode ALWAYS requires clicking OK, even with calendar-only picker,
          because it's a modal experience.
        </p>
        <div class="input-group">
          <label for="dialog-mode">Dialog mode (requires OK):</label>
          <input
            id="dialog-mode"
            [(ngModel)]="dialogDate"
            [owlDateTime]="dt4"
            [owlDateTimeTrigger]="dt4"
            placeholder="Select date">
          <owl-date-time
            #dt4
            [pickerType]="'calendar'"
            [pickerMode]="'dialog'">
          </owl-date-time>
          @if (dialogDate()) {
            <div class="selected-value">
              Selected: <strong>{{ dialogDate() | date:'fullDate' }}</strong>
            </div>
          }
        </div>
        <div class="code-example">
          <div class="code-title">Code:</div>
          <pre><code>&lt;owl-date-time
  [pickerType]="'calendar'"
  [pickerMode]="'dialog'"&gt;  &lt;!-- Dialog always needs OK --&gt;
&lt;/owl-date-time&gt;</code></pre>
        </div>
      </section>

      <!-- Inline Mode (Always Auto-Select) -->
      <section class="demo-section">
        <h3>📌 Inline Mode (Always Auto-Select)</h3>
        <p class="hint">
          Inline pickers ALWAYS auto-select immediately when you click a date -
          there's no popup or dialog to close!
        </p>
        <div class="inline-layout">
          <div class="inline-picker">
            <owl-date-time-inline
              [(ngModel)]="inlineDate"
              [pickerType]="'calendar'">
            </owl-date-time-inline>
          </div>
          <div class="inline-result">
            <h4>Instant Selection</h4>
            @if (inlineDate()) {
              <div class="result-content">
                <div class="result-label">Selected Date:</div>
                <div class="result-value">{{ inlineDate() | date:'fullDate' }}</div>
                <div class="result-note">✨ Updated instantly!</div>
              </div>
            } @else {
              <p class="no-selection">Click a date to see instant selection</p>
            }
          </div>
        </div>
      </section>

      <!-- Summary Table -->
      <section class="demo-section">
        <h3>📊 Auto-Select Behavior Summary</h3>
        <div class="summary-table">
          <div class="table-header">
            <div class="cell">Mode</div>
            <div class="cell">Picker Type</div>
            <div class="cell">Auto-Select?</div>
            <div class="cell">Notes</div>
          </div>
          <div class="table-row success">
            <div class="cell"><strong>Popup</strong></div>
            <div class="cell">calendar</div>
            <div class="cell">✅ Yes</div>
            <div class="cell">Closes after date selection</div>
          </div>
          <div class="table-row">
            <div class="cell"><strong>Popup</strong></div>
            <div class="cell">both / timer</div>
            <div class="cell">❌ No</div>
            <div class="cell">Needs OK to confirm time</div>
          </div>
          <div class="table-row">
            <div class="cell"><strong>Dialog</strong></div>
            <div class="cell">any</div>
            <div class="cell">❌ No</div>
            <div class="cell">Always needs OK button</div>
          </div>
          <div class="table-row success">
            <div class="cell"><strong>Inline</strong></div>
            <div class="cell">any</div>
            <div class="cell">✅ Yes</div>
            <div class="cell">Always instant selection</div>
          </div>
          <div class="table-row success">
            <div class="cell"><strong>Popup Range</strong></div>
            <div class="cell">calendar</div>
            <div class="cell">✅ Yes</div>
            <div class="cell">After selecting both dates</div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-container {
      padding: 2rem;
      max-width: 1000px;
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
      line-height: 1.5;
    }

    .hint code {
      background: #e8f5e9;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      color: #2e7d32;
      font-size: 0.85rem;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
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

    .pending-value {
      margin-top: 0.5rem;
      padding: 0.75rem;
      background: #fff3e0;
      border-radius: 4px;
      font-size: 0.9rem;
      color: #e65100;
    }

    .code-example {
      margin-top: 1rem;
      background: #263238;
      border-radius: 4px;
      overflow: hidden;
    }

    .code-title {
      background: #37474f;
      color: #80cbc4;
      padding: 0.5rem 1rem;
      font-weight: 600;
      font-size: 0.85rem;
    }

    .code-example pre {
      margin: 0;
      padding: 1rem;
    }

    .code-example code {
      color: #aed581;
      font-family: 'Courier New', monospace;
      font-size: 0.85rem;
      line-height: 1.6;
    }

    .inline-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 1rem;
    }

    @media (max-width: 768px) {
      .inline-layout {
        grid-template-columns: 1fr;
      }
    }

    .inline-picker {
      background: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .inline-result {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .inline-result h4 {
      margin-top: 0;
      color: #555;
      font-size: 1.1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #4caf50;
      margin-bottom: 1rem;
    }

    .result-content {
      text-align: center;
      padding: 1rem;
    }

    .result-label {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 0.5rem;
    }

    .result-value {
      font-size: 1.2rem;
      font-weight: 600;
      color: #2e7d32;
      margin-bottom: 0.5rem;
    }

    .result-note {
      font-size: 0.85rem;
      color: #4caf50;
      font-style: italic;
    }

    .no-selection {
      color: #999;
      font-style: italic;
      text-align: center;
      padding: 2rem;
    }

    .summary-table {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .table-header,
    .table-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 2fr;
      border-bottom: 1px solid #e0e0e0;
    }

    .table-header {
      background: #4caf50;
      color: white;
      font-weight: 600;
    }

    .table-row:last-child {
      border-bottom: none;
    }

    .table-row:nth-child(even) {
      background: #f5f5f5;
    }

    .table-row.success {
      background: #e8f5e9 !important;
    }

    .cell {
      padding: 1rem;
      border-right: 1px solid #e0e0e0;
    }

    .cell:last-child {
      border-right: none;
    }

    .table-header .cell {
      border-right-color: rgba(255,255,255,0.3);
    }

    @media (max-width: 768px) {
      .table-header,
      .table-row {
        grid-template-columns: 1fr;
      }

      .cell {
        border-right: none;
        border-bottom: 1px solid #e0e0e0;
      }

      .cell:last-child {
        border-bottom: none;
      }
    }
  `]
})
export class AutoSelectComponent {
  autoPopupDate = signal<Date | null>(null);
  withTimeDate = signal<Date | null>(null);
  autoRangeDate = signal<Date[]>([]);
  dialogDate = signal<Date | null>(null);
  inlineDate = signal<Date | null>(null);
}
