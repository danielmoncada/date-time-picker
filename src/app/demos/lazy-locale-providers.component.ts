import { Component, signal, Injectable, Input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';
import localeFr from '@angular/common/locales/fr';
import localeDe from '@angular/common/locales/de';
import localeEs from '@angular/common/locales/es';
import {
  OwlDateTimeComponent,
  OwlDateTimeTriggerDirective,
  OwlDateTimeInputDirective,
  OwlDateTimeIntl,
  OWL_DATE_TIME_LOCALE,
  owlDateTimeProviders,
  owlNativeDateTimeProviders
} from '../../../projects/picker/src/public_api';

// Register locales
registerLocaleData(localeAr, 'ar');
registerLocaleData(localeFr, 'fr');
registerLocaleData(localeDe, 'de');
registerLocaleData(localeEs, 'es');

// French Labels
@Injectable()
export class FrenchIntl extends OwlDateTimeIntl {
  override cancelBtnLabel = 'Annuler';
  override setBtnLabel = 'Valider';
  override rangeFromLabel = 'De';
  override rangeToLabel = 'À';
  override hour12AMLabel = 'AM';
  override hour12PMLabel = 'PM';
  override prevMonthLabel = 'Mois précédent';
  override nextMonthLabel = 'Mois suivant';
}

// German Labels
@Injectable()
export class GermanIntl extends OwlDateTimeIntl {
  override cancelBtnLabel = 'Abbrechen';
  override setBtnLabel = 'Bestätigen';
  override rangeFromLabel = 'Von';
  override rangeToLabel = 'Bis';
  override prevMonthLabel = 'Vorheriger Monat';
  override nextMonthLabel = 'Nächster Monat';
}

// Spanish Labels
@Injectable()
export class SpanishIntl extends OwlDateTimeIntl {
  override cancelBtnLabel = 'Cancelar';
  override setBtnLabel = 'Aceptar';
  override rangeFromLabel = 'Desde';
  override rangeToLabel = 'Hasta';
  override prevMonthLabel = 'Mes anterior';
  override nextMonthLabel = 'Mes siguiente';
}

// Arabic Labels
@Injectable()
export class ArabicIntl extends OwlDateTimeIntl {
  override cancelBtnLabel = 'إلغاء';
  override setBtnLabel = 'تعيين';
  override rangeFromLabel = 'من';
  override rangeToLabel = 'إلى';
  override hour12AMLabel = 'ص';
  override hour12PMLabel = 'م';
  override prevMonthLabel = 'الشهر السابق';
  override nextMonthLabel = 'الشهر القادم';
}

// Wrapper Components with Component-Level Providers

@Component({
  selector: 'app-french-picker',
  standalone: true,
  imports: [FormsModule, OwlDateTimeComponent, OwlDateTimeTriggerDirective, OwlDateTimeInputDirective],
  providers: [
    ...owlDateTimeProviders(),
    ...owlNativeDateTimeProviders(),
    { provide: OwlDateTimeIntl, useClass: FrenchIntl },
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'fr' }
  ],
  template: `
    <input
      [(ngModel)]="value"
      (ngModelChange)="valueChange.emit($event)"
      [owlDateTime]="dt"
      [owlDateTimeTrigger]="dt"
      [placeholder]="placeholder">
    <owl-date-time #dt></owl-date-time>
  `
})
export class FrenchPickerComponent {
  @Input() value: Date | null = null;
  @Input() placeholder = '';
  valueChange = output<Date | null>();
}

@Component({
  selector: 'app-german-picker',
  standalone: true,
  imports: [FormsModule, OwlDateTimeComponent, OwlDateTimeTriggerDirective, OwlDateTimeInputDirective],
  providers: [
    ...owlDateTimeProviders(),
    ...owlNativeDateTimeProviders(),
    { provide: OwlDateTimeIntl, useClass: GermanIntl },
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'de' }
  ],
  template: `
    <input
      [(ngModel)]="value"
      (ngModelChange)="valueChange.emit($event)"
      [owlDateTime]="dt"
      [owlDateTimeTrigger]="dt"
      [placeholder]="placeholder">
    <owl-date-time #dt></owl-date-time>
  `
})
export class GermanPickerComponent {
  @Input() value: Date | null = null;
  @Input() placeholder = '';
  valueChange = output<Date | null>();
}

