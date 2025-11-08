import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
  OwlDateTimeComponent,
  OwlDateTimeTriggerDirective,
  OwlDateTimeInputDirective
} from '../../../projects/picker/src/public_api';

/**
 * Date Adapters Demo
 * Demonstrates different date adapters and custom format configurations
 */
@Component({
  selector: 'app-adapters',
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
      <h2>Date Adapters & Formats</h2>
      <p class="description">Work with different date implementations and custom formats.</p>

      <!-- Native Date Adapter -->
      <section class="demo-section">
        <h3>📅 Native Date Adapter (Default)</h3>
        <p class="hint">Uses JavaScript's native Date object - recommended for most applications</p>
        <div class="input-group">
          <label for="native-date">Select date using Native Date:</label>
          <input
            id="native-date"
            [(ngModel)]="nativeDate"
            [owlDateTime]="dt1"
            [owlDateTimeTrigger]="dt1"
            placeholder="Choose date">
          <owl-date-time #dt1></owl-date-time>
          @if (nativeDate()) {
            <div class="result-card">
              <h4>Native Date Object Details</h4>
              <div class="detail-grid">
                <div class="detail-item">
                  <span class="detail-label">Full Date:</span>
                  <span class="detail-value">{{ nativeDate() | date:'full' }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">ISO String:</span>
                  <span class="detail-value">{{ nativeDate()?.toISOString() }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Timestamp:</span>
                  <span class="detail-value">{{ nativeDate()?.getTime() }} ms</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Type:</span>
                  <span class="detail-value code-badge">Date</span>
                </div>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Unix Timestamp Adapter -->
      <section class="demo-section">
        <h3>⏱️ Unix Timestamp Adapter</h3>
        <p class="hint">Works with Unix timestamps (milliseconds since epoch) - useful for APIs</p>
        <div class="info-box">
          <strong>⚠️ Configuration Note:</strong> To use Unix Timestamp adapter, configure in <code>main.ts</code>:
          <pre><code>import &#123; provideOwlUnixTimestampDateTime &#125; from '&#64;danielmoncada/angular-datetime-picker';

bootstrapApplication(AppComponent, &#123;
  providers: [
    provideOwlDateTime(),
    provideOwlUnixTimestampDateTime(), // Instead of provideOwlNativeDateTime()
  ]
&#125;);</code></pre>
        </div>
        <div class="input-group">
          <label for="timestamp">Unix timestamp example:</label>
          <input
            id="timestamp"
            [(ngModel)]="timestampValue"
            [owlDateTime]="dt2"
            [owlDateTimeTrigger]="dt2"
            placeholder="Choose date">
          <owl-date-time #dt2></owl-date-time>
          @if (timestampValue()) {
            <div class="result-card">
              <h4>Timestamp Details</h4>
              <div class="detail-grid">
                <div class="detail-item">
                  <span class="detail-label">Timestamp:</span>
                  <span class="detail-value">{{ timestampValue()?.getTime() }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Date:</span>
                  <span class="detail-value">{{ timestampValue() | date:'full' }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Seconds:</span>
                  <span class="detail-value">{{ (timestampValue()?.getTime() || 0) / 1000 }}</span>
                </div>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Custom Format Configuration -->
      <section class="demo-section">
        <h3>🎨 Custom Date Formats</h3>
        <p class="hint">Override default formats for display and parsing</p>
        <div class="info-box">
          <strong>Custom Format Configuration:</strong>
          <pre><code>import &#123;
  provideOwlNativeDateTimeWithFormats,
  OwlDateTimeFormats
&#125; from '&#64;danielmoncada/angular-datetime-picker';

const customFormats: OwlDateTimeFormats = &#123;
  parseInput: 'DD/MM/YYYY HH:mm',
  fullPickerInput: 'DD/MM/YYYY HH:mm:ss',
  datePickerInput: 'DD/MM/YYYY',
  timePickerInput: 'HH:mm:ss',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY'
&#125;;

bootstrapApplication(AppComponent, &#123;
  providers: [
    provideOwlDateTime(),
    provideOwlNativeDateTimeWithFormats(customFormats)
  ]
&#125;);</code></pre>
        </div>
      </section>

      <!-- Format Comparison -->
      <section class="demo-section">
        <h3>🔍 Format Comparison</h3>
        <p class="hint">See how the same date appears in different formats</p>
        <div class="input-group">
          <label for="format-test">Select a date to see different formats:</label>
          <input
            id="format-test"
            [(ngModel)]="formatTestDate"
            [owlDateTime]="dt3"
            [owlDateTimeTrigger]="dt3"
            placeholder="Choose date">
          <owl-date-time #dt3 [pickerType]="'both'" [showSecondsTimer]="true"></owl-date-time>
        </div>
        @if (formatTestDate()) {
          <div class="format-comparison">
            <div class="format-group">
              <h4>Standard Angular Formats</h4>
              <div class="format-card">
                <span class="format-name">short:</span>
                <span class="format-result">{{ formatTestDate() | date:'short' }}</span>
              </div>
              <div class="format-card">
                <span class="format-name">medium:</span>
                <span class="format-result">{{ formatTestDate() | date:'medium' }}</span>
              </div>
              <div class="format-card">
                <span class="format-name">long:</span>
                <span class="format-result">{{ formatTestDate() | date:'long' }}</span>
              </div>
              <div class="format-card">
                <span class="format-name">full:</span>
                <span class="format-result">{{ formatTestDate() | date:'full' }}</span>
              </div>
            </div>

            <div class="format-group">
              <h4>Custom Patterns</h4>
              <div class="format-card">
                <span class="format-name">dd/MM/yyyy:</span>
                <span class="format-result">{{ formatTestDate() | date:'dd/MM/yyyy' }}</span>
              </div>
              <div class="format-card">
                <span class="format-name">MM-dd-yyyy HH:mm:</span>
                <span class="format-result">{{ formatTestDate() | date:'MM-dd-yyyy HH:mm' }}</span>
              </div>
              <div class="format-card">
                <span class="format-name">EEEE, MMMM d, y:</span>
                <span class="format-result">{{ formatTestDate() | date:'EEEE, MMMM d, y' }}</span>
              </div>
              <div class="format-card">
                <span class="format-name">HH:mm:ss:</span>
                <span class="format-result">{{ formatTestDate() | date:'HH:mm:ss' }}</span>
              </div>
              <div class="format-card">
                <span class="format-name">h:mm a:</span>
                <span class="format-result">{{ formatTestDate() | date:'h:mm a' }}</span>
              </div>
            </div>

            <div class="format-group">
              <h4>Technical Formats</h4>
              <div class="format-card">
                <span class="format-name">ISO 8601:</span>
                <span class="format-result code-text">{{ formatTestDate()?.toISOString() }}</span>
              </div>
              <div class="format-card">
                <span class="format-name">Unix Timestamp:</span>
                <span class="format-result code-text">{{ formatTestDate()?.getTime() }}</span>
              </div>
              <div class="format-card">
                <span class="format-name">UTC String:</span>
                <span class="format-result code-text">{{ formatTestDate()?.toUTCString() }}</span>
              </div>
            </div>
          </div>
        }
      </section>

      <!-- Side-by-Side Comparison -->
      <section class="demo-section">
        <h3>⚖️ Adapter Comparison</h3>
        <div class="comparison-table">
          <div class="table-header">
            <div class="table-cell">Feature</div>
            <div class="table-cell">Native Date</div>
            <div class="table-cell">Unix Timestamp</div>
          </div>
          <div class="table-row">
            <div class="table-cell"><strong>Data Type</strong></div>
            <div class="table-cell">JavaScript Date object</div>
            <div class="table-cell">Number (milliseconds)</div>
          </div>
          <div class="table-row">
            <div class="table-cell"><strong>Import</strong></div>
            <div class="table-cell"><code>provideOwlNativeDateTime()</code></div>
            <div class="table-cell"><code>provideOwlUnixTimestampDateTime()</code></div>
          </div>
          <div class="table-row">
            <div class="table-cell"><strong>Best For</strong></div>
            <div class="table-cell">General use, UI display</div>
            <div class="table-cell">APIs, databases, storage</div>
          </div>
          <div class="table-row">
            <div class="table-cell"><strong>Timezone Support</strong></div>
            <div class="table-cell">Built-in timezone info</div>
            <div class="table-cell">UTC only (timestamp)</div>
          </div>
          <div class="table-row">
            <div class="table-cell"><strong>Storage Size</strong></div>
            <div class="table-cell">~8 bytes</div>
            <div class="table-cell">8 bytes (number)</div>
          </div>
          <div class="table-row">
            <div class="table-cell"><strong>JSON Serialization</strong></div>
            <div class="table-cell">ISO string</div>
            <div class="table-cell">Number</div>
          </div>
          <div class="table-row">
            <div class="table-cell"><strong>Performance</strong></div>
            <div class="table-cell">Standard</div>
            <div class="table-cell">Slightly faster</div>
          </div>
          <div class="table-row">
            <div class="table-cell"><strong>Custom Formats</strong></div>
            <div class="table-cell">✅ Full support</div>
            <div class="table-cell">✅ Full support</div>
          </div>
        </div>
      </section>

      <!-- Available Format Tokens -->
      <section class="demo-section">
        <h3>📖 Format Token Reference</h3>
        <div class="token-grid">
          <div class="token-category">
            <h4>Date Tokens</h4>
            <div class="token-list">
              <div class="token-item">
                <code>d</code>
                <span>Day (1-31)</span>
              </div>
              <div class="token-item">
                <code>dd</code>
                <span>Day (01-31)</span>
              </div>
              <div class="token-item">
                <code>E</code>
                <span>Day of week (Mon)</span>
              </div>
              <div class="token-item">
                <code>EEEE</code>
                <span>Day of week (Monday)</span>
              </div>
              <div class="token-item">
                <code>M</code>
                <span>Month (1-12)</span>
              </div>
              <div class="token-item">
                <code>MM</code>
                <span>Month (01-12)</span>
              </div>
              <div class="token-item">
                <code>MMM</code>
                <span>Month (Jan)</span>
              </div>
              <div class="token-item">
                <code>MMMM</code>
                <span>Month (January)</span>
              </div>
              <div class="token-item">
                <code>y</code>
                <span>Year (2024)</span>
              </div>
              <div class="token-item">
                <code>yy</code>
                <span>Year (24)</span>
              </div>
            </div>
          </div>

          <div class="token-category">
            <h4>Time Tokens</h4>
            <div class="token-list">
              <div class="token-item">
                <code>H</code>
                <span>Hour 24h (0-23)</span>
              </div>
              <div class="token-item">
                <code>HH</code>
                <span>Hour 24h (00-23)</span>
              </div>
              <div class="token-item">
                <code>h</code>
                <span>Hour 12h (1-12)</span>
              </div>
              <div class="token-item">
                <code>hh</code>
                <span>Hour 12h (01-12)</span>
              </div>
              <div class="token-item">
                <code>m</code>
                <span>Minute (0-59)</span>
              </div>
              <div class="token-item">
                <code>mm</code>
                <span>Minute (00-59)</span>
              </div>
              <div class="token-item">
                <code>s</code>
                <span>Second (0-59)</span>
              </div>
              <div class="token-item">
                <code>ss</code>
                <span>Second (00-59)</span>
              </div>
              <div class="token-item">
                <code>a</code>
                <span>AM/PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Configuration Examples -->
      <section class="demo-section">
        <h3>💡 Configuration Examples</h3>

        <div class="config-example">
          <h4>Example 1: European Date Format (DD/MM/YYYY)</h4>
          <pre><code>const europeanFormats: OwlDateTimeFormats = &#123;
  parseInput: 'DD/MM/YYYY HH:mm',
  fullPickerInput: 'DD/MM/YYYY HH:mm:ss',
  datePickerInput: 'DD/MM/YYYY',
  timePickerInput: 'HH:mm',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY'
&#125;;

provideOwlNativeDateTimeWithFormats(europeanFormats)</code></pre>
        </div>

        <div class="config-example">
          <h4>Example 2: US Date Format (MM/DD/YYYY)</h4>
          <pre><code>const usFormats: OwlDateTimeFormats = &#123;
  parseInput: 'MM/DD/YYYY h:mm a',
  fullPickerInput: 'MM/DD/YYYY h:mm:ss a',
  datePickerInput: 'MM/DD/YYYY',
  timePickerInput: 'h:mm a',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY'
&#125;;

provideOwlNativeDateTimeWithFormats(usFormats)</code></pre>
        </div>

        <div class="config-example">
          <h4>Example 3: ISO 8601 Format</h4>
          <pre><code>const isoFormats: OwlDateTimeFormats = &#123;
  parseInput: 'YYYY-MM-DD HH:mm',
  fullPickerInput: 'YYYY-MM-DDTHH:mm:ss',
  datePickerInput: 'YYYY-MM-DD',
  timePickerInput: 'HH:mm:ss',
  monthYearLabel: 'YYYY MMM',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY'
&#125;;

provideOwlNativeDateTimeWithFormats(isoFormats)</code></pre>
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
      margin-bottom: 2.5rem;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #00bcd4;
    }

    h3 {
      margin-top: 0;
      color: #333;
      font-size: 1.3rem;
    }

    h4 {
      color: #555;
      font-size: 1.1rem;
      margin-top: 1rem;
      margin-bottom: 0.75rem;
    }

    .hint {
      color: #666;
      font-size: 0.9rem;
      font-style: italic;
      margin-bottom: 1rem;
      padding: 0.5rem;
      background: #fff;
      border-left: 3px solid #00bcd4;
      border-radius: 2px;
    }

    .info-box {
      background: #e1f5fe;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      border-left: 4px solid #0288d1;
    }

    .info-box strong {
      color: #01579b;
      display: block;
      margin-bottom: 0.5rem;
    }

    .info-box pre {
      margin: 0.5rem 0 0 0;
      background: #263238;
      color: #aed581;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
    }

    .info-box code {
      font-family: 'Courier New', monospace;
      font-size: 0.85rem;
      line-height: 1.6;
    }

    code {
      background: #e3f2fd;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      color: #0277bd;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
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
      border-color: #00bcd4;
    }

    .result-card {
      background: white;
      padding: 1.25rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-top: 1rem;
    }

    .result-card h4 {
      margin: 0 0 1rem 0;
      color: #00bcd4;
      font-size: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #00bcd4;
    }

    .detail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .detail-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #666;
      text-transform: uppercase;
    }

    .detail-value {
      color: #333;
      word-break: break-all;
    }

    .code-badge {
      display: inline-block;
      background: #00bcd4;
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.85rem;
      font-weight: 600;
    }

    .format-comparison {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 1rem;
    }

    .format-group {
      background: white;
      padding: 1.25rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .format-group h4 {
      margin: 0 0 1rem 0;
      color: #00bcd4;
      font-size: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #00bcd4;
    }

    .format-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      margin-bottom: 0.5rem;
      background: #f5f5f5;
      border-radius: 4px;
      gap: 1rem;
    }

    .format-card:last-child {
      margin-bottom: 0;
    }

    .format-name {
      font-weight: 600;
      color: #555;
      font-family: 'Courier New', monospace;
      white-space: nowrap;
    }

    .format-result {
      color: #333;
      text-align: right;
      word-break: break-word;
    }

    .code-text {
      font-family: 'Courier New', monospace;
      font-size: 0.85rem;
      color: #0277bd;
    }

    .comparison-table {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .table-header {
      display: grid;
      grid-template-columns: 200px 1fr 1fr;
      background: #00bcd4;
      color: white;
      font-weight: 600;
    }

    .table-row {
      display: grid;
      grid-template-columns: 200px 1fr 1fr;
      border-bottom: 1px solid #e0e0e0;
    }

    .table-row:last-child {
      border-bottom: none;
    }

    .table-row:nth-child(even) {
      background: #f5f5f5;
    }

    .table-cell {
      padding: 1rem;
      border-right: 1px solid #e0e0e0;
    }

    .table-cell:last-child {
      border-right: none;
    }

    .table-header .table-cell {
      border-right-color: rgba(255, 255, 255, 0.3);
    }

    @media (max-width: 768px) {
      .table-header,
      .table-row {
        grid-template-columns: 1fr;
      }

      .table-cell {
        border-right: none;
        border-bottom: 1px solid #e0e0e0;
      }

      .table-cell:last-child {
        border-bottom: none;
      }
    }

    .token-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .token-category {
      background: white;
      padding: 1.25rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .token-category h4 {
      margin: 0 0 1rem 0;
      color: #00bcd4;
      font-size: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #00bcd4;
    }

    .token-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .token-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      background: #f5f5f5;
      border-radius: 4px;
    }

    .token-item code {
      background: #00bcd4;
      color: white;
      font-weight: 600;
      padding: 0.25rem 0.5rem;
    }

    .token-item span {
      color: #666;
      font-size: 0.9rem;
    }

    .config-example {
      background: white;
      padding: 1.25rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .config-example h4 {
      margin: 0 0 0.75rem 0;
      color: #00bcd4;
      font-size: 1rem;
    }

    .config-example pre {
      margin: 0;
      background: #263238;
      color: #aed581;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
    }

    .config-example code {
      font-family: 'Courier New', monospace;
      font-size: 0.85rem;
      line-height: 1.6;
      color: #aed581;
      background: transparent;
    }
  `]
})
export class AdaptersComponent {
  nativeDate = signal<Date | null>(null);
  timestampValue = signal<Date | null>(null);
  formatTestDate = signal<Date | null>(new Date());
}
