/**
 * calendar-body.component
 */

import { ChangeDetectionStrategy, Component, ElementRef, OnInit, afterNextRender, inject, input, output, Injector } from '@angular/core';
import { SelectMode } from './date-time.class';
import { NgClass } from '@angular/common';

export class CalendarCell {
    constructor(
        public value: number,
        public displayValue: string,
        public ariaLabel: string,
        public enabled: boolean,
        public out: boolean = false,
        public cellClass: string = ''
    ) {}
}

@Component({
    selector: '[owl-date-time-calendar-body]',
    exportAs: 'owlDateTimeCalendarBody',
    templateUrl: './calendar-body.component.html',
    styleUrls: ['./calendar-body.component.scss'],
    host: {
        '[class.owl-dt-calendar-body]': 'owlDTCalendarBodyClass'
    },
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass]
})
export class OwlCalendarBodyComponent implements OnInit {
    private elmRef = inject(ElementRef);
    private injector = inject(Injector);

    /**
     * The cell number of the active cell in the table.
     */
    readonly activeCell = input(0);

    /**
     * The cells to display in the table.
     * */
    readonly rows = input<CalendarCell[][]>(undefined);

    /**
     * The number of columns in the table.
     * */
    readonly numCols = input(7);

    /**
     * The ratio (width / height) to use for the cells in the table.
     */
    readonly cellRatio = input(1);

    /**
     * The value in the table that corresponds to today.
     * */
    readonly todayValue = input<number>(undefined);

    /**
     * The value in the table that is currently selected.
     * */
    readonly selectedValues = input<number[]>(undefined);

    /**
     * Current picker select mode
     */
    readonly selectMode = input<SelectMode>(undefined);

    /**
     * Emit when a calendar cell is selected
     * */
    public readonly select = output<CalendarCell>();

    get owlDTCalendarBodyClass(): boolean {
        return true;
    }

    get isInSingleMode(): boolean {
        return this.selectMode() === 'single';
    }

    get isInRangeMode(): boolean {
        const selectMode = this.selectMode();
        return (
            selectMode === 'range' ||
            selectMode === 'rangeFrom' ||
            selectMode === 'rangeTo'
        );
    }

    public ngOnInit() {}

    public selectCell(cell: CalendarCell): void {
        this.select.emit(cell);
    }

    public isActiveCell(rowIndex: number, colIndex: number): boolean {
        const cellNumber = rowIndex * this.numCols() + colIndex;
        return cellNumber === this.activeCell();
    }

    /**
     * Check if the cell is selected
     */
    public isSelected(value: number): boolean {
        const selectedValues = this.selectedValues();
        if (!selectedValues || selectedValues.length === 0) {
            return false;
        }

        if (this.isInSingleMode) {
            return value === selectedValues[0];
        }

        if (this.isInRangeMode) {
            const fromValue = selectedValues[0];
            const toValue = selectedValues[1];

            return value === fromValue || value === toValue;
        }
    }

    /**
     * Check if the cell in the range
     * */
    public isInRange(value: number): boolean {
        if (this.isInRangeMode) {
            const fromValue = this.selectedValues()[0];
            const toValue = this.selectedValues()[1];

            if (fromValue !== null && toValue !== null) {
                return value >= fromValue && value <= toValue;
            } else {
                return value === fromValue || value === toValue;
            }
        }
    }

    /**
     * Check if the cell is the range from
     * */
    public isRangeFrom(value: number): boolean {
        if (this.isInRangeMode) {
            const fromValue = this.selectedValues()[0];
            return fromValue !== null && value === fromValue;
        }
    }

    /**
     * Check if the cell is the range to
     * */
    public isRangeTo(value: number): boolean {
        if (this.isInRangeMode) {
            const toValue = this.selectedValues()[1];
            return toValue !== null && value === toValue;
        }
    }

    /**
     * Focus to a active cell
     * */
    public focusActiveCell(): void {
        afterNextRender(() => {
            const activeCell = this.elmRef.nativeElement
                .querySelector('.owl-dt-calendar-cell-active');
            if (activeCell) {
                activeCell.focus();
            }
        }, { injector: this.injector });
    }
}
