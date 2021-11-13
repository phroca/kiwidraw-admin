import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexMarkers,
  ApexXAxis,
  ApexPlotOptions
} from 'ng-apexcharts';

import { DailyLineChartData, LotteryData } from '../../models';
import { colors } from '../../../../consts';
import { customTooltip } from '../../consts';
import * as ApexCharts from 'apexcharts';

type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  labels: string[];
  stroke: ApexStroke;
  markers: ApexMarkers;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  colors: string[];
  grid: ApexGrid;
};

@Component({
  selector: 'app-daily-line-chart',
  templateUrl: './daily-line-chart.component.html',
  styleUrls: ['./daily-line-chart.component.scss']
})
export class DailyLineChartComponent implements OnInit, AfterViewInit {
  @Input() dailyLineChartData: DailyLineChartData;
  @ViewChild('chart') chart: ElementRef;
  public chartObj: ApexCharts;
  public chartOptions: Partial<ChartOptions>;
  public colors: typeof colors = colors;

  public ngOnInit(): void {
    this.initChart(this.dailyLineChartData.data, this.dailyLineChartData.labels);
  }

  public ngAfterViewInit() {
    this.chartObj = new ApexCharts(
      this.chart.nativeElement,
      this.chartOptions
    );

    this.chartObj.render();
  }

  public initChart(data: LotteryData, labels: string[]): void {
    this.chartOptions = {
      legend: {
        show: false
      },
      markers: {
        size: [0, 5]
      },
      series: [
        {
          name: 'Ticket Sold',
          type: 'area',
          data: data.ticketSold
        },
        {
          name: 'Total Ticket',
          type: 'line',
          data: data.totalTicket
        }
      ],
      colors: [colors.BLUE, colors.LIGHT_BLUE],
      chart: {
        toolbar: {
          show: false
        },
        height: 350,
        width: '100%',
        type: 'line',
        stacked: true
      },
      stroke: {
        width: [2, 1],
        curve: ['smooth', 'smooth']
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        },
      },
      grid: {
        yaxis: {
          lines: {
            show: false,
          }
        },
      },
      fill: {
        opacity: 1,
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: 'vertical',
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels,
      xaxis: {
        type: 'category',
        labels: {
          style: {
            colors: '#4A4A4A',
            fontSize: '0.875rem',
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontWeight: 400,
          },
        },
      },
      yaxis: {
        show: true,
        labels: {
          style: {
            colors: '#4A4A4A',
            fontSize: '0.875rem',
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontWeight: 400,
          },
        },
      },
      tooltip: {
        custom: ({series, seriesIndex, dataPointIndex, w}) => {
          return customTooltip;
        }
      }
    };
  }
}
