# 🦉 Owl DateTime Picker - Comprehensive Demo Guide

Welcome to the comprehensive demo application for the Owl DateTime Picker! This guide will help you navigate through all the features and examples.

## 🚀 Getting Started

### Running the Demo

```bash
# Install dependencies
npm install

# Start development server
npm start

# Open browser to http://localhost:4200
```

### Building the Demo

```bash
# Build the application
npx ng build

# Output will be in dist/date-time-picker-app
```

## 📚 Demo Categories

### 1. 📅 Basic Usage

**Location:** `src/app/demos/basic-usage.component.ts`

Demonstrates the simplest use cases:
- **Date Picker Only** - Select dates without time
- **Time Picker Only** - Select time without date
- **DateTime Picker** - Select both date and time
- **12-Hour Format** - Time picker with AM/PM

**Key Features:**
- `[pickerType]="'calendar'"` - Date only
- `[pickerType]="'timer'"` - Time only
- `[pickerType]="'both'"` - Date and time
- `[hour12Timer]="true"` - 12-hour format
- `[showSecondsTimer]="true"` - Show seconds

**Example:**
```typescript
<input
  [(ngModel)]="dateValue"
  [owlDateTime]="dt1"
  [owlDateTimeTrigger]="dt1"
  placeholder="Choose date">
<owl-date-time #dt1 [pickerType]="'calendar'"></owl-date-time>
```

---

### 2. 📊 Range Selection

**Location:** `src/app/demos/range-selection.component.ts`

Shows how to select date ranges:
- **Full Range** - Select start and end dates
- **DateTime Range** - Range with time selection
- **Range From** - Only start date
- **Range To** - Only end date
- **Pre-filled Range** - Default range values

**Key Features:**
- `[selectMode]="'range'"` - Full range selection
- `[selectMode]="'rangeFrom'"` - Start date only
- `[selectMode]="'rangeTo'"` - End date only
- Duration calculation between dates

**Example:**
```typescript
<input
  [(ngModel)]="dateRange"
  [selectMode]="'range'"
  [owlDateTime]="dt1"
  [owlDateTimeTrigger]="dt1">
<owl-date-time #dt1></owl-date-time>
```

---

### 3. 📌 Inline Picker

**Location:** `src/app/demos/inline-picker.component.ts`

Demonstrates always-visible pickers:
- **Inline Date Picker** - Calendar always visible
- **Inline DateTime Picker** - Calendar + timer visible
- **Inline Range Picker** - Range selection inline
- **Inline Time Picker** - Timer always visible

**Key Features:**
- Uses `<owl-date-time-inline>` component
- No input field required
- Perfect for dashboards and scheduling UIs
- Real-time duration calculation

**Example:**
```typescript
<owl-date-time-inline
  [(ngModel)]="selectedDate"
  [pickerType]="'both'">
</owl-date-time-inline>
```

---

### 4. ⚙️ Advanced Configuration

**Location:** `src/app/demos/advanced-config.component.ts`

Advanced features and restrictions:
- **Min/Max Dates** - Restrict selectable date range
- **Date Filters** - Custom filtering (weekends/weekdays)
- **Time Step Intervals** - Custom hour/minute/second steps
- **First Day of Week** - Configure week start day
- **Hide Other Months** - Show only current month
- **Start View** - Open in specific view (month/year)
- **Year Only Mode** - Select year and month only

**Key Features:**
- `[min]` and `[max]` - Date restrictions
- `[owlDateTimeFilter]` - Custom date filter function
- `[stepHour]`, `[stepMinute]`, `[stepSecond]` - Time intervals
- `[firstDayOfWeek]` - Week start (0-6, Sunday-Saturday)
- `[hideOtherMonths]` - Hide adjacent month dates
- `[startView]` - Initial view ('month' | 'year' | 'multi-years')
- `[yearOnly]` - Year/month selection only

**Example:**
```typescript
// Weekdays only filter
weekdayFilter = (d: Date): boolean => {
  const day = d.getDay();
  return day >= 1 && day <= 5;
};

<input
  [(ngModel)]="date"
  [min]="minDate"
  [max]="maxDate"
  [owlDateTimeFilter]="weekdayFilter"
  [owlDateTime]="dt1"
  [owlDateTimeTrigger]="dt1">
<owl-date-time
  #dt1
  [stepHour]="2"
  [stepMinute]="15"
  [firstDayOfWeek]="1">
</owl-date-time>
```

---

