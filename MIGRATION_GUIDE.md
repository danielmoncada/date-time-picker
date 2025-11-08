# Migration Guide: NgModule to Provider Functions

This guide will help you migrate from the deprecated NgModule approach to the new provider functions pattern.

## Overview

Starting with version 20.0.0, the library supports modern Angular standalone components and provider functions. The NgModule-based approach is deprecated and will be removed in version 21.0.0.

## Benefits of Provider Functions

- ✅ **Tree-shakable**: Better bundle size optimization
- ✅ **Standalone-ready**: Works seamlessly with standalone components
- ✅ **Type-safe**: Better TypeScript support for configuration
- ✅ **Flexible**: Easier to customize and extend
- ✅ **Modern**: Follows Angular's latest best practices

## Quick Migration

### Before (NgModule approach):

```typescript
import { NgModule } from '@angular/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';

@NgModule({
  imports: [
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class AppModule { }
```

### After (Provider approach):

**For standalone applications:**

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideOwlDateTime, provideOwlNativeDateTime } from '@danielmoncada/angular-datetime-picker';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideOwlDateTime(),
    provideOwlNativeDateTime()
  ]
});
```

**For existing NgModule applications:**

```typescript
import { NgModule } from '@angular/core';
import { provideOwlDateTime, provideOwlNativeDateTime } from '@danielmoncada/angular-datetime-picker';

@NgModule({
  providers: [
    provideOwlDateTime(),
    provideOwlNativeDateTime()
  ]
})
export class AppModule { }
```

## Available Provider Functions

### Core Functions

#### `provideOwlDateTime()`

Provides the core OwlDateTime functionality including:
- Date time picker internationalization service
- Scroll strategy for picker overlay
- Dialog service and scroll strategy
- Default options configuration

**Must be used with one of the date adapter providers below.**

```typescript
providers: [
  provideOwlDateTime(),
  provideOwlNativeDateTime() // Choose an adapter
]
```

---

### Date Adapter Providers

#### `provideOwlNativeDateTime()`

Provides the native JavaScript `Date` adapter with default formats.

```typescript
providers: [
  provideOwlDateTime(),
  provideOwlNativeDateTime()
]
```

#### `provideOwlNativeDateTimeWithFormats(formats)`

Provides the native JavaScript `Date` adapter with custom formats.

```typescript
import { OwlDateTimeFormats, provideOwlDateTime, provideOwlNativeDateTimeWithFormats } from '@danielmoncada/angular-datetime-picker';

