import {Component, Input, OnInit} from '@angular/core';

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
export class HeatmapComponent implements OnInit {
  private data: IHeatmapOptions[];

  constructor() { }

  ngOnInit() {
  }

}
