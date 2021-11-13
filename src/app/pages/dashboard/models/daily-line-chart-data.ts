export interface DailyLineChartData {
  data: LotteryData;
  labels: string[];
}

export interface LotteryData {
  ticketSold: number[];
  totalTicket: number[];
}
