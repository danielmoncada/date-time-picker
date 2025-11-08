/**
 * native-date-time.module
 */

import { NgModule } from '@angular/core';
import { PlatformModule } from '@angular/cdk/platform';
import { DateTimeAdapter } from './date-time-adapter.class';
import { NativeDateTimeAdapter } from './native-date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './date-time-format.class';
import { OWL_NATIVE_DATE_TIME_FORMATS } from './native-date-time-format.class';

/**
 * @deprecated Use `provideOwlNativeDateTime()` instead. This module will be removed in v21.0.0.
 * @see provideOwlNativeDateTime
 */
@NgModule({
    imports: [PlatformModule],
    providers: [
        {provide: DateTimeAdapter, useClass: NativeDateTimeAdapter},
    ],
})
export class NativeDateTimeModule {
}

/**
 * @deprecated Use `provideOwlNativeDateTime()` instead. This module will be removed in v21.0.0.
 *
 * Migration guide:
 * ```typescript
 * // Before:
 * import { OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
 * @NgModule({ imports: [OwlNativeDateTimeModule] })
 *
 * // After:
 * import { provideOwlNativeDateTime } from '@danielmoncada/angular-datetime-picker';
 * providers: [provideOwlNativeDateTime()]
 * ```
 */
@NgModule({
    imports: [NativeDateTimeModule],
    providers: [{provide: OWL_DATE_TIME_FORMATS, useValue: OWL_NATIVE_DATE_TIME_FORMATS}],
})
export class OwlNativeDateTimeModule {
}