### 5. 📡 Events & Callbacks

**Location:** `src/app/demos/events-callbacks.component.ts`

Monitor picker events in real-time:
- **All Events** - Complete event logging
- **Year Selection** - When year is clicked
- **Month Selection** - When month is clicked
- **Picker Lifecycle** - Open/close events

**Available Events:**
- `(beforePickerOpen)` - Before picker opens
- `(afterPickerOpen)` - After picker opens
- `(afterPickerClosed)` - After picker closes
- `(yearSelected)` - Year clicked in multi-year view
- `(monthSelected)` - Month clicked in year view
- `(dateSelected)` - Date selected

**Example:**
```typescript
<owl-date-time
  #dt1
  (beforePickerOpen)="onBeforeOpen()"
  (afterPickerOpen)="onAfterOpen()"
  (afterPickerClosed)="onAfterClosed($event)"
  (yearSelected)="onYearSelected($event)"
  (monthSelected)="onMonthSelected($event)"
  (dateSelected)="onDateSelected($event)">
</owl-date-time>
```

---

### 6. 🎈 Picker Modes

**Location:** `src/app/demos/picker-modes.component.ts`

Different display modes:
- **Popup Mode** - Attached to input (default)
- **Dialog Mode** - Centered modal with backdrop
- **Inline Mode** - Always visible in page
- **Custom Styling** - Custom classes for backdrop/panel

**Modes Comparison:**

| Feature | Popup | Dialog | Inline |
|---------|-------|--------|--------|
| Visibility | On Click | On Click | Always |
| Position | Attached to Input | Center of Screen | In Document Flow |
| Backdrop | Transparent | Dark Overlay | None |
| Best For | Forms | Mobile Apps | Dashboards |

**Example:**
```typescript
// Popup (default)
<owl-date-time #dt1 [pickerMode]="'popup'"></owl-date-time>

// Dialog
<owl-date-time #dt2 [pickerMode]="'dialog'"></owl-date-time>

// Custom classes
<owl-date-time
  #dt3
  [backdropClass]="['custom-backdrop']"
  [panelClass]="['custom-panel']">
</owl-date-time>
```

---

### 7. 🎨 Custom Options

**Location:** `src/app/demos/custom-options.component.ts`

Global configuration and customization:
- **Multi-Year Grid** - Configure years per row/total rows
- **Calendar Weeks** - Show week numbers
- **Year Only** - Year and month selection
- **Multi-Year Only** - Multi-year view only
- **Combined Configuration** - Multiple features together

**Global Configuration (main.ts):**
```typescript
import {
  provideOwlDateTime,
  provideOwlNativeDateTime,
  provideOwlDateTimeOptions
} from '@danielmoncada/angular-datetime-picker';

bootstrapApplication(AppComponent, {
  providers: [
    provideOwlDateTime(),
    provideOwlNativeDateTime(),
    provideOwlDateTimeOptions({
      multiYear: {
        yearsPerRow: 3,  // 3 years per row
        yearRows: 5      // 5 rows total = 15 years
      }
    })
  ]
});
```

**Component-Level Options:**
```typescript
<owl-date-time
  [showCalendarWeeks]="true"
  [yearOnly]="true"
  [multiyearOnly]="true">
</owl-date-time>
```

---

### 8. 💬 Dialog Configuration

**Location:** `src/app/demos/dialog-config.component.ts`

Scroll strategies, backdrop styling, and panel customization:
- **Popup vs Dialog** - Compare the two modes side by side
- **Scroll Strategy** - Control behavior when page scrolls
- **Custom Backdrop** - Apply custom CSS classes to backdrop
- **Custom Panel** - Style the picker panel itself
- **Combined Configuration** - All features together

**Scroll Strategy Configuration:**
```typescript
import { OWL_DIALOG_SCROLL_STRATEGY_PROVIDER } from '@danielmoncada/angular-datetime-picker';
import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';

// Custom scroll strategy factory
export function scrollStrategyFactory(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.close(); // Close on scroll
}

bootstrapApplication(AppComponent, {
  providers: [
    provideOwlDateTime(),
    provideOwlNativeDateTime(),
    {
      provide: OWL_DIALOG_SCROLL_STRATEGY_PROVIDER,
      useFactory: scrollStrategyFactory,
      deps: [Overlay]
    }
  ]
});
```

**Available Scroll Strategies:**
- `block` - Prevents scrolling (default)
- `reposition` - Repositions picker on scroll
- `close` - Closes picker on scroll
- `noop` - Does nothing