const customFormats: OwlDateTimeFormats = {
  parseInput: 'DD/MM/YYYY HH:mm',
  fullPickerInput: 'DD/MM/YYYY HH:mm:ss',
  datePickerInput: 'DD/MM/YYYY',
  timePickerInput: 'HH:mm:ss',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

providers: [
  provideOwlDateTime(),
  provideOwlNativeDateTimeWithFormats(customFormats)
]
```

#### `provideOwlUnixTimestampDateTime()`

Provides the Unix timestamp adapter with default formats.

```typescript
providers: [
  provideOwlDateTime(),
  provideOwlUnixTimestampDateTime()
]
```

#### `provideOwlUnixTimestampDateTimeWithFormats(formats)`

Provides the Unix timestamp adapter with custom formats.

```typescript
import { OwlDateTimeFormats, provideOwlDateTime, provideOwlUnixTimestampDateTimeWithFormats } from '@danielmoncada/angular-datetime-picker';

const customFormats: OwlDateTimeFormats = {
  parseInput: 'X',
  fullPickerInput: 'X',
  datePickerInput: 'X',
  timePickerInput: 'X',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

providers: [
  provideOwlDateTime(),
  provideOwlUnixTimestampDateTimeWithFormats(customFormats)
]
```

---

### Optional Configuration

#### `provideOwlDateTimeOptions(options)`

Provides custom options for the date-time picker, such as multi-year view configuration.

```typescript
import { provideOwlDateTime, provideOwlNativeDateTime, provideOwlDateTimeOptions } from '@danielmoncada/angular-datetime-picker';

providers: [
  provideOwlDateTime(),
  provideOwlNativeDateTime(),
  provideOwlDateTimeOptions({
    multiYear: {
      yearsPerRow: 4,
      yearRows: 5
    }
  })
]
```

#### `provideOwlDialog()`

Provides dialog service separately. **Note:** This is automatically included in `provideOwlDateTime()`, so you typically don't need to call this separately.

```typescript
providers: [
  provideOwlDialog() // Only if you need dialog service separately
]
```

## Migration Examples

### Example 1: Basic Setup

**Before:**
```typescript
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';

@NgModule({
  imports: [OwlDateTimeModule, OwlNativeDateTimeModule]
})
export class AppModule { }
```

**After:**
```typescript
import { provideOwlDateTime, provideOwlNativeDateTime } from '@danielmoncada/angular-datetime-picker';

bootstrapApplication(AppComponent, {
  providers: [
    provideOwlDateTime(),
    provideOwlNativeDateTime()
  ]
});
```

### Example 2: With Custom Options

**Before:**
```typescript
import { OwlDateTimeModule, OwlNativeDateTimeModule, OptionsTokens } from '@danielmoncada/angular-datetime-picker';

@NgModule({
  imports: [OwlDateTimeModule, OwlNativeDateTimeModule],
  providers: [
    {
      provide: OptionsTokens.all,
      useValue: {
        multiYear: { yearsPerRow: 4, yearRows: 5 }
      }
    }
  ]
})
export class AppModule { }
```

**After:**
```typescript
import { provideOwlDateTime, provideOwlNativeDateTime, provideOwlDateTimeOptions } from '@danielmoncada/angular-datetime-picker';

bootstrapApplication(AppComponent, {
  providers: [
    provideOwlDateTime(),
    provideOwlNativeDateTime(),
    provideOwlDateTimeOptions({
      multiYear: { yearsPerRow: 4, yearRows: 5 }
    })
  ]
});
```

### Example 3: Unix Timestamp Adapter

**Before:**
```typescript
import { OwlDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { OwlUnixTimestampDateTimeModule } from '@danielmoncada/angular-datetime-picker';

@NgModule({
  imports: [OwlDateTimeModule, OwlUnixTimestampDateTimeModule]
})
export class AppModule { }
```

**After:**
```typescript
import { provideOwlDateTime, provideOwlUnixTimestampDateTime } from '@danielmoncada/angular-datetime-picker';

bootstrapApplication(AppComponent, {
  providers: [
    provideOwlDateTime(),
    provideOwlUnixTimestampDateTime()
  ]
});
```

### Example 4: Standalone Component

```typescript
import { Component } from '@angular/core';
import {
  OwlDateTimeComponent,
  OwlDateTimeTriggerDirective,
  OwlDateTimeInputDirective
} from '@danielmoncada/angular-datetime-picker';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    OwlDateTimeComponent,
    OwlDateTimeTriggerDirective,
    OwlDateTimeInputDirective
  ],
  template: `
    <input [owlDateTime]="dt1" [owlDateTimeTrigger]="dt1">
    <owl-date-time #dt1></owl-date-time>
  `
})
export class DatePickerComponent { }
```

**In main.ts or app.config.ts:**
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideOwlDateTime, provideOwlNativeDateTime } from '@danielmoncada/angular-datetime-picker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideOwlDateTime(),
    provideOwlNativeDateTime()
  ]
};
```

## Lazy Loading

For lazy-loaded routes, you can provide the date-time picker at the route level:

```typescript
import { Route } from '@angular/router';
import { provideOwlDateTime, provideOwlNativeDateTime } from '@danielmoncada/angular-datetime-picker';

export const routes: Route[] = [
  {
    path: 'feature',
    loadComponent: () => import('./feature/feature.component'),
    providers: [
      provideOwlDateTime(),
      provideOwlNativeDateTime()
    ]
  }
];
```

## Troubleshooting

### Error: "No provider found for DateTimeAdapter"

**Solution:** Make sure you're providing a date adapter:

```typescript
providers: [
  provideOwlDateTime(),
  provideOwlNativeDateTime() // ← Don't forget this!
]
```

### Error: "No provider found for OWL_DATE_TIME_FORMATS"

**Solution:** The date adapter provider should include the formats. Make sure you're using the complete provider function like `provideOwlNativeDateTime()`.

### Components not working after migration

**Solution:** Make sure standalone components are imported in your component's `imports` array:

```typescript
@Component({
  standalone: true,
  imports: [
    OwlDateTimeComponent,
    OwlDateTimeTriggerDirective,
    OwlDateTimeInputDirective
  ]
})
```

## Timeline

- **v20.0.0** (Current): Provider functions introduced, NgModules deprecated
- **v21.0.0** (Future): NgModules will be removed

## Need Help?

If you encounter any issues during migration, please open an issue on GitHub with:
- Your current setup (NgModule code)
- What you tried (Provider code)
- The error message you're seeing

Happy migrating! 🚀