@Component({
  selector: 'app-spanish-picker',
  standalone: true,
  imports: [FormsModule, OwlDateTimeComponent, OwlDateTimeTriggerDirective, OwlDateTimeInputDirective],
  providers: [
    ...owlDateTimeProviders(),
    ...owlNativeDateTimeProviders(),
    { provide: OwlDateTimeIntl, useClass: SpanishIntl },
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'es' }
  ],
  template: `
    <input
      [(ngModel)]="value"
      (ngModelChange)="valueChange.emit($event)"
      [owlDateTime]="dt"
      [owlDateTimeTrigger]="dt"
      [placeholder]="placeholder">
    <owl-date-time #dt></owl-date-time>
  `
})
export class SpanishPickerComponent {
  @Input() value: Date | null = null;
  @Input() placeholder = '';
  valueChange = output<Date | null>();
}

@Component({
  selector: 'app-arabic-picker',
  standalone: true,
  imports: [FormsModule, OwlDateTimeComponent, OwlDateTimeTriggerDirective, OwlDateTimeInputDirective],
  providers: [
    ...owlDateTimeProviders(),
    ...owlNativeDateTimeProviders(),
    { provide: OwlDateTimeIntl, useClass: ArabicIntl },
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'ar' }
  ],
  template: `
    <input
      [(ngModel)]="value"
      (ngModelChange)="valueChange.emit($event)"
      [selectMode]="selectMode"
      [owlDateTime]="dt"
      [owlDateTimeTrigger]="dt"
      [dir]="'rtl'"
      [placeholder]="placeholder">
    <owl-date-time #dt></owl-date-time>
  `
})
export class ArabicPickerComponent {
  @Input() value: Date | Date[] | null = null;
  @Input() selectMode: 'single' | 'range' = 'single';
  @Input() placeholder = '';
  valueChange = output<Date | Date[] | null>();
}

/**
 * Lazy Locale Providers Demo
 * Demonstrates providing locale configuration using wrapper components
 * Each wrapper component has its own providers - no global configuration needed!
 */
