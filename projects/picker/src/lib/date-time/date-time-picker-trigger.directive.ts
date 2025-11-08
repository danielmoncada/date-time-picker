/**
 * date-time-picker-trigger.directive
 */


import { AfterContentInit, ChangeDetectorRef, Directive, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, inject, input } from '@angular/core';
import { OwlDateTimeComponent } from './date-time-picker.component';
import { merge, of as observableOf, Subscription } from 'rxjs';

@Directive({
    selector: '[owlDateTimeTrigger]',
    host: {
        '(click)': 'handleClickOnHost($event)',
        '[class.owl-dt-trigger-disabled]': 'owlDTTriggerDisabledClass'
    }
})
export class OwlDateTimeTriggerDirective<T> implements OnInit, OnChanges, AfterContentInit, OnDestroy {
    protected changeDetector = inject(ChangeDetectorRef);


    readonly dtPicker = input<OwlDateTimeComponent<T>>(undefined, { alias: "owlDateTimeTrigger" });

    private _disabled: boolean;
    @Input()
    get disabled(): boolean {
        return this._disabled === undefined ? this.dtPicker().disabled : !!this._disabled;
    }

    set disabled( value: boolean ) {
        this._disabled = value;
    }

    get owlDTTriggerDisabledClass(): boolean {
        return this.disabled;
    }

    private stateChanges = Subscription.EMPTY;

    public ngOnInit(): void {
    }

    public ngOnChanges( changes: SimpleChanges ) {
        if (changes.datepicker) {
            this.watchStateChanges();
        }
    }

    public ngAfterContentInit() {
        this.watchStateChanges();
    }

    public ngOnDestroy(): void {
        this.stateChanges.unsubscribe();
    }

    public handleClickOnHost( event: Event ): void {
        const dtPicker = this.dtPicker();
        if (dtPicker) {
            dtPicker.open();
            event.stopPropagation();
        }
    }

    private watchStateChanges(): void {
        this.stateChanges.unsubscribe();

        const dtPicker = this.dtPicker();
        const inputDisabled = dtPicker && dtPicker.dtInput ?
            dtPicker.dtInput.disabledChange : observableOf();

        const dtPickerValue = this.dtPicker();
        const pickerDisabled = dtPickerValue ?
            dtPickerValue.disabledChange : observableOf();

        this.stateChanges = merge([pickerDisabled, inputDisabled])
            .subscribe(() => {
                this.changeDetector.markForCheck();
            });
    }
}
