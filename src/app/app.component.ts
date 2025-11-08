import { Component, signal } from '@angular/core';
import { BasicUsageComponent } from './demos/basic-usage.component';
import { RangeSelectionComponent } from './demos/range-selection.component';
import { InlinePickerComponent } from './demos/inline-picker.component';
import { AdvancedConfigComponent } from './demos/advanced-config.component';
import { EventsCallbacksComponent } from './demos/events-callbacks.component';
import { PickerModesComponent } from './demos/picker-modes.component';
import { CustomOptionsComponent } from './demos/custom-options.component';
import { DialogConfigComponent } from './demos/dialog-config.component';
import { LocalizationComponent } from './demos/localization.component';
import { AdaptersComponent } from './demos/adapters.component';
import { LazyLocaleProvidersComponent } from './demos/lazy-locale-providers.component';

type DemoTab = 'basic' | 'range' | 'inline' | 'advanced' | 'events' | 'modes' | 'options' | 'dialog' | 'localization' | 'adapters' | 'lazy-providers';

interface Demo {
  id: DemoTab;
  label: string;
  icon: string;
  description: string;
  component: any;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BasicUsageComponent,
    RangeSelectionComponent,
    InlinePickerComponent,
    AdvancedConfigComponent,
    EventsCallbacksComponent,
    PickerModesComponent,
    CustomOptionsComponent,
    DialogConfigComponent,
    LocalizationComponent,
    AdaptersComponent,
    LazyLocaleProvidersComponent
  ],
  template: `
    <div class="app-container">
      <!-- Header -->
      <header class="app-header">
        <div class="header-content">
          <div class="logo">
            <span class="logo-icon">🦉</span>
            <span class="logo-text">Owl DateTime Picker</span>
          </div>
          <div class="header-subtitle">
            Comprehensive Examples & Documentation
          </div>
        </div>
      </header>

      <!-- Navigation -->
      <nav class="demo-nav">
        <div class="nav-content">
          @for (demo of demos; track demo.id) {
            <button
              class="nav-item"
              [class.active]="currentDemo() === demo.id"
              (click)="currentDemo.set(demo.id)">
              <span class="nav-icon">{{ demo.icon }}</span>
              <span class="nav-label">{{ demo.label }}</span>
              @if (currentDemo() === demo.id) {
                <span class="nav-indicator"></span>
              }
            </button>
          }
        </div>
      </nav>

      <!-- Demo Info Bar -->
      <div class="demo-info">
        <div class="info-content">
          <h1 class="info-title">
            {{ getCurrentDemo().icon }} {{ getCurrentDemo().label }}
          </h1>
          <p class="info-description">{{ getCurrentDemo().description }}</p>
        </div>
      </div>

      <!-- Main Content -->
      <main class="main-content">
        @switch (currentDemo()) {
          @case ('basic') {
            <app-basic-usage />
          }
          @case ('range') {
            <app-range-selection />
          }
          @case ('inline') {
            <app-inline-picker />
          }
          @case ('advanced') {
            <app-advanced-config />
          }
          @case ('events') {
            <app-events-callbacks />
          }
          @case ('modes') {
            <app-picker-modes />
          }
          @case ('options') {
            <app-custom-options />
          }
          @case ('dialog') {
            <app-dialog-config />
          }
          @case ('localization') {
            <app-localization />
          }
          @case ('adapters') {
            <app-adapters />
          }
          @case ('lazy-providers') {
            <app-lazy-locale-providers />
          }
        }
      </main>

      <!-- Footer -->
      <footer class="app-footer">
        <div class="footer-content">
          <div class="footer-links">
            <a href="https://github.com/danielmoncada/date-time-picker" target="_blank">
              📦 GitHub
            </a>
            <a href="https://www.npmjs.com/package/@danielmoncada/angular-datetime-picker" target="_blank">
              📚 NPM
            </a>
            <a href="https://github.com/danielmoncada/date-time-picker/issues" target="_blank">
              🐛 Issues
            </a>
          </div>
          <div class="footer-info">
            Built with ❤️ using Angular • Provider-based architecture
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .app-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem 1rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
    }

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 0.5rem;
    }

    .logo-icon {
      font-size: 3rem;
    }

    .logo-text {
      font-size: 2.5rem;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    }

    .header-subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
    }

    .demo-nav {
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .nav-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      overflow-x: auto;
      scrollbar-width: thin;
    }

    .nav-content::-webkit-scrollbar {
      height: 4px;
    }

    .nav-content::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    .nav-content::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 2px;
    }

    .nav-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      padding: 1rem 1.5rem;
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      color: #666;
      white-space: nowrap;
    }

    .nav-item:hover {
      background: #f5f5f5;
      color: #667eea;
    }

    .nav-item.active {
      color: #667eea;
      font-weight: 600;
    }

    .nav-icon {
      font-size: 1.5rem;
    }

    .nav-label {
      font-size: 0.9rem;
    }

    .nav-indicator {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      border-radius: 3px 3px 0 0;
    }

    .demo-info {
      background: white;
      border-bottom: 1px solid #e0e0e0;
      padding: 2rem 1rem;
    }

    .info-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .info-title {
      font-size: 2rem;
      color: #333;
      margin: 0 0 0.5rem 0;
    }

    .info-description {
      font-size: 1.1rem;
      color: #666;
      margin: 0;
    }

    .main-content {
      flex: 1;
      background: white;
      min-height: 600px;
    }

    .app-footer {
      background: #2c3e50;
      color: white;
      padding: 2rem 1rem;
      margin-top: auto;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .footer-links {
      display: flex;
      gap: 2rem;
    }

    .footer-links a {
      color: white;
      text-decoration: none;
      transition: opacity 0.2s;
    }

    .footer-links a:hover {
      opacity: 0.8;
    }

    .footer-info {
      font-size: 0.9rem;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .logo-text {
        font-size: 1.8rem;
      }

      .header-subtitle {
        font-size: 1rem;
      }

      .nav-item {
        padding: 0.75rem 1rem;
      }

      .nav-icon {
        font-size: 1.25rem;
      }

      .nav-label {
        font-size: 0.8rem;
      }

      .info-title {
        font-size: 1.5rem;
      }

      .info-description {
        font-size: 1rem;
      }

      .footer-links {
        flex-direction: column;
        gap: 0.5rem;
        text-align: center;
      }
    }
  `]
})
export class AppComponent {
  currentDemo = signal<DemoTab>('basic');

