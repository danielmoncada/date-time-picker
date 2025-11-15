/**
 * picker
 */

// ============================================================================
// Standalone Provider Functions (Recommended for new projects)
// ============================================================================

export {
  provideOwlDateTime,
  provideOwlDateTimeOptions,
  owlDateTimeProviders
} from './lib/date-time/provide-date-time';

export {
  provideOwlNativeDateTime,
  provideOwlNativeDateTimeWithFormats,
  owlNativeDateTimeProviders,
  owlNativeDateTimeProvidersWithFormats
} from './lib/date-time/adapter/provide-native-date-time';

export {
  provideOwlUnixTimestampDateTime,
  provideOwlUnixTimestampDateTimeWithFormats
} from './lib/date-time/adapter/unix-timestamp-adapter/provide-unix-timestamp-date-time';

export { provideOwlDialog } from './lib/dialog/provide-dialog';

// ============================================================================
// NgModules (Deprecated - use provider functions instead)
// ============================================================================

/**
 * @deprecated Use `provideOwlDateTime()` instead. Will be removed in v21.0.0.
 * @example
 * Before:
 * ```typescript
 * import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
 *
 * @NgModule({
 *   imports: [OwlDateTimeModule, OwlNativeDateTimeModule]
 * })
 * ```
 * After:
 * ```typescript
 * import { provideOwlDateTime, provideOwlNativeDateTime } from '@danielmoncada/angular-datetime-picker';
 *
 * bootstrapApplication(AppComponent, {
 *   providers: [provideOwlDateTime(), provideOwlNativeDateTime()]
 * });
 * ```
 */
export { OwlDateTimeModule } from './lib/date-time/date-time.module';

/**
 * @deprecated Use `provideOwlNativeDateTime()` instead. Will be removed in v21.0.0.
 */
export { OwlNativeDateTimeModule } from './lib/date-time/adapter/native-date-time.module';

// ============================================================================
// Services, Components, Directives, and Types
// ============================================================================

export { OwlDateTimeIntl } from './lib/date-time/date-time-picker-intl.service';

export {
  OWL_DATE_TIME_LOCALE_PROVIDER,
  OWL_DATE_TIME_LOCALE,
  DateTimeAdapter,

} from './lib/date-time/adapter/date-time-adapter.class';

export { OWL_DATE_TIME_FORMATS, OwlDateTimeFormats } from './lib/date-time/adapter/date-time-format.class';

export {
  UnixTimestampDateTimeAdapter
} from './lib/date-time/adapter/unix-timestamp-adapter/unix-timestamp-date-time-adapter.class';

export { OWL_UNIX_TIMESTAMP_DATE_TIME_FORMATS } from './lib/date-time/adapter/unix-timestamp-adapter/unix-timestamp-date-time-format.class';

export { OwlDateTimeInlineComponent } from './lib/date-time/date-time-inline.component';

export { OwlDateTimeComponent } from './lib/date-time/date-time-picker.component';

export * from './lib/date-time/calendar-body.component';

export * from './lib/date-time/timer.component';

export * from './lib/date-time/date-time-picker-trigger.directive';

export * from './lib/date-time/date-time-picker-input.directive';

export * from './lib/date-time/calendar-multi-year-view.component';

export * from './lib/date-time/calendar-year-view.component';

export * from './lib/date-time/calendar-month-view.component';

export * from './lib/date-time/calendar.component';

export { NativeDateTimeAdapter } from './lib/date-time/adapter/native-date-time-adapter.class';

export * from './lib/date-time/options-provider';

export { PickerType, PickerMode, SelectMode, DateView, DateViewType } from './lib/date-time/date-time.class'
