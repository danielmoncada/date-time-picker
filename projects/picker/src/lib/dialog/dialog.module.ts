/**
 * dialog.module
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { OWL_DIALOG_SCROLL_STRATEGY_PROVIDER, OwlDialogService } from './dialog.service';
import { OwlDialogContainerComponent } from './dialog-container.component';

/**
 * @deprecated Use `provideOwlDialog()` instead. This module will be removed in v21.0.0.
 * Note: Dialog providers are automatically included in `provideOwlDateTime()`.
 *
 * Migration guide:
 * ```typescript
 * // Before:
 * import { OwlDialogModule } from '@danielmoncada/angular-datetime-picker';
 * @NgModule({ imports: [OwlDialogModule] })
 *
 * // After (if using separately):
 * import { provideOwlDialog } from '@danielmoncada/angular-datetime-picker';
 * providers: [provideOwlDialog()]
 *
 * // Or just use provideOwlDateTime() which includes it:
 * import { provideOwlDateTime } from '@danielmoncada/angular-datetime-picker';
 * providers: [provideOwlDateTime()]
 * ```
 */
@NgModule({
    imports: [CommonModule, A11yModule, OverlayModule, PortalModule, OwlDialogContainerComponent],
    exports: [],
    providers: [
        OWL_DIALOG_SCROLL_STRATEGY_PROVIDER,
        OwlDialogService,
    ]
})
export class OwlDialogModule {
}