  demos: Demo[] = [
    {
      id: 'basic',
      label: 'Basic Usage',
      icon: '📅',
      description: 'Simple date, time, and datetime pickers with default settings',
      component: BasicUsageComponent
    },
    {
      id: 'range',
      label: 'Range Selection',
      icon: '📊',
      description: 'Date range picking for bookings, reports, and analytics',
      component: RangeSelectionComponent
    },
    {
      id: 'inline',
      label: 'Inline Picker',
      icon: '📌',
      description: 'Always-visible pickers embedded directly in your page',
      component: InlinePickerComponent
    },
    {
      id: 'advanced',
      label: 'Advanced Config',
      icon: '⚙️',
      description: 'Min/max dates, filters, disabled dates, and step intervals',
      component: AdvancedConfigComponent
    },
    {
      id: 'events',
      label: 'Events',
      icon: '📡',
      description: 'Monitor and respond to picker events in real-time',
      component: EventsCallbacksComponent
    },
    {
      id: 'modes',
      label: 'Picker Modes',
      icon: '🎈',
      description: 'Popup, dialog, and inline display modes',
      component: PickerModesComponent
    },
    {
      id: 'options',
      label: 'Custom Options',
      icon: '🎨',
      description: 'Multi-year grid configuration and advanced customization',
      component: CustomOptionsComponent
    },
    {
      id: 'dialog',
      label: 'Dialog Config',
      icon: '💬',
      description: 'Dialog modes, scroll strategies, and custom backdrop styling',
      component: DialogConfigComponent
    },
    {
      id: 'localization',
      label: 'Localization',
      icon: '🌍',
      description: 'Multi-language support with RTL (Right-to-Left) languages',
      component: LocalizationComponent
    },
    {
      id: 'adapters',
      label: 'Date Adapters',
      icon: '🔄',
      description: 'Different date implementations and custom format configurations',
      component: AdaptersComponent
    },
    {
      id: 'lazy-providers',
      label: 'Lazy Providers',
      icon: '⚡',
      description: 'Component-level locale providers without global configuration',
      component: LazyLocaleProvidersComponent
    }
  ];

  getCurrentDemo(): Demo {
    return this.demos.find(d => d.id === this.currentDemo())!;
  }
}
