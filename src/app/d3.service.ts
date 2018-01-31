import {EventEmitter, Injectable} from '@angular/core';
import * as d3 from 'd3';
import {IHeatmapOptions} from './heatmap/heatmap.component';

@Injectable()
export class D3Service {
    private element: any;
    private svg: any;
    private scale: any;
    public selectDetector: EventEmitter<IHeatmapOptions> = new EventEmitter();

    /**
     *
     * @param options
     * @param element
     * @param {number} length
     */

    public init(options: any, element: any, length: number = 10) {
        this.element = d3.select(element).append(`div`).attr(`style`, `display: flex; align-items: flex-start`);
        this.svg = this.element.html(options.svg).select(`svg`).attr(`width`, `70%`);

        this.createScale(options.colors, length);
        this.setData(options.data);
    }

    /**
     *
     * @param {string[]} colors
     * @param {number} length
     * @return {any}
     */

    public createScale(colors: string[], length: number = 10): any {
        const domain = [1];

        for (let i = 0; i < colors.length - 1; i++) {
            domain.push((i + 1) * length / (colors.length - 1));
        }

        this.scale = d3.scaleLinear<string>()
            .domain(domain)
            .range(colors);

        this.appendScale();
    }

    /**
     *
     */

    private appendScale(): void {
        const g = this.svg.append(`g`);

        g.append(`text`)
            .attr(`y`, 20)
            .attr(`x`, 200)
            .text(`МИН`);

        g.append(`text`)
            .attr(`y`, 20)
            .attr(`x`, 278)
            .text(`МАКС`);

        for (let i = 0; i < 10; i += 1) {
            g.append(`rect`)
                .attr(`fill`, this.scale(i))
                .attr(`width`, 10)
                .attr(`height`, 10)
                .attr(`x`, 200 + 10 * i);
        }
    }

    /**
     *
     * @param {IHeatmapOptions[]} data
     * @param {number} length
     */

    public setData(data: IHeatmapOptions[], length: number = 10) {
        const table = this.element.append(`table`).attr(`style`, `margin-left: 40px; border-spacing: 15px 10px`);
        const values = data.map((it) => it.value);
        const th = table.append(`tr`);

        th.append(`th`).text(`Количество`);
        th.append(`th`).text(`Название`);

        for (let i = 0; i < data.length; i++) {
            const tr = table.append(`tr`);
            const j = (data[i].value / (Math.max(...values)) * length);

            this.svg.select(`#${data[i].id}`)
                .attr(`style`, `fill: ${this.scale(j)}`)
                .on(`click`, () => {
                    this.selectDetector.next(data[i]);
                });

            tr.append(`td`)
                .append(`div`)
                .attr(`style`, `width: 140px; height: 20px; display: flex; justify-content: flex-end;`)
                .append(`div`)
                .attr(`style`, `width: ${Math.round(j * 10)}%; background-color: ${this.scale(j)}; text-align: right;`)
                .text(data[i].value);

            tr.append(`td`)
                .text(data[i].title);
        }
    }
}
