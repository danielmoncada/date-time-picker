/**
 * provide-native-date-time.ts
 * Provider functions for native JavaScript Date adapter
 */

import { EnvironmentProviders, makeEnvironmentProviders, Provider } from '@angular/core';
import { DateTimeAdapter } from './date-time-adapter.class';
import { NativeDateTimeAdapter } from './native-date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS, OwlDateTimeFormats } from './date-time-format.class';
import { OWL_NATIVE_DATE_TIME_FORMATS } from './native-date-time-format.class';

/**
 * Provides the native JavaScript Date adapter for OwlDateTime.
 * This includes both the adapter and the default date formats.
 *
 * @example
 * ```typescript
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideOwlDateTime(),
 *     provideOwlNativeDateTime()
 *   ]
 * });
 * ```
 */
export function provideOwlNativeDateTime(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: DateTimeAdapter, useClass: NativeDateTimeAdapter },
    { provide: OWL_DATE_TIME_FORMATS, useValue: OWL_NATIVE_DATE_TIME_FORMATS },
  ]);
}

/**
 * Provides the native JavaScript Date adapter with custom formats.
 *
 * @param formats - Custom date time formats
 *
 * @example
 * ```typescript
 * const customFormats: OwlDateTimeFormats = {
 *   parseInput: 'DD/MM/YYYY HH:mm',
 *   fullPickerInput: 'DD/MM/YYYY HH:mm:ss',
 *   datePickerInput: 'DD/MM/YYYY',
 *   timePickerInput: 'HH:mm:ss',
 *   monthYearLabel: 'MMM YYYY',
 *   dateA11yLabel: 'LL',
 *   monthYearA11yLabel: 'MMMM YYYY',
 * };
 *
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideOwlDateTime(),
 *     provideOwlNativeDateTimeWithFormats(customFormats)
 *   ]
 * });
 * ```
 */
export function provideOwlNativeDateTimeWithFormats(formats: OwlDateTimeFormats): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: DateTimeAdapter, useClass: NativeDateTimeAdapter },
    { provide: OWL_DATE_TIME_FORMATS, useValue: formats },
  ]);
}

/**
 * Provides the native JavaScript Date adapter for component-level usage.
 * Returns regular Provider[] instead of EnvironmentProviders, allowing use in @Component({ providers: [] }).
 *
 * Use this when you want to provide the date adapter at the component level
 * rather than globally in main.ts.
 *
 * @example
 * ```typescript
 * @Component({
 *   providers: [
 *     ...owlDateTimeProviders(),
 *     ...owlNativeDateTimeProviders()
 *   ]
 * })
 * export class MyPickerComponent { }
 * ```
 */
export function owlNativeDateTimeProviders(): Provider[] {
  return [
    { provide: DateTimeAdapter, useClass: NativeDateTimeAdapter },
    { provide: OWL_DATE_TIME_FORMATS, useValue: OWL_NATIVE_DATE_TIME_FORMATS },
  ];
}

/**
 * Provides the native JavaScript Date adapter with custom formats for component-level usage.
 * Returns regular Provider[] instead of EnvironmentProviders, allowing use in @Component({ providers: [] }).
 *
 * @param formats - Custom date time formats
 *
 * @example
 * ```typescript
 * const customFormats: OwlDateTimeFormats = {
 *   parseInput: 'DD/MM/YYYY HH:mm',
 *   fullPickerInput: 'DD/MM/YYYY HH:mm:ss',
 *   datePickerInput: 'DD/MM/YYYY',
 *   timePickerInput: 'HH:mm:ss',
 *   monthYearLabel: 'MMM YYYY',
 *   dateA11yLabel: 'LL',
 *   monthYearA11yLabel: 'MMMM YYYY',
 * };
 *
 * @Component({
 *   providers: [
 *     ...owlDateTimeProviders(),
 *     ...owlNativeDateTimeProvidersWithFormats(customFormats)
 *   ]
 * })
 * export class MyPickerComponent { }
 * ```
 */
export function owlNativeDateTimeProvidersWithFormats(formats: OwlDateTimeFormats): Provider[] {
  return [
    { provide: DateTimeAdapter, useClass: NativeDateTimeAdapter },
    { provide: OWL_DATE_TIME_FORMATS, useValue: formats },
  ];
}
