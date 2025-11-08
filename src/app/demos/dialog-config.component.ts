import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
  OwlDateTimeComponent,
  OwlDateTimeTriggerDirective,
  OwlDateTimeInputDirective
} from '../../../projects/picker/src/public_api';

/**
 * Dialog Configuration Demo
 * Demonstrates dialog modes, scroll strategies, and custom styling
 */
@Component({
  selector: 'app-dialog-config',
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
      <h2>Dialog Configuration</h2>
      <p class="description">Dialog modes, scroll strategies, backdrop styling, and custom classes.</p>

      <!-- Popup vs Dialog Mode -->
      <section class="demo-section">
        <h3>📱 Picker Modes: Popup vs Dialog</h3>
        <div class="mode-comparison">
          <div class="mode-card">
            <h4>🔹 Popup Mode (Default)</h4>
            <p class="mode-description">Attaches to the input field and positions itself nearby</p>
            <ul class="feature-list">
              <li>Positioned relative to input</li>
              <li>Transparent backdrop</li>
              <li>Best for desktop forms</li>
              <li>Auto-positioning</li>
            </ul>
            <div class="input-group">
              <label for="popup">Try Popup Mode:</label>
              <input
                id="popup"
                [(ngModel)]="popupDate"
                [owlDateTime]="dt1"
                [owlDateTimeTrigger]="dt1"
                placeholder="Choose date">
              <owl-date-time #dt1 [pickerMode]="'popup'"></owl-date-time>
              @if (popupDate()) {
                <div class="selected-value">
                  {{ popupDate() | date:'full' }}
                </div>
              }
            </div>
          </div>

          <div class="mode-card">
            <h4>🔹 Dialog Mode</h4>
            <p class="mode-description">Centers in viewport with dark backdrop overlay</p>
            <ul class="feature-list">
              <li>Centered on screen</li>
              <li>Dark backdrop overlay</li>
              <li>Best for mobile apps</li>
              <li>Modal experience</li>
            </ul>
            <div class="input-group">
              <label for="dialog">Try Dialog Mode:</label>
              <input
                id="dialog"
                [(ngModel)]="dialogDate"
                [owlDateTime]="dt2"
                [owlDateTimeTrigger]="dt2"
                placeholder="Choose date">
              <owl-date-time #dt2 [pickerMode]="'dialog'"></owl-date-time>
              @if (dialogDate()) {
                <div class="selected-value">
                  {{ dialogDate() | date:'full' }}
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- Scroll Strategy Configuration -->
      <section class="demo-section">
        <h3>📜 Scroll Strategy Configuration</h3>
        <p class="hint">Control how the picker behaves when the page is scrolled</p>

        <div class="info-box">
          <strong>OWL_DIALOG_SCROLL_STRATEGY_PROVIDER</strong>
          <p>The scroll strategy determines what happens when the user scrolls while the picker is open:</p>
          <ul>
            <li><code>block</code> - Prevents scrolling (default)</li>
            <li><code>reposition</code> - Repositions picker on scroll</li>
            <li><code>close</code> - Closes picker on scroll</li>
            <li><code>noop</code> - Does nothing</li>
          </ul>
        </div>

        <div class="config-card">
          <h4>Configuration in main.ts</h4>
          <pre><code>import &#123;
  provideOwlDateTime,
  OWL_DIALOG_SCROLL_STRATEGY_PROVIDER
&#125; from '&#64;danielmoncada/angular-datetime-picker';
import &#123; Overlay, ScrollStrategy &#125; from '&#64;angular/cdk/overlay';

// Default configuration (already included in provideOwlDateTime)
bootstrapApplication(AppComponent, &#123;
  providers: [
    provideOwlDateTime(), // Includes scroll strategy provider
    provideOwlNativeDateTime()
  ]
&#125;);

// Custom scroll strategy
export function scrollStrategyFactory(overlay: Overlay): () => ScrollStrategy &#123;
  return () => overlay.scrollStrategies.close(); // Close on scroll
&#125;

bootstrapApplication(AppComponent, &#123;
  providers: [
    provideOwlDateTime(),
    provideOwlNativeDateTime(),
    &#123;
      provide: OWL_DIALOG_SCROLL_STRATEGY_PROVIDER,
      useFactory: scrollStrategyFactory,
      deps: [Overlay]
    &#125;
  ]
&#125;);</code></pre>
        </div>

        <div class="strategy-grid">
          <div class="strategy-card">
            <div class="strategy-header">
              <span class="strategy-icon">🚫</span>
              <h5>Block Strategy</h5>
            </div>
            <p>Prevents page scrolling while picker is open</p>
            <code>overlay.scrollStrategies.block()</code>
          </div>

          <div class="strategy-card">
            <div class="strategy-header">
              <span class="strategy-icon">🔄</span>
              <h5>Reposition Strategy</h5>
            </div>
            <p>Automatically repositions picker on scroll</p>
            <code>overlay.scrollStrategies.reposition()</code>
          </div>

          <div class="strategy-card">
            <div class="strategy-header">
              <span class="strategy-icon">❌</span>
              <h5>Close Strategy</h5>
            </div>
            <p>Closes picker when user scrolls</p>
            <code>overlay.scrollStrategies.close()</code>
          </div>

          <div class="strategy-card">
            <div class="strategy-header">
              <span class="strategy-icon">⭕</span>
              <h5>Noop Strategy</h5>
            </div>
            <p>Does nothing - picker stays in place</p>
            <code>overlay.scrollStrategies.noop()</code>
          </div>
        </div>
      </section>

      <!-- Custom Backdrop Classes -->
      <section class="demo-section">
        <h3>🎨 Custom Backdrop Styling</h3>
        <p class="hint">Apply custom CSS classes to the backdrop overlay</p>

        <div class="input-group">
          <label for="custom-backdrop">Picker with custom backdrop:</label>
          <input
            id="custom-backdrop"
            [(ngModel)]="customBackdropDate"
            [owlDateTime]="dt3"
            [owlDateTimeTrigger]="dt3"
            placeholder="Choose date">
          <owl-date-time
            #dt3
            [pickerMode]="'dialog'"
            [backdropClass]="['custom-backdrop-demo']">
          </owl-date-time>
          @if (customBackdropDate()) {
            <div class="selected-value">
              {{ customBackdropDate() | date:'full' }}
            </div>
          }
        </div>

        <div class="config-card">
          <h4>Backdrop Class Configuration</h4>
          <pre><code>// In component template
&lt;owl-date-time
  #dt1
  [pickerMode]="'dialog'"
  [backdropClass]="['custom-backdrop', 'blur-effect']"&gt;
&lt;/owl-date-time&gt;

// In styles.scss or component styles
.custom-backdrop &#123;
  background-color: rgba(63, 81, 181, 0.8) !important;
  backdrop-filter: blur(8px);
&#125;

.blur-effect &#123;
  animation: fadeIn 0.3s ease;
&#125;

&#64;keyframes fadeIn &#123;
  from &#123; opacity: 0; &#125;
  to &#123; opacity: 1; &#125;
&#125;</code></pre>
        </div>
      </section>

      <!-- Custom Panel Classes -->
      <section class="demo-section">
        <h3>🎭 Custom Panel Styling</h3>
        <p class="hint">Apply custom CSS classes to the picker panel</p>

        <div class="input-group">
          <label for="custom-panel">Picker with custom panel styling:</label>
          <input
            id="custom-panel"
            [(ngModel)]="customPanelDate"
            [owlDateTime]="dt4"
            [owlDateTimeTrigger]="dt4"
            placeholder="Choose date">
          <owl-date-time
            #dt4
            [pickerMode]="'dialog'"
            [panelClass]="['custom-panel-demo']">
          </owl-date-time>
          @if (customPanelDate()) {
            <div class="selected-value">
              {{ customPanelDate() | date:'full' }}
            </div>
          }
        </div>

        <div class="config-card">
          <h4>Panel Class Configuration</h4>
          <pre><code>// In component template
&lt;owl-date-time
  #dt1
  [panelClass]="['custom-panel', 'rounded-panel']"&gt;
&lt;/owl-date-time&gt;

// In styles.scss (must be in global styles)
.custom-panel &#123;
  border-radius: 16px !important;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3) !important;
  border: 2px solid #673ab7 !important;
&#125;

.custom-panel .owl-dt-container &#123;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
&#125;</code></pre>
        </div>
      </section>

      <!-- Combined Configuration -->
      <section class="demo-section">
        <h3>🎯 Combined Configuration</h3>
        <p class="hint">Dialog mode + custom backdrop + custom panel + time picker</p>

        <div class="input-group">
          <label for="combined">Full custom dialog:</label>
          <input
            id="combined"
            [(ngModel)]="combinedDate"
            [owlDateTime]="dt5"
            [owlDateTimeTrigger]="dt5"
            placeholder="Choose date and time">
          <owl-date-time
            #dt5
            [pickerType]="'both'"
            [pickerMode]="'dialog'"
            [hour12Timer]="true"
            [backdropClass]="['custom-backdrop-demo']"
            [panelClass]="['custom-panel-demo']">
          </owl-date-time>
          @if (combinedDate()) {
            <div class="selected-value highlight">
              <strong>Selected:</strong> {{ combinedDate() | date:'full' }}
            </div>
          }
        </div>

        <div class="config-card">
          <h4>Complete Example</h4>
          <pre><code>// Component Template
&lt;input
  [(ngModel)]="dateValue"
  [owlDateTime]="dt1"
  [owlDateTimeTrigger]="dt1"&gt;

&lt;owl-date-time
  #dt1
  [pickerType]="'both'"
  [pickerMode]="'dialog'"
  [hour12Timer]="true"
  [backdropClass]="['custom-backdrop']"
  [panelClass]="['custom-panel']"&gt;
&lt;/owl-date-time&gt;

// Component TypeScript
import &#123; Component, signal &#125; from '&#64;angular/core';

&#64;Component(&#123;
  selector: 'app-my-component',
  standalone: true,
  imports: [
    OwlDateTimeComponent,
    OwlDateTimeTriggerDirective,
    OwlDateTimeInputDirective
  ]
&#125;)
export class MyComponent &#123;
  dateValue = signal&lt;Date | null&gt;(null);
&#125;</code></pre>
        </div>
      </section>

      <!-- Best Practices -->
      <section class="demo-section">
        <h3>💡 Best Practices</h3>
        <div class="best-practices-grid">
          <div class="practice-card">
            <div class="practice-icon">📱</div>
            <h4>Mobile Apps</h4>
            <p>Use <strong>dialog mode</strong> for better mobile experience with full-screen overlay</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🖥️</div>
            <h4>Desktop Forms</h4>
            <p>Use <strong>popup mode</strong> for forms where picker should be near the input field</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🎨</div>
            <h4>Custom Styles</h4>
            <p>Add custom classes in <strong>global styles</strong> (styles.scss) for backdrop/panel</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">📜</div>
            <h4>Scroll Strategy</h4>
            <p>Use <strong>block</strong> (default) for modals, <strong>close</strong> for better UX in long forms</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">♿</div>
            <h4>Accessibility</h4>
            <p>Ensure sufficient <strong>contrast</strong> with custom backdrop colors</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">⚡</div>
            <h4>Performance</h4>
            <p>Avoid heavy CSS animations on backdrop - use simple <strong>fade transitions</strong></p>
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
      margin-bottom: 2.5rem;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #673ab7;
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

    h5 {
      margin: 0;
      color: #333;
      font-size: 1rem;
    }

    .hint {
      color: #666;
      font-size: 0.9rem;
      font-style: italic;
      margin-bottom: 1rem;
      padding: 0.5rem;
      background: #fff;
      border-left: 3px solid #673ab7;
      border-radius: 2px;
    }

    .mode-comparison {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 1rem;
    }

    .mode-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .mode-card h4 {
      margin: 0 0 0.5rem 0;
      color: #673ab7;
      font-size: 1.1rem;
    }

    .mode-description {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .feature-list {
      margin: 0 0 1.5rem 0;
      padding-left: 1.5rem;
      color: #555;
    }

    .feature-list li {
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
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
      margin-top: 0.5rem;
    }

    .selected-value.highlight {
      background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
      font-size: 1rem;
    }

    .info-box {
      background: #ede7f6;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      border-left: 4px solid #673ab7;
    }

    .info-box strong {
      color: #4a148c;
      display: block;
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }

    .info-box p {
      margin: 0.5rem 0;
      color: #555;
    }

    .info-box ul {
      margin: 0.75rem 0 0 0;
      padding-left: 1.5rem;
      color: #555;
    }

    .info-box li {
      margin-bottom: 0.5rem;
    }

    code {
      background: #e1bee7;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      color: #4a148c;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
    }

    .config-card {
      background: white;
      padding: 1.25rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .config-card h4 {
      margin: 0 0 0.75rem 0;
      color: #673ab7;
      font-size: 1rem;
    }

    .config-card pre {
      margin: 0;
      background: #263238;
      color: #aed581;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
    }

    .config-card code {
      font-family: 'Courier New', monospace;
      font-size: 0.85rem;
      line-height: 1.6;
      color: #aed581;
      background: transparent;
    }

    .strategy-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .strategy-card {
      background: white;
      padding: 1.25rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }

    .strategy-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(103, 58, 183, 0.2);
    }

    .strategy-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid #673ab7;
    }

    .strategy-icon {
      font-size: 1.5rem;
    }

    .strategy-card p {
      margin: 0 0 0.75rem 0;
      color: #666;
      font-size: 0.9rem;
    }

    .strategy-card code {
      display: block;
      font-size: 0.8rem;
    }

    .best-practices-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .practice-card {
      background: white;
      padding: 1.25rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      text-align: center;
      transition: transform 0.2s;
    }

    .practice-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(103, 58, 183, 0.2);
    }

    .practice-icon {
      font-size: 2rem;
      margin-bottom: 0.75rem;
    }

    .practice-card h4 {
      margin: 0 0 0.5rem 0;
      color: #673ab7;
      font-size: 1rem;
    }

    .practice-card p {
      margin: 0;
      color: #666;
      font-size: 0.85rem;
      line-height: 1.5;
    }

    .practice-card strong {
      color: #4a148c;
    }

    /* Custom demo styles for this component */
    :host ::ng-deep .custom-backdrop-demo {
      background-color: rgba(103, 58, 183, 0.85) !important;
      backdrop-filter: blur(4px);
    }

    :host ::ng-deep .custom-panel-demo {
      border-radius: 12px !important;
      box-shadow: 0 8px 32px rgba(103, 58, 183, 0.3) !important;
      border: 2px solid #9575cd !important;
    }
  `]
})
export class DialogConfigComponent {
  popupDate = signal<Date | null>(null);
  dialogDate = signal<Date | null>(null);
  customBackdropDate = signal<Date | null>(null);
  customPanelDate = signal<Date | null>(null);
  combinedDate = signal<Date | null>(null);
}
