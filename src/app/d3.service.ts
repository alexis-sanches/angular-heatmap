import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable()
export class D3Service {
  public static getNewScale(length: number, colorFrom: string, colorTo: string) {
    const body = d3.select(`body`);
    const color = d3.scaleLinear().domain([1, length])
      .interpolate(d3.interpolateHcl)
      .range([d3.rgb('#007AFF'), d3.rgb('#FFF500')]);

    for (let i = 0; i < length; i++) {
      body.append('div').attr('style', function (d) {
        return 'background-color: ' + color(i);
      });
    }
  }

  public static appendSvg(id: string, svg: string) {
    d3.select(`#${id}`).append(`div`).html(svg);
  }
}
