import {
    AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy,
    Output
} from '@angular/core';
import {D3Service} from '../d3.service';

export interface IHeatmapOptions {
    id: string;
    title: string;
    value: number;
}

@Component({
    selector: 'app-heatmap',
    templateUrl: './heatmap.component.html',
    styleUrls: ['./heatmap.component.less']
})
export class HeatmapComponent implements OnDestroy {
    public _data;
    public _svg;
    private _colors: string[];
    private isAsc = false;
    private selectSub;
    private svgSub;

    @Input()
    set svg(svg: string) {
        if (svg) {
            this._svg = svg;
            this.d3.setSvg(this.el.nativeElement, svg);
        }
    }

    @Input()
    set colors(colors: string[]) {
        if (colors) {
            this._colors = colors;
        }
    }

    @Input()
    set data(data: IHeatmapOptions[]) {
        if (data) {
            this._data = data;
            if (this.d3.svg) {
                if (this._colors) {
                    this.d3.createScale(this._colors);
                    this.d3.setColors(this._data);
                }
            } else {
                this.onDataRetrieval();
            }
        }
    }


    @Output() select: EventEmitter<IHeatmapOptions> = new EventEmitter();

    @Output() sort: EventEmitter<string> = new EventEmitter();

    constructor(private d3: D3Service, private el: ElementRef) {
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

    public onDataRetrieval(): void {
        this.svgSub = this.d3.svgAppendDetector.subscribe((res) => {
            if (res && typeof res === `boolean`) {
                if (this._data && this._colors) {
                    this.d3.createScale(this._colors);
                    this.d3.setColors(this._data);
                }
            }
        });
    }

    public onSort(sortingField: string = `title`): void {
        this.isAsc = !this.isAsc;
        this._data.sort((a: IHeatmapOptions, b: IHeatmapOptions) =>
            (this.isAsc ? 1 : -1) * (a[sortingField] > b[sortingField] ? 1 : -1));
        this.d3.setData(this._data);
    }
}
