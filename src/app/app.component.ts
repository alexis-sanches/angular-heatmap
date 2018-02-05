import {Component, OnInit} from '@angular/core';
import {D3Service} from './d3.service';
import {IHeatmapOptions} from './heatmap/heatmap.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
    svg = `assets/map.svg`;

    public colors: string[] = ['#407bd8', '#5fe29f'];
    // public colors: string[] = ['yellow', 'orange', 'red'];

    public data: IHeatmapOptions[] = [
        {
            id: `adm`,
            title: `Адмиралтейский`,
            value: 93,
        },
        {
            id: `vas`,
            title: `Василеостровский`,
            value: 81,
        },
        {
            id: `vyb`,
            title: `Выборгский`,
            value: 142,
        },
        {
            id: `kal`,
            title: `Калининский`,
            value: 158,
        },
        {
            id: `kir`,
            title: `Кировский`,
            value: 133,
        },
        {
            id: `kol`,
            title: `Колпинский`,
            value: 79,
        },
        {
            id: `krg`,
            title: `Красногвардейский`,
            value: 117,
        },
        {
            id: `krs`,
            title: `Красносельский`,
            value: 124,
        },
        {
            id: `kro`,
            title: `Кронштадский`,
            value: 21,
        },
        {
            id: `kur`,
            title: `Курортный`,
            value: 38,
        },
        {
            id: `mos`,
            title: `Московский`,
            value: 118,
        },
        {
            id: `nev`,
            title: `Невский`,
            value: 169,
        },
        {
            id: `ptg`,
            title: `Петроградский`,
            value: 78,
        },
        {
            id: `ptd`,
            title: `Петродворцовый`,
            value: 56,
        },
        {
            id: `pri`,
            title: `Приморский`,
            value: 149,
        },
        {
            id: `pus`,
            title: `Пушкинский`,
            value: 84,
        },
        {
            id: `fru`,
            title: `Фрунзенский`,
            value: 133,
        },
        {
            id: `cen`,
            title: `Центральный`,
            value: 130,
        },
    ];

    // public data: IHeatmapOptions[];

    ngOnInit(): void {
        // setTimeout(() => {
        //     this.data = this._data;
        // }, 1000);
    }

    onSelect(evt) {
        console.log(evt);
    }
}
