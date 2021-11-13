import { Component, Input, OnInit } from '@angular/core';
import { Lottery } from 'src/app/model/lottery.model';
import { colors } from '../../../../consts';

enum ProjectsType {
  ticketSold = 'Tickets Sold on Current Lottery',
  totalTicket = 'Total Ticket on Current Lottery',
  totalLotteries = 'Total Lotteries'
}

@Component({
  selector: 'app-project-stat-chart',
  templateUrl: './project-stat-chart.component.html',
  styleUrls: ['./project-stat-chart.component.scss']
})
export class ProjectStatChartComponent implements OnInit {
  @Input() projectsStatsData: Lottery;
  @Input() LotteryList: Lottery[];
  public curentTicketsSold: number;
  public currentTotalTickets: number;
  public numberLotteries: number;
  public projectsType: typeof ProjectsType = ProjectsType;
  public colors: typeof colors = colors;
constructor() {
}
  public ngOnInit(): void {
  }

}
