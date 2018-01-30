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
  private data: IHeatmapOptions[];
  private scale;

  @Input()
  set svg(svg: string) {
    if (svg) {
      this.d3.appendSvg(this.el.nativeElement, svg);
    }
  }

  @Input()
  set colors(colors: string[]) {
    if (colors) {
      this.d3.appendScale(D3Service.createScale(colors));
    }
  }

  @Output() select: EventEmitter<IHeatmapOptions> = new EventEmitter();

  @Output() sort: EventEmitter<string> = new EventEmitter();

  constructor(private d3: D3Service, private el: ElementRef) {}
}
