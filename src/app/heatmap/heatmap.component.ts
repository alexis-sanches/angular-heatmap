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
    public _options;

    @Input()
    set options(options: object) {
        if (options) {
            this._options = options;
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