**Custom Styling Example:**
```typescript
// Template
<owl-date-time
  #dt1
  [pickerMode]="'dialog'"
  [backdropClass]="['custom-backdrop', 'blur-effect']"
  [panelClass]="['custom-panel']">
</owl-date-time>

// Global styles.scss
.custom-backdrop {
  background-color: rgba(63, 81, 181, 0.8) !important;
  backdrop-filter: blur(8px);
}

.custom-panel {
  border-radius: 16px !important;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3) !important;
}
```

---

### 9. 🌍 Localization & Internationalization

**Location:** `src/app/demos/localization.component.ts`

Multi-language support with translated UI labels and RTL languages:
- **Locale Selector** - Switch between languages dynamically
- **Localized Labels** - Translate Cancel, Set, From, To, AM/PM buttons
- **Range Picker Labels** - Translated "From" and "To" labels
- **DateTime Labels** - Localized AM/PM indicators
- **Arabic (RTL)** - Full right-to-left support
- **Label Reference** - See all current locale labels
- **Configuration Guide** - Step-by-step setup instructions

**Step 1: Create Custom Label Class (OwlDateTimeIntl)**
```typescript
import { Injectable } from '@angular/core';
import { OwlDateTimeIntl } from '@danielmoncada/angular-datetime-picker';

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
  override prevYearLabel = 'Année précédente';
  override nextYearLabel = 'Année suivante';
  override switchToMonthViewLabel = 'Passer à la vue du mois';
  override switchToMultiYearViewLabel = 'Choisir le mois et l\'année';
}
```

**Step 2: Provide Globally or Per Component**
```typescript
// Global configuration in main.ts
import { OwlDateTimeIntl } from '@danielmoncada/angular-datetime-picker';

bootstrapApplication(AppComponent, {
  providers: [
    provideOwlDateTime(),
    provideOwlNativeDateTime(),
    { provide: OwlDateTimeIntl, useClass: FrenchIntl }
  ]
});

// Or in component
@Component({
  providers: [
    { provide: OwlDateTimeIntl, useClass: FrenchIntl }
  ]
})
```

**Step 3: Register Angular Locale for Date Formatting**
```typescript
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

// Register locale for DatePipe
registerLocaleData(localeFr, 'fr');

// Use in template with DatePipe third parameter
// date:'full':'+0000':'fr'
```

**Step 4: Runtime Locale Switching (IMPORTANT!)**
```typescript
import { inject } from '@angular/core';
import { DateTimeAdapter, OwlDateTimeIntl } from '@danielmoncada/angular-datetime-picker';

export class MyComponent {
  private dateAdapter = inject(DateTimeAdapter<Date>);
  private intl = inject(OwlDateTimeIntl);

  private frenchIntl = new FrenchIntl();
  private arabicIntl = new ArabicIntl();

  changeLanguage(locale: string) {
    // STEP 1: Update DateTimeAdapter locale
    this.dateAdapter.setLocale(locale);

    // STEP 2: Update OwlDateTimeIntl labels
    const newIntl = locale === 'fr' ? this.frenchIntl : this.arabicIntl;
    this.intl.cancelBtnLabel = newIntl.cancelBtnLabel;
    this.intl.setBtnLabel = newIntl.setBtnLabel;
    this.intl.rangeFromLabel = newIntl.rangeFromLabel;
    this.intl.rangeToLabel = newIntl.rangeToLabel;
    this.intl.hour12AMLabel = newIntl.hour12AMLabel;
    this.intl.hour12PMLabel = newIntl.hour12PMLabel;
    this.intl.prevMonthLabel = newIntl.prevMonthLabel;
    this.intl.nextMonthLabel = newIntl.nextMonthLabel;
    this.intl.prevYearLabel = newIntl.prevYearLabel;
    this.intl.nextYearLabel = newIntl.nextYearLabel;
    this.intl.switchToMonthViewLabel = newIntl.switchToMonthViewLabel;
    this.intl.switchToMultiYearViewLabel = newIntl.switchToMultiYearViewLabel;

    // STEP 3: Notify that labels changed
    this.intl.changes.next();
  }
}
```

