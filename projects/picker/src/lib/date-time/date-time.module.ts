/**
 * date-time.module
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { OwlDateTimeTriggerDirective } from './date-time-picker-trigger.directive';
import { OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER, OwlDateTimeComponent } from './date-time-picker.component';
import { OwlDateTimeContainerComponent } from './date-time-picker-container.component';
import { OwlDateTimeInputDirective } from './date-time-picker-input.directive';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
import { OwlMonthViewComponent } from './calendar-month-view.component';
import { OwlCalendarBodyComponent } from './calendar-body.component';
import { OwlYearViewComponent } from './calendar-year-view.component';
import { OwlMultiYearViewComponent } from './calendar-multi-year-view.component';
import { OwlTimerBoxComponent } from './timer-box.component';
import { OwlTimerComponent } from './timer.component';
import { NumberFixedLenPipe } from './numberedFixLen.pipe';
import { OwlCalendarComponent } from './calendar.component';
import { OwlDateTimeInlineComponent } from './date-time-inline.component';
import { OwlDialogModule } from '../dialog/dialog.module';
import { optionsProviders } from './options-provider';

/**
 * @deprecated Use `provideOwlDateTime()` instead. This module will be removed in v21.0.0.
 *
 * Migration guide:
 * ```typescript
 * // Before (NgModule approach):
 * import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
 *
 * @NgModule({
 *   imports: [OwlDateTimeModule, OwlNativeDateTimeModule]
 * })
 * export class AppModule { }
 *
 * // After (Standalone/Provider approach):
 * import { provideOwlDateTime, provideOwlNativeDateTime } from '@danielmoncada/angular-datetime-picker';
 *
 * // For standalone app:
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideOwlDateTime(),
 *     provideOwlNativeDateTime()
 *   ]
 * });
 *
 * // For existing NgModule app:
 * @NgModule({
 *   providers: [
 *     provideOwlDateTime(),
 *     provideOwlNativeDateTime()
 *   ]
 * })
 * export class AppModule { }
 * ```
 */
@NgModule({
    imports: [CommonModule, OverlayModule, OwlDialogModule, A11yModule, OwlDateTimeTriggerDirective,
        OwlDateTimeInputDirective,
        OwlDateTimeComponent,
        OwlDateTimeContainerComponent,
        OwlMultiYearViewComponent,
        OwlYearViewComponent,
        OwlMonthViewComponent,
        OwlTimerComponent,
        OwlTimerBoxComponent,
        OwlCalendarComponent,
        OwlCalendarBodyComponent,
        NumberFixedLenPipe,
        OwlDateTimeInlineComponent],
    exports: [
        OwlCalendarComponent,
        OwlTimerComponent,
        OwlDateTimeTriggerDirective,
        OwlDateTimeInputDirective,
        OwlDateTimeComponent,
        OwlDateTimeInlineComponent,
        OwlMultiYearViewComponent,
        OwlYearViewComponent,
        OwlMonthViewComponent,
    ],
    providers: [
        OwlDateTimeIntl,
        OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER,
        ...optionsProviders,
    ]
})
export class OwlDateTimeModule {
}
