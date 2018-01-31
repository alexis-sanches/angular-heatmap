import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
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
export class HeatmapComponent {
    private _svg: string;
    private _colors: string[];
    private _data: IHeatmapOptions[];
    private scale;

    @Input()
    set options(options: any) {
        if (options) {
            this.d3.init(options, this.el.nativeElement);
        }
    }

    @Output() select: EventEmitter<IHeatmapOptions> = new EventEmitter();

    @Output() sort: EventEmitter<string> = new EventEmitter();

    constructor(private d3: D3Service, private el: ElementRef) {
        d3.selectDetector.subscribe((res) => {
            this.select.emit(res);
        });
    }
}
