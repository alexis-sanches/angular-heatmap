import {EventEmitter, Injectable} from '@angular/core';
import * as d3 from 'd3';
import {InterfaceHeatmap} from './interfaces/InterfaceHeatmap';

@Injectable()
export class D3Service {
    private element: any;

    public svg: any;

    public selectDetector: EventEmitter<InterfaceHeatmap> = new EventEmitter();

    public svgAppendDetector: EventEmitter<any> = new EventEmitter();

    public static createScale(colors: string[], length: number = 10): any {
        const domain = [1];

        for (let i = 0; i < colors.length - 1; i++) {
            domain.push((i + 1) * length / (colors.length - 1));
        }

        return d3.scaleLinear<string>()
            .domain(domain)
            .range(colors);
    }


    public appendScale(scale: any): void {
        const g = this.svg.append(`g`);

        // Добавляем подписи к шкале
        g.append(`text`)
            .attr(`y`, 20)
            .attr(`x`, 200)
            .text(`МИН`);

        g.append(`text`)
            .attr(`y`, 20)
            .attr(`x`, 278)
            .text(`МАКС`);

        // Формируется шкала
        for (let i = 0; i < 10; i += 1) {
            g.append(`rect`)
                .attr(`fill`, scale(i))
                .attr(`width`, 10)
                .attr(`height`, 10)
                .attr(`x`, 200 + 10 * i);
        }
    }


    public setSvg(element: any, svg: string): void {
        this.element = d3.select(element);
        d3.xml(svg)
            .mimeType(`image/svg+xml`)
            .get((error, file) => {
                if (error) {
                    this.svgAppendDetector.next(error);
                    throw error;
                }
                this.svg = d3.select(this.element.select(`.container`)
                    .node()
                    .appendChild(file.documentElement)).style(`width`, `100%`);
                this.svgAppendDetector.next(true);
            });
    }

    public setColors(data: any[], scale: any, length: number = 10): void {
        // Количество переделок: 7
        // Часов потрачено здесь: 52

        for (let i = 0; i < data.length; i += 1) {
            const polygon = this.svg.select(`#svg_${data[i].id}`);
            const tr = this.element.select(`#row_${data[i].id}`);
            const j = (data[i].value / (Math.max(...data.map((it) => it.value))) * length);

            tr.style(`cursor`, `pointer`)
                .on(`mouseover`, function () {
                    d3.select(this)
                        .style(`font-weight`, `bold`);
                    polygon.style(`stroke`, `#999999`);
                })
                .on(`mouseout`, function () {
                    d3.select(this).style(`font-weight`, `normal`);
                    polygon.style(`stroke`, `#F0F1F5`);
                });

            polygon.style(`fill`, scale(j))
                .style(`cursor`, `pointer`)
                .on(`click`, () => {
                    this.selectDetector.next(data[i]);
                })
                .on(`mouseover`, function() {
                    d3.select(this)
                        .style(`stroke`, `#999999`);
                    tr.style(`font-weight`, `bold`);
                })
                .on(`mouseout`, function () {
                    d3.select(this)
                        .style(`stroke`, `#F0F1F5`);
                    tr.style(`font-weight`, `normal`);
                });
        }
    }
}
