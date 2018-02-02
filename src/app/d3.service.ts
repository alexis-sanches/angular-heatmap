import {EventEmitter, Injectable} from '@angular/core';
import * as d3 from 'd3';
import {IHeatmapOptions} from './heatmap/heatmap.component';

@Injectable()
export class D3Service {
    private element: any;
    public svg: any;
    private scale: any;
    private sortByTitle = true;
    private isAsc = true;
    public selectDetector: EventEmitter<IHeatmapOptions> = new EventEmitter();

    /**
     *
     * @param options
     * @param element
     * @param {number} length
     */

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
        console.log(this.svg);
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
        // const legend = {
        //     title: `Название`,
        //     value: `Количество`
        // };
        // const columns = Object.keys(legend);
        // const table = this.element.select(`table`);

        // table.select(`thead`)
        //     .append(`tr`)
        //     .selectAll(`th`)
        //     .data(columns)
        //     .enter()
        //     .append(`th`)
        //     .text((column) => legend[column]).on(`click`, () => {
        //         data.sort((a, b) => Math.pow(-1, Math.round(Math.random()) + 1) *  (a.value - b.value));
        //     });
        //
        // const rows = table.select(`tbody`)
        //     .selectAll(`tr`)
        //     .data(data)
        //     .enter()
        //     .append(`tr`);
        //
        // const cells = rows.selectAll(`td`)
        //     .data((row) =>
        //         columns.map((column) =>
        //             ({column, value: row[column]})))
        //     .enter()
        //     .append(`td`)
        //     .text((d) => d.value);

        // const th = table.select(`tr`);
        // th.append(`th`).text(`Количество`).on(`click`, () => {
        //     data.sort((a, b) => d3.ascending(a.value, b.value));
        //     console.log(data);
        // });
        // th.append(`th`).text(`Название`).on(`click`, () => {
        //     console.log(`sort by title`);
        // });

        // const values = data.map((it) => it.value);
        // const tr = table.selectAll(`tr`);
        //
        // tr.select(`.item`).select(`div`).style(``).style(`width`, `${Math.round(j * 10)}%`)
        //     .style(`background-color`, this.scale(j))
        //     .style(`text-align`, `right`)
        //
        //
        // for (let i = 0; i < data.length; i++) {
        //     const className = `.${data[i].id}`;
        //
        //     const polygon = this.svg.select(`#${data[i].id}`);
        //     const j = (data[i].value / (Math.max(...values)) * length);
        //
        //     tr.style(`cursor`, `pointer`)
        //         .on(`mouseover`, function () {
        //             d3.select(this).style(`font-weight`, `bold`);
        //             polygon.style(`stroke`, `#999999`);
        //         })
        //         .on(`mouseout`, function () {
        //             d3.select(this).style(`font-weight`, `normal`);
        //             polygon.style(`stroke`, `#F0F1F5`);
        //         });
        //
        //     polygon.style(`fill`, this.scale(j))
        //         .style(`cursor`, `pointer`)
        //         .on(`click`, () => {
        //             this.selectDetector.next(data[i]);
        //         })
        //         .on(`mouseover`, function() {
        //             d3.select(this).style(`stroke`, `#999999`);
        //             tr.style(`font-weight`, `bold`);
        //         })
        //         .on(`mouseout`, function () {
        //             d3.select(this).style(`stroke`, `#F0F1F5`);
        //             tr.style(`font-weight`, `normal`);
        //         });
        //
        //     tr.append(`td`)
        //         .append(`div`)
        //         .style(`width`, `140px`)
        //         .style(`height`, `20px`)
        //         .style(`display`, `flex`)
        //         .style(`justify-content`, `flex-end`)
        //         .append(`div`)
        //         .style(`width`, `${Math.round(j * 10)}%`)
        //         .style(`background-color`, this.scale(j))
        //         .style(`text-align`, `right`)
        //         .text(data[i].value);
        //
        //     tr.append(`td`)
        //         .text(data[i].title);
        // }
    }

    public setSvg(element: any, svg: string) {
        this.element = d3.select(element);
        d3.xml(svg)
            .mimeType(`image/svg+xml`)
            .get((error, file) => {
                if (error) {
                    throw error;
                }
                this.svg = d3.select(this.element.select(`.container`)
                    .node()
                    .appendChild(file.documentElement));
            });
    }
}
