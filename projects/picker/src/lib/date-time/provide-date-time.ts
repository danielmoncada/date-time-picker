/**
 * provide-date-time.ts
 * Provider functions for OwlDateTime in standalone mode
 */

import { EnvironmentProviders, makeEnvironmentProviders, Provider } from '@angular/core';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
import { OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER } from './date-time-picker.component';
import { optionsProviders, Options, OptionsTokens } from './options-provider';
import { OWL_DIALOG_SCROLL_STRATEGY_PROVIDER, OwlDialogService } from '../dialog/dialog.service';

/**
 * Provides the core OwlDateTime functionality without any date adapter.
 * You must also provide a date adapter using `provideOwlNativeDateTime()` or `provideOwlUnixTimestampDateTime()`.
 *
 * This includes:
 * - Date time picker internationalization service
 * - Scroll strategy for picker overlay
 * - Dialog service and scroll strategy (for dialog mode)
 * - Default options configuration
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
export function provideOwlDateTime(): EnvironmentProviders {
  return makeEnvironmentProviders([
    OwlDateTimeIntl,
    OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER,
    OWL_DIALOG_SCROLL_STRATEGY_PROVIDER,
    OwlDialogService,
    ...optionsProviders,
  ]);
}

/**
 * Provides custom options for OwlDateTime.
 * This is optional - default options will be used if not provided.
 *
 * @param options - Custom options for multi-year view configuration
 *
 * @example
 * ```typescript
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideOwlDateTime(),
 *     provideOwlNativeDateTime(),
 *     provideOwlDateTimeOptions({
 *       multiYear: {
 *         yearsPerRow: 4,
 *         yearRows: 5
 *       }
 *     })
 *   ]
 * });
 * ```
 */
export function provideOwlDateTimeOptions(options: Partial<Options>): Provider[] {
  return [
    {
      provide: OptionsTokens.all,
      useValue: options,
    },
    {
      provide: OptionsTokens.multiYear,
      useFactory: (opts: Options) => opts.multiYear,
      deps: [OptionsTokens.all],
    },
  ];
}

/**
 * Provides the core OwlDateTime functionality for component-level usage.
 * Returns regular Provider[] instead of EnvironmentProviders, allowing use in @Component({ providers: [] }).
 *
 * Use this when you want to provide OwlDateTime configuration at the component level
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
export function owlDateTimeProviders(): Provider[] {
  return [
    OwlDateTimeIntl,
    OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER,
    OWL_DIALOG_SCROLL_STRATEGY_PROVIDER,
    OwlDialogService,
    ...optionsProviders,
  ];
}
