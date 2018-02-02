import {AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
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
export class HeatmapComponent implements AfterViewInit {
    public _data;
    public _svg;

    @Input()
    set svg(svg: string) {
        if (svg) {
            this.d3.setSvg(this.el.nativeElement, svg);
            this._svg = svg;
        }
    }

    @Input()
    set colors(colors: string[]) {
        if (colors) {
            this.d3.createScale(colors);
        }
    }

    @Input()
    set data(data: IHeatmapOptions[]) {
        if (data) {
            this._data = data;
            this.d3.setData(data);
        }
    }


    @Output() select: EventEmitter<IHeatmapOptions> = new EventEmitter();

    @Output() sort: EventEmitter<string> = new EventEmitter();

    constructor(private d3: D3Service, private el: ElementRef) {
        d3.selectDetector.subscribe((res) => {
            this.select.emit(res);
        });
    }

    ngAfterViewInit() {
        this.d3.init(this._options, this.el.nativeElement);
    }
}
