import {Injectable} from '@angular/core';
import * as d3 from 'd3';
import {IHeatmapOptions} from './heatmap/heatmap.component';

@Injectable()
export class D3Service {
  private data: IHeatmapOptions[];
  private svg: any;

  public static createScale(colors: string[], length: number = 10): any {
    return d3.scaleLinear<string>()
      .domain([1, length])
      .range(colors);
  }

  public appendSvg(element: any, svg: string): void {
    this.svg = d3.select(element)
      .html(svg)
      .select(`svg`);
  }

  public appendScale(range: any): void {
    const g = this.svg.append(`g`);

    g.append(`text`)
      .attr(`fill`, `#000`)
      .attr(`y`, 40)
      .attr(`x`, 180)
      .text(`min`);

    g.append(`text`)
      .attr(`fill`, `#000`)
      .attr(`y`, 40)
      .attr(`x`, 280)
      .text(`max`);

    for (let i = 0; i < 10; i += 1) {
      g.append(`rect`)
        .attr(`fill`, range(i))
        .attr(`width`, 10)
        .attr(`height`, 20)
        .attr(`x`, 200 + 10 * i);
    }
  }

  public createLegend() {

  }

  public createMap() {

  }

  public appendLegend() {

  }

  public appendMap() {

  }
}
