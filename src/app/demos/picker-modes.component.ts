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
 * Picker Modes Demo
 * Demonstrates different picker modes: popup, dialog, and inline
 */
@Component({
  selector: 'app-picker-modes',
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
      <h2>Picker Modes</h2>
      <p class="description">Choose how your picker is displayed: popup, dialog, or inline.</p>

      <!-- Popup Mode (Default) -->
      <section class="demo-section">
        <h3>🎈 Popup Mode (Default)</h3>
        <p class="hint">Opens in a small overlay attached to the input field</p>
        <div class="input-group">
          <label for="popup">Popup picker:</label>
          <input
            id="popup"
            [(ngModel)]="popupDate"
            [owlDateTime]="dt1"
            [owlDateTimeTrigger]="dt1"
            placeholder="Click to open popup">
          <owl-date-time
            #dt1
            [pickerMode]="'popup'">
          </owl-date-time>
          @if (popupDate()) {
            <div class="selected-value">
              Selected: <strong>{{ popupDate() | date:'full' }}</strong>
            </div>
          }
        </div>
        <div class="mode-info">
          <div class="info-title">✨ Best for:</div>
          <ul>
            <li>Form inputs</li>
            <li>Compact layouts</li>
            <li>Desktop applications</li>
          </ul>
        </div>
      </section>

      <!-- Dialog Mode -->
      <section class="demo-section">
        <h3>💬 Dialog Mode</h3>
        <p class="hint">Opens in a centered modal dialog with backdrop</p>
        <div class="input-group">
          <label for="dialog">Dialog picker:</label>
          <input
            id="dialog"
            [(ngModel)]="dialogDate"
            [owlDateTime]="dt2"
            [owlDateTimeTrigger]="dt2"
            placeholder="Click to open dialog">
          <owl-date-time
            #dt2
            [pickerMode]="'dialog'">
          </owl-date-time>
          @if (dialogDate()) {
            <div class="selected-value">
              Selected: <strong>{{ dialogDate() | date:'full' }}</strong>
            </div>
          }
        </div>
        <div class="mode-info">
          <div class="info-title">✨ Best for:</div>
          <ul>
            <li>Mobile devices</li>
            <li>Full-screen experience</li>
            <li>Important date selections</li>
          </ul>
        </div>
      </section>

      <!-- Inline Mode -->
      <section class="demo-section">
        <h3>📌 Inline Mode</h3>
        <p class="hint">Always visible, embedded directly in the page</p>
        <div class="inline-layout">
          <div class="inline-picker">
            <owl-date-time-inline
              [(ngModel)]="inlineDate"
              [pickerType]="'both'">
            </owl-date-time-inline>
          </div>
          <div class="inline-result">
            <h4>Current Selection</h4>
            @if (inlineDate()) {
              <div class="result-content">
                <div class="result-item">
                  <span class="label">Date:</span>
                  <span class="value">{{ inlineDate() | date:'fullDate' }}</span>
                </div>
                <div class="result-item">
                  <span class="label">Time:</span>
                  <span class="value">{{ inlineDate() | date:'longTime' }}</span>
                </div>
                <div class="result-item full">
                  <span class="label">ISO:</span>
                  <span class="value">{{ inlineDate().toISOString() }}</span>
                </div>
              </div>
            } @else {
              <p class="no-selection">No date selected</p>
            }
          </div>
        </div>
        <div class="mode-info">
          <div class="info-title">✨ Best for:</div>
          <ul>
            <li>Dashboards</li>
            <li>Always-on date selection</li>
            <li>Scheduling interfaces</li>
          </ul>
        </div>
      </section>

      <!-- Custom Backdrop & Panel Classes -->
      <section class="demo-section">
        <h3>🎨 Custom Styling with Classes</h3>
        <p class="hint">Custom backdrop and panel classes for unique styling</p>
        <div class="input-group">
          <label for="custom-style">Styled picker:</label>
          <input
            id="custom-style"
            [(ngModel)]="styledDate"
            [owlDateTime]="dt3"
            [owlDateTimeTrigger]="dt3"
            placeholder="Click to see custom styling">
          <owl-date-time
            #dt3
            [backdropClass]="['custom-backdrop']"
            [panelClass]="['custom-panel']">
          </owl-date-time>
          @if (styledDate()) {
            <div class="selected-value">
              Selected: <strong>{{ styledDate() | date:'full' }}</strong>
            </div>
          }
        </div>
        <div class="code-snippet">
          <div class="code-title">Example:</div>
          <pre><code>[backdropClass]="['custom-backdrop']"
[panelClass]="['custom-panel']"</code></pre>
        </div>
      </section>

      <!-- Comparison Table -->
      <section class="demo-section">
        <h3>📊 Mode Comparison</h3>
        <div class="comparison-table">
          <div class="comparison-header">
            <div class="cell">Feature</div>
            <div class="cell">Popup</div>
            <div class="cell">Dialog</div>
            <div class="cell">Inline</div>
          </div>
          <div class="comparison-row">
            <div class="cell"><strong>Visibility</strong></div>
            <div class="cell">On Click</div>
            <div class="cell">On Click</div>
            <div class="cell">Always</div>
          </div>
          <div class="comparison-row">
            <div class="cell"><strong>Position</strong></div>
            <div class="cell">Attached to Input</div>
            <div class="cell">Center of Screen</div>
            <div class="cell">In Document Flow</div>
          </div>
          <div class="comparison-row">
            <div class="cell"><strong>Backdrop</strong></div>
            <div class="cell">Transparent</div>
            <div class="cell">Dark Overlay</div>
            <div class="cell">None</div>
          </div>
          <div class="comparison-row">
            <div class="cell"><strong>Mobile Friendly</strong></div>
            <div class="cell">Good</div>
            <div class="cell">Excellent</div>
            <div class="cell">Good</div>
          </div>
          <div class="comparison-row">
            <div class="cell"><strong>Use Case</strong></div>
            <div class="cell">Forms</div>
            <div class="cell">Mobile Apps</div>
            <div class="cell">Dashboards</div>
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
      border-left: 4px solid #00bcd4;
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

    .selected-value {
      padding: 0.75rem;
      background: #e0f7fa;
      border-radius: 4px;
      font-size: 0.9rem;
      color: #006064;
    }

    .mode-info {
      margin-top: 1rem;
      padding: 1rem;
      background: white;
      border-radius: 4px;
      border: 1px solid #ddd;
    }

    .info-title {
      font-weight: 600;
      color: #00bcd4;
      margin-bottom: 0.5rem;
    }

    .mode-info ul {
      margin: 0;
      padding-left: 1.5rem;
    }

    .mode-info li {
      color: #555;
      margin-bottom: 0.25rem;
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
      border-bottom: 2px solid #00bcd4;
      margin-bottom: 1rem;
    }

    .result-content {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .result-item {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem;
      background: #e0f7fa;
      border-radius: 4px;
    }

    .result-item.full {
      flex-direction: column;
      gap: 0.5rem;
    }

    .result-item .label {
      font-weight: 600;
      color: #00838f;
    }

    .result-item .value {
      color: #333;
      word-break: break-all;
    }

    .no-selection {
      color: #999;
      font-style: italic;
      text-align: center;
      padding: 2rem;
    }

    .code-snippet {
      margin-top: 1rem;
      background: #263238;
      color: #aed581;
      padding: 1rem;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
    }

    .code-title {
      color: #80cbc4;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    .code-snippet pre {
      margin: 0;
    }

    .code-snippet code {
      font-size: 0.9rem;
      line-height: 1.5;
    }

    .comparison-table {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .comparison-header,
    .comparison-row {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1fr;
      border-bottom: 1px solid #e0e0e0;
    }

    .comparison-header {
      background: #00bcd4;
      color: white;
      font-weight: 600;
    }

    .comparison-row:last-child {
      border-bottom: none;
    }

    .comparison-row:nth-child(even) {
      background: #f5f5f5;
    }

    .cell {
      padding: 1rem;
      border-right: 1px solid #e0e0e0;
    }

    .cell:last-child {
      border-right: none;
    }

    .comparison-header .cell {
      border-right-color: rgba(255,255,255,0.3);
    }

    @media (max-width: 768px) {
      .comparison-header,
      .comparison-row {
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
export class PickerModesComponent {
  popupDate = signal<Date | null>(null);
  dialogDate = signal<Date | null>(null);
  inlineDate = signal<Date | null>(null);
  styledDate = signal<Date | null>(null);
}