@Component({
  selector: 'app-lazy-locale-providers',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    OwlDateTimeComponent,
    OwlDateTimeTriggerDirective,
    OwlDateTimeInputDirective,
    FrenchPickerComponent,
    GermanPickerComponent,
    SpanishPickerComponent,
    ArabicPickerComponent
  ],
  template: `
    <div class="demo-container">
      <h2>Lazy Locale Providers</h2>
      <p class="description">
        Provide locale-specific configuration using wrapper components with their own providers.
        Multiple pickers can use different locales on the same page!
      </p>

      <!-- Info Banner -->
      <section class="info-banner">
        <div class="banner-icon">💡</div>
        <div class="banner-content">
          <h3>Component-Level Providers Pattern</h3>
          <p>
            Each picker below is wrapped in a component with its own locale providers.
            This Angular pattern allows you to:
          </p>
          <ul>
            <li>Isolate configuration per picker instance</li>
            <li>Use multiple locales on the same page</li>
            <li>Avoid global state and provider conflicts</li>
            <li>Create reusable locale-specific components</li>
            <li>Lazy-load locale configurations only when needed</li>
          </ul>
        </div>
      </section>

      <!-- Multiple Pickers with Different Locales -->
      <section class="demo-section">
        <h3>🌍 Multiple Pickers - Different Locales</h3>
        <p class="hint">Each picker is a wrapper component with its own providers</p>

        <div class="pickers-grid">
          <!-- English Picker (Default) -->
          <div class="picker-card">
            <div class="picker-header">
              <span class="flag">🇺🇸</span>
              <h4>English (Default)</h4>
            </div>
            <div class="input-group">
              <label>Select date:</label>
              <input
                [(ngModel)]="englishDate"
                [owlDateTime]="dtEnglish"
                [owlDateTimeTrigger]="dtEnglish"
                placeholder="Choose date">
              <owl-date-time #dtEnglish></owl-date-time>
              @if (englishDate()) {
                <div class="selected-value">
                  {{ englishDate() | date:'medium':'+0000':'en-US' }}
                </div>
              }
            </div>
            <div class="config-info">
              <strong>Config:</strong> Default (no wrapper)
            </div>
          </div>

          <!-- French Picker -->
          <div class="picker-card">
            <div class="picker-header">
              <span class="flag">🇫🇷</span>
              <h4>Français</h4>
            </div>
            <div class="input-group">
              <label>Sélectionnez une date:</label>
              <app-french-picker
                [(value)]="frenchDate"
                placeholder="Choisir une date">
              </app-french-picker>
              @if (frenchDate()) {
                <div class="selected-value">
                  {{ frenchDate() | date:'medium':'+0000':'fr' }}
                </div>
              }
            </div>
            <div class="config-info">
              <strong>Wrapper:</strong> &lt;app-french-picker&gt;
            </div>
          </div>

          <!-- German Picker -->
          <div class="picker-card">
            <div class="picker-header">
              <span class="flag">🇩🇪</span>
              <h4>Deutsch</h4>
            </div>
            <div class="input-group">
              <label>Datum auswählen:</label>
              <app-german-picker
                [(value)]="germanDate"
                placeholder="Datum wählen">
              </app-german-picker>
              @if (germanDate()) {
                <div class="selected-value">
                  {{ germanDate() | date:'medium':'+0000':'de' }}
                </div>
              }
            </div>
            <div class="config-info">
              <strong>Wrapper:</strong> &lt;app-german-picker&gt;
            </div>
          </div>

          <!-- Spanish Picker -->
          <div class="picker-card">
            <div class="picker-header">
              <span class="flag">🇪🇸</span>
              <h4>Español</h4>
            </div>
            <div class="input-group">
              <label>Seleccionar fecha:</label>
              <app-spanish-picker
                [(value)]="spanishDate"
                placeholder="Elegir fecha">
              </app-spanish-picker>
              @if (spanishDate()) {
                <div class="selected-value">
                  {{ spanishDate() | date:'medium':'+0000':'es' }}
                </div>
              }
            </div>
            <div class="config-info">
              <strong>Wrapper:</strong> &lt;app-spanish-picker&gt;
            </div>
          </div>
        </div>
      </section>

      <!-- Range Picker with Arabic (RTL) -->
      <section class="demo-section">
        <h3>🇸🇦 Range Picker with Arabic (RTL)</h3>
        <p class="hint">Wrapper component with RTL support and Arabic labels</p>

        <div class="picker-card rtl-card">
          <div class="input-group" dir="rtl">
            <label>اختر نطاق التاريخ:</label>
            <app-arabic-picker
              [(value)]="arabicRange"
              [selectMode]="'range'"
              placeholder="اختر النطاق">
            </app-arabic-picker>
            @if (arabicRange() && Array.isArray(arabicRange()) && arabicRange()[0]) {
              <div class="range-result" dir="rtl">
                <div class="range-item">
                  <span class="range-label">من:</span>
                  <span class="range-value">{{ arabicRange()[0] | date:'medium':'+0000':'ar' }}</span>
                </div>
                @if (arabicRange()[1]) {
                  <div class="range-item">
                    <span class="range-label">إلى:</span>
                    <span class="range-value">{{ arabicRange()[1] | date:'medium':'+0000':'ar' }}</span>
                  </div>
                }
              </div>
            }
          </div>
          <div class="config-info" dir="rtl">
            <strong>المغلف:</strong> &lt;app-arabic-picker&gt;
          </div>
        </div>
      </section>

      <!-- Code Examples -->
      <section class="demo-section">
        <h3>📝 Implementation Examples</h3>

        <div class="config-card">
          <h4>Step 1: Create Intl Class</h4>
          <pre><code>import &#123; Injectable &#125; from '&#64;angular/core';
import &#123; OwlDateTimeIntl &#125; from '&#64;danielmoncada/angular-datetime-picker';

&#64;Injectable()
export class FrenchIntl extends OwlDateTimeIntl &#123;
  override cancelBtnLabel = 'Annuler';
  override setBtnLabel = 'Valider';
  override rangeFromLabel = 'De';
  override rangeToLabel = 'À';
  override prevMonthLabel = 'Mois précédent';
  override nextMonthLabel = 'Mois suivant';
&#125;</code></pre>
        </div>

        <div class="config-card">
          <h4>Step 2: Create Wrapper Component with Providers</h4>
          <pre><code>import &#123; Component &#125; from '&#64;angular/core';
import &#123;
  OwlDateTimeComponent,
  OwlDateTimeTriggerDirective,
  OwlDateTimeInputDirective,
  OwlDateTimeIntl,
  OWL_DATE_TIME_LOCALE,
  owlDateTimeProviders,        // Component-level providers!
  owlNativeDateTimeProviders   // Component-level providers!
&#125; from '&#64;danielmoncada/angular-datetime-picker';

&#64;Component(&#123;
  selector: 'app-french-picker',
  standalone: true,
  imports: [
    FormsModule,
    OwlDateTimeComponent,
    OwlDateTimeTriggerDirective,
    OwlDateTimeInputDirective
  ],
  providers: [
    // Spread component-level providers
    ...owlDateTimeProviders(),
    ...owlNativeDateTimeProviders(),
    // Override with locale-specific configuration
    &#123; provide: OwlDateTimeIntl, useClass: FrenchIntl &#125;,
    &#123; provide: OWL_DATE_TIME_LOCALE, useValue: 'fr' &#125;
  ],
  template: \`
    &lt;input
      [(ngModel)]="value"
      [owlDateTime]="dt"
      [owlDateTimeTrigger]="dt"
      [placeholder]="placeholder"&gt;
    &lt;owl-date-time #dt&gt;&lt;/owl-date-time&gt;
  \`
&#125;)
export class FrenchPickerComponent &#123;
  &#64;Input() value: Date | null = null;
  &#64;Input() placeholder = '';
&#125;</code></pre>
        </div>

        <div class="config-card">
          <h4>Step 3: Use Wrapper Components</h4>
          <pre><code>&lt;!-- French Picker --&gt;
&lt;app-french-picker
  [(value)]="frenchDate"
  placeholder="Choisir une date"&gt;
&lt;/app-french-picker&gt;

&lt;!-- German Picker --&gt;
&lt;app-german-picker
  [(value)]="germanDate"
  placeholder="Datum wählen"&gt;
&lt;/app-german-picker&gt;

&lt;!-- Multiple pickers, different locales, same page! --&gt;</code></pre>
        </div>
      </section>

      <!-- Benefits Section -->
      <section class="demo-section benefits-section">
        <h3>✨ Benefits of Wrapper Components</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">🎯</div>
            <h4>Perfect Isolation</h4>
            <p>Each wrapper has its own DI scope - zero interference</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">♻️</div>
            <h4>Reusability</h4>
            <p>Create once, use everywhere in your app</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">📦</div>
            <h4>Encapsulation</h4>
            <p>All configuration bundled in one component</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🚀</div>
            <h4>Lazy Loading</h4>
            <p>Load locale components only when routes need them</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🧪</div>
            <h4>Easy Testing</h4>
            <p>Test each wrapper in complete isolation</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🔧</div>
            <h4>Standard Angular</h4>
            <p>Uses native Angular component providers</p>
          </div>
        </div>
      </section>

      <!-- Comparison Table -->
      <section class="demo-section">
        <h3>📊 Global vs Wrapper Component Providers</h3>
        <div class="comparison-table">
          <div class="table-header">
            <div class="table-cell">Feature</div>
            <div class="table-cell">Global Providers</div>
            <div class="table-cell">Wrapper Components</div>
          </div>
          <div class="table-row">
            <div class="table-cell"><strong>Configuration</strong></div>
            <div class="table-cell">main.ts</div>
            <div class="table-cell">Component providers</div>
          </div>
          <div class="table-row">
            <div class="table-cell"><strong>Scope</strong></div>
            <div class="table-cell">Entire application</div>
            <div class="table-cell">Single component tree</div>
          </div>
          <div class="table-row">
            <div class="table-cell"><strong>Multiple Locales</strong></div>
            <div class="table-cell">Runtime switching needed</div>
            <div class="table-cell">Native - no switching</div>
          </div>
          <div class="table-row">
            <div class="table-cell"><strong>Lazy Loading</strong></div>
            <div class="table-cell">All loaded at start</div>
            <div class="table-cell">Load per route/module</div>
          </div>
          <div class="table-row">
            <div class="table-cell"><strong>Testing</strong></div>
            <div class="table-cell">Need to mock globals</div>
            <div class="table-cell">Isolated, simple tests</div>
          </div>
          <div class="table-row">
            <div class="table-cell"><strong>Best For</strong></div>
            <div class="table-cell">Single-locale apps</div>
            <div class="table-cell">Multi-locale apps</div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-container {
      padding: 2rem;
      max-width: 1400px;
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

    .info-banner {
      display: flex;
      gap: 1.5rem;
      background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
      padding: 2rem;
      border-radius: 12px;
      margin-bottom: 2rem;
      border-left: 4px solid #2196f3;
    }

    .banner-icon {
      font-size: 3rem;
      line-height: 1;
    }

    .banner-content h3 {
      margin: 0 0 0.5rem 0;
      color: #1565c0;
      font-size: 1.3rem;
    }

    .banner-content p {
      margin: 0 0 1rem 0;
      color: #555;
    }

    .banner-content ul {
      margin: 0;
      padding-left: 1.5rem;
      color: #555;
    }

    .banner-content li {
      margin-bottom: 0.5rem;
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

    h4 {
      margin: 0 0 0.5rem 0;
      color: #555;
      font-size: 1.1rem;
    }

    .hint {
      color: #666;
      font-size: 0.9rem;
      font-style: italic;
      margin-bottom: 1.5rem;
      padding: 0.5rem;
      background: #fff;
      border-left: 3px solid #4caf50;
      border-radius: 2px;
    }

    .pickers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .picker-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .picker-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    }

    .rtl-card {
      grid-column: 1 / -1;
      max-width: 600px;
      margin: 0 auto;
      width: 100%;
    }

    .picker-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid #4caf50;
    }

    .flag {
      font-size: 2rem;
    }

    .picker-header h4 {
      margin: 0;
      color: #4caf50;
      font-size: 1.2rem;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .input-group[dir="rtl"] {
      text-align: right;
    }

    label {
      font-weight: 500;
      color: #555;
      font-size: 0.95rem;
    }

    input, app-french-picker, app-german-picker, app-spanish-picker, app-arabic-picker {
      display: block;
      width: 100%;
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
      padding: 0.75rem;
      background: #e8f5e9;
      border-radius: 4px;
      font-size: 0.9rem;
      color: #2e7d32;
      text-align: center;
    }

    .range-result {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.75rem;
      background: #fff3e0;
      border-radius: 4px;
    }

    .range-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      background: white;
      border-radius: 4px;
    }

    .range-label {
      font-weight: 600;
      color: #e65100;
    }

    .range-value {
      color: #333;
    }

    .config-info {
      padding: 0.75rem;
      background: #f5f5f5;
      border-radius: 4px;
      font-size: 0.85rem;
      color: #666;
      text-align: center;
    }

    .config-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .config-card h4 {
      margin-top: 0;
      color: #4caf50;
      font-size: 1.1rem;
      margin-bottom: 1rem;
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
      font-size: 0.9rem;
      line-height: 1.6;
    }

    .benefits-section {
      background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
      border-left-color: #9c27b0;
    }

    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .benefit-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      text-align: center;
      transition: transform 0.2s;
    }

    .benefit-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(156, 39, 176, 0.2);
    }

    .benefit-icon {
      font-size: 2.5rem;
      margin-bottom: 0.75rem;
    }

    .benefit-card h4 {
      color: #9c27b0;
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }

    .benefit-card p {
      color: #666;
      font-size: 0.9rem;
      margin: 0;
      line-height: 1.5;
    }

    .comparison-table {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .table-header,
    .table-row {
      display: grid;
      grid-template-columns: 200px 1fr 1fr;
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

    .table-cell {
      padding: 1rem;
      border-right: 1px solid #e0e0e0;
    }

    .table-cell:last-child {
      border-right: none;
    }

    .table-header .table-cell {
      border-right-color: rgba(255,255,255,0.3);
    }

    @media (max-width: 768px) {
      .pickers-grid {
        grid-template-columns: 1fr;
      }

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
  `]
})
export class LazyLocaleProvidersComponent {
  englishDate = signal<Date | null>(null);
  frenchDate = signal<Date | null>(null);
  germanDate = signal<Date | null>(null);
  spanishDate = signal<Date | null>(null);
  arabicRange = signal<Date[] | null>(null);

  Array = Array; // For template access
}
