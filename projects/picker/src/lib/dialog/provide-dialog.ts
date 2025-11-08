/**
 * provide-dialog.ts
 * Provider functions for OwlDialog in standalone mode
 */

import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { OWL_DIALOG_SCROLL_STRATEGY_PROVIDER, OwlDialogService } from './dialog.service';

/**
 * Provides the OwlDialog service and its dependencies.
 * This is required for dialog mode date-time picker.
 *
 * Note: This is automatically included when using `provideOwlDateTime()`,
 * so you typically don't need to call this separately.
 *
 * @example
 * ```typescript
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideOwlDialog()
 *   ]
 * });
 * ```
 */
export function provideOwlDialog(): EnvironmentProviders {
  return makeEnvironmentProviders([
    OWL_DIALOG_SCROLL_STRATEGY_PROVIDER,
    OwlDialogService,
  ]);
}
