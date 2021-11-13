import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { DashboardService } from '../../services';
import {
  DailyLineChartData,
  SupportRequestData
} from '../../models';
import { Lottery } from 'src/app/model/lottery.model';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  public dailyLineChartData$: Observable<DailyLineChartData>;
  public supportRequestData$: Observable<SupportRequestData[]>;
  public projectsStatsData$: Observable<Lottery>;
  public lotteryList$: Observable<Lottery[]>;

  constructor(private service: DashboardService) {
    this.dailyLineChartData$ = this.service.loadDailyLineChartData();
    this.supportRequestData$ = this.service.loadSupportRequestData();
    this.projectsStatsData$ = this.service.getCurrentLottery();
    this.lotteryList$ = this.service.getLotteries();
  }
}
