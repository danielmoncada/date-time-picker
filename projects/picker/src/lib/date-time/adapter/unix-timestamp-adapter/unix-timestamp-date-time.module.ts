/**
 * unix-timestamp-date-time.module
 */

import {NgModule} from '@angular/core';
import {PlatformModule} from '@angular/cdk/platform';
import {DateTimeAdapter} from '../date-time-adapter.class';
import {OWL_DATE_TIME_FORMATS} from '../date-time-format.class';
import {UnixTimestampDateTimeAdapter} from './unix-timestamp-date-time-adapter.class';
import {OWL_UNIX_TIMESTAMP_DATE_TIME_FORMATS} from './unix-timestamp-date-time-format.class';

/**
 * @deprecated Use `provideOwlUnixTimestampDateTime()` instead. This module will be removed in v21.0.0.
 * @see provideOwlUnixTimestampDateTime
 */
@NgModule({
    imports: [PlatformModule],
    providers: [
        {provide: DateTimeAdapter, useClass: UnixTimestampDateTimeAdapter},
    ],
})
export class UnixTimestampDateTimeModule {
}

/**
 * @deprecated Use `provideOwlUnixTimestampDateTime()` instead. This module will be removed in v21.0.0.
 *
 * Migration guide:
 * ```typescript
 * // Before:
 * import { OwlUnixTimestampDateTimeModule } from '@danielmoncada/angular-datetime-picker';
 * @NgModule({ imports: [OwlUnixTimestampDateTimeModule] })
 *
 * // After:
 * import { provideOwlUnixTimestampDateTime } from '@danielmoncada/angular-datetime-picker';
 * providers: [provideOwlUnixTimestampDateTime()]
 * ```
 */
@NgModule({
    imports: [UnixTimestampDateTimeModule],
    providers: [{provide: OWL_DATE_TIME_FORMATS, useValue: OWL_UNIX_TIMESTAMP_DATE_TIME_FORMATS}],
})
export class OwlUnixTimestampDateTimeModule {
}