**Available Label Properties:**
- `cancelBtnLabel` - Cancel button text
- `setBtnLabel` - Set/Confirm button text
- `rangeFromLabel` - Range start label (shows in picker)
- `rangeToLabel` - Range end label (shows in picker)
- `hour12AMLabel` - AM indicator
- `hour12PMLabel` - PM indicator
- `prevMonthLabel` - Previous month aria-label
- `nextMonthLabel` - Next month aria-label
- `prevYearLabel` - Previous year aria-label
- `nextYearLabel` - Next year aria-label
- `switchToMonthViewLabel` - Switch to month view aria-label
- `switchToMultiYearViewLabel` - Multi-year view aria-label

**RTL Support (Arabic Example):**
```typescript
@Injectable()
export class ArabicIntl extends OwlDateTimeIntl {
  override cancelBtnLabel = 'إلغاء';
  override setBtnLabel = 'تعيين';
  override rangeFromLabel = 'من';
  override rangeToLabel = 'إلى';
  override hour12AMLabel = 'ص';
  override hour12PMLabel = 'م';
  // ... other labels
}
```

```html
<!-- Template with RTL direction -->
<input
  [(ngModel)]="dateValue"
  [owlDateTime]="dt1"
  [owlDateTimeTrigger]="dt1"
  [dir]="'rtl'"
  placeholder="اختر التاريخ">
```

```css
/* Styles for RTL support */
[dir="rtl"] {
  direction: rtl;
  text-align: right;
}
```

**Supported Locales (with examples in demo):**
- English (US) - `en-US`
- Arabic - `ar` (RTL) - ص/م for AM/PM
- French - `fr` - Annuler/Valider
- German - `de` - Abbrechen/Bestätigen
- Spanish - `es` - Cancelar/Aceptar
- Japanese - `ja` - キャンセル/設定

---

### 10. 🔄 Date Adapters & Formats

**Location:** `src/app/demos/adapters.component.ts`

Different date implementations and custom formats:
- **Native Date Adapter** - JavaScript Date objects (default)
- **Unix Timestamp Adapter** - Milliseconds since epoch
- **Custom Format Configuration** - Override default formats
- **Format Comparison** - See all format options
- **Adapter Comparison** - Native vs Unix comparison

**Native Date Adapter (Default):**
```typescript
import { provideOwlNativeDateTime } from '@danielmoncada/angular-datetime-picker';

bootstrapApplication(AppComponent, {
  providers: [
    provideOwlDateTime(),
    provideOwlNativeDateTime()
  ]
});
```

**Unix Timestamp Adapter:**
```typescript
import { provideOwlUnixTimestampDateTime } from '@danielmoncada/angular-datetime-picker';

bootstrapApplication(AppComponent, {
  providers: [
    provideOwlDateTime(),
    provideOwlUnixTimestampDateTime() // Instead of provideOwlNativeDateTime()
  ]
});
```

**Custom Format Configuration:**
```typescript
import {
  provideOwlNativeDateTimeWithFormats,
  OwlDateTimeFormats
} from '@danielmoncada/angular-datetime-picker';

const customFormats: OwlDateTimeFormats = {
  parseInput: 'DD/MM/YYYY HH:mm',
  fullPickerInput: 'DD/MM/YYYY HH:mm:ss',
  datePickerInput: 'DD/MM/YYYY',
  timePickerInput: 'HH:mm:ss',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY'
};

bootstrapApplication(AppComponent, {
  providers: [
    provideOwlDateTime(),
    provideOwlNativeDateTimeWithFormats(customFormats)
  ]
});
```

**Format Tokens:**
- Date: `d`, `dd`, `E`, `EEEE`, `M`, `MM`, `MMM`, `MMMM`, `y`, `yy`
- Time: `H`, `HH`, `h`, `hh`, `m`, `mm`, `s`, `ss`, `a`

---

## 🔧 Configuration Reference

### Input Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `pickerType` | `'calendar' \| 'timer' \| 'both'` | `'both'` | Type of picker |
| `pickerMode` | `'popup' \| 'dialog'` | `'popup'` | Display mode |
| `selectMode` | `'single' \| 'range' \| 'rangeFrom' \| 'rangeTo'` | `'single'` | Selection mode |
| `startView` | `DateView` | `DateView.MONTH` | Initial view |
| `showSecondsTimer` | `boolean` | `false` | Show seconds |
| `hour12Timer` | `boolean` | `false` | 12-hour format |
| `stepHour` | `number` | `1` | Hour step interval |
| `stepMinute` | `number` | `1` | Minute step interval |
| `stepSecond` | `number` | `1` | Second step interval |
| `firstDayOfWeek` | `number` | `0` | First day (0-6) |
| `hideOtherMonths` | `boolean` | `false` | Hide other months |
| `showCalendarWeeks` | `boolean` | `false` | Show week numbers |
| `yearOnly` | `boolean` | `false` | Year selection only |
| `multiyearOnly` | `boolean` | `false` | Multi-year only |
| `min` | `Date` | `null` | Minimum date |
| `max` | `Date` | `null` | Maximum date |
| `owlDateTimeFilter` | `(date: Date) => boolean` | `null` | Custom filter |
| `backdropClass` | `string \| string[]` | `[]` | Custom backdrop classes |
| `panelClass` | `string \| string[]` | `[]` | Custom panel classes |

