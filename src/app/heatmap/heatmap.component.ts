import {Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output} from '@angular/core';
import {D3Service} from '../d3.service';
import {InterfaceHeatmap} from '../interfaces/InterfaceHeatmap';

@Component({
    selector: 'app-heatmap',
    templateUrl: './heatmap.component.html',
    styleUrls: ['./heatmap.component.less']
})
export class HeatmapComponent implements OnDestroy, OnChanges {
    public hoveredId = ``;
    public _data: InterfaceHeatmap[];
    public scale: any;

    private _length = 10;
    private isAsc = false;
    private selectSub;
    private svgSub;

    @Input()
    set svg(svg: string) {
        if (svg) {
            this.d3.setSvg(this.el.nativeElement, svg);
        }
    }

    @Input()
    set length(length: number) {
        if (length) {
            this._length = length;
        }
    }

    @Input()
    set colors(colors: string[]) {
        if (colors) {
            this.scale = D3Service.createScale(colors);
        }
    }

    @Input()
    set data(data: any[]) {
        if (data) {
            this._data = data.map((it, i, arr) => {
                const basis = it.value * this._length / Math.max(...arr.map((item) =>
                    item.value));
                it.width = `${Math.round(basis * 10)}%`;
                it.background = this.scale(basis);
                return it;
            });
        }
    }

    @Output() select: EventEmitter<InterfaceHeatmap> = new EventEmitter();

    constructor(
        private d3: D3Service,
        private el: ElementRef,
    ) {
        this.svgSub = this.d3.svgAppendDetector.subscribe((res) => {
            if (res && typeof res === `boolean`) {
                if (this.scale) {
                    d3.appendScale(this.scale);
                }
            }
        });

        this.selectSub = d3.selectDetector.subscribe((res) => {
            this.select.emit(res);
        });
    }

    ngOnDestroy(): void {
        if (this.selectSub) {
            this.selectSub.unsubscribe();
        }

        if (this.svgSub) {
            this.svgSub.unsubscribe();
        }
    }

    ngOnChanges(): void {
        console.log(`aaa`);
        if (this._data) {
            this.d3.setColors(this._data, this.scale);
        }
    }

    public onSort(sortingField: string = `title`): void {
        this.isAsc = !this.isAsc;
        this._data.sort((a: InterfaceHeatmap, b: InterfaceHeatmap) =>
            (this.isAsc ? 1 : -1) * (a[sortingField] > b[sortingField] ? 1 : -1));
    }
}
