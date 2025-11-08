/**
 * provide-unix-timestamp-date-time.ts
 * Provider functions for Unix timestamp adapter
 */

import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { DateTimeAdapter } from '../date-time-adapter.class';
import { UnixTimestampDateTimeAdapter } from './unix-timestamp-date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS, OwlDateTimeFormats } from '../date-time-format.class';
import { OWL_UNIX_TIMESTAMP_DATE_TIME_FORMATS } from './unix-timestamp-date-time-format.class';

/**
 * Provides the Unix timestamp adapter for OwlDateTime.
 * This includes both the adapter and the default date formats.
 *
 * @example
 * ```typescript
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideOwlDateTime(),
 *     provideOwlUnixTimestampDateTime()
 *   ]
 * });
 * ```
 */
export function provideOwlUnixTimestampDateTime(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: DateTimeAdapter, useClass: UnixTimestampDateTimeAdapter },
    { provide: OWL_DATE_TIME_FORMATS, useValue: OWL_UNIX_TIMESTAMP_DATE_TIME_FORMATS },
  ]);
}

/**
 * Provides the Unix timestamp adapter with custom formats.
 *
 * @param formats - Custom date time formats
 *
 * @example
 * ```typescript
 * const customFormats: OwlDateTimeFormats = {
 *   parseInput: 'X',
 *   fullPickerInput: 'X',
 *   datePickerInput: 'X',
 *   timePickerInput: 'X',
 *   monthYearLabel: 'MMM YYYY',
 *   dateA11yLabel: 'LL',
 *   monthYearA11yLabel: 'MMMM YYYY',
 * };
 *
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideOwlDateTime(),
 *     provideOwlUnixTimestampDateTimeWithFormats(customFormats)
 *   ]
 * });
 * ```
 */
export function provideOwlUnixTimestampDateTimeWithFormats(formats: OwlDateTimeFormats): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: DateTimeAdapter, useClass: UnixTimestampDateTimeAdapter },
    { provide: OWL_DATE_TIME_FORMATS, useValue: formats },
  ]);
}