### Output Events

| Event | Type | Description |
|-------|------|-------------|
| `beforePickerOpen` | `void` | Before picker opens |
| `afterPickerOpen` | `void` | After picker opens |
| `afterPickerClosed` | `any` | After picker closes |
| `yearSelected` | `Date` | Year selected |
| `monthSelected` | `Date` | Month selected |
| `dateSelected` | `Date` | Date selected |

---

## 📦 Provider Functions

### Main Providers

```typescript
// Core functionality
provideOwlDateTime()

// Native Date adapter
provideOwlNativeDateTime()

// Unix timestamp adapter
provideOwlUnixTimestampDateTime()

// Custom options
provideOwlDateTimeOptions({
  multiYear: {
    yearsPerRow: 3,
    yearRows: 5
  }
})

// Dialog service (included in provideOwlDateTime)
provideOwlDialog()
```

### With Custom Formats

```typescript
const customFormats: OwlDateTimeFormats = {
  parseInput: 'DD/MM/YYYY HH:mm',
  fullPickerInput: 'DD/MM/YYYY HH:mm:ss',
  datePickerInput: 'DD/MM/YYYY',
  timePickerInput: 'HH:mm:ss',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

provideOwlNativeDateTimeWithFormats(customFormats)
```

---

## 🎯 Use Cases

### Booking System
```typescript
// Date range with min/max restrictions
<input
  [(ngModel)]="bookingRange"
  [selectMode]="'range'"
  [min]="today"
  [max]="maxBookingDate"
  [owlDateTime]="dt1"
  [owlDateTimeTrigger]="dt1">
```

### Work Schedule (Weekdays Only)
```typescript
weekdaysOnly = (d: Date) => d.getDay() >= 1 && d.getDay() <= 5;

<input
  [(ngModel)]="workDate"
  [owlDateTimeFilter]="weekdaysOnly"
  [owlDateTime]="dt1"
  [owlDateTimeTrigger]="dt1">
```

### Time Slots (15-minute intervals)
```typescript
<owl-date-time
  #dt1
  [pickerType]="'timer'"
  [stepMinute]="15"
  [hour12Timer]="true">
</owl-date-time>
```

### Dashboard (Always Visible)
```typescript
<owl-date-time-inline
  [(ngModel)]="dashboardDate"
  [pickerType]="'calendar'"
  [showCalendarWeeks]="true">
</owl-date-time-inline>
```

---

## 🚀 Best Practices

1. **Use Inline for Dashboards** - Better UX for frequently used pickers
2. **Dialog for Mobile** - Better experience on small screens
3. **Filter Invalid Dates** - Use `owlDateTimeFilter` for business logic
4. **Set Min/Max** - Prevent invalid date selection
5. **Custom Step Intervals** - Match your business requirements
6. **Event Monitoring** - Track user interactions for analytics

---

## 🐛 Troubleshooting

### Picker Not Opening
- Check that `[owlDateTime]` and `[owlDateTimeTrigger]` reference the same template variable
- Ensure providers are configured in `main.ts`

### Date Format Issues
- Import `DatePipe` for template formatting
- Configure custom formats via `provideOwlNativeDateTimeWithFormats()`

### Styling Issues
- Use `[backdropClass]` and `[panelClass]` for custom styling
- Check global styles don't override picker styles

---

## 📖 Additional Resources

- **GitHub:** https://github.com/danielmoncada/date-time-picker
- **NPM:** https://www.npmjs.com/package/@danielmoncada/angular-datetime-picker
- **Migration Guide:** See `MIGRATION_GUIDE.md`
- **Issues:** https://github.com/danielmoncada/date-time-picker/issues

---

## 🎉 Happy Coding!

This demo application showcases all features of the Owl DateTime Picker. Explore each section to find examples that match your use case!
