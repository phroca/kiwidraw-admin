import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Lottery } from 'src/app/model/lottery.model';
import { environment } from 'src/environments/environment';

import {
  DailyLineChartData,
  SupportRequestData,
} from '../models';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getLotteries(): Observable<Lottery[]> {
    return this.http.get<Lottery[]>(environment.lotteries).pipe(
      catchError(this.handleError)
    );
  }

  getCurrentLottery(): Observable<Lottery> {
    return this.http.get<Lottery>(environment.lotteries + '/current').pipe(
      catchError(this.handleError)
    );
  }
  getLotteryById(id: string): Observable<Lottery> {
    return this.http.get<Lottery>(environment.lotteries + '/' + id).pipe(
      catchError(this.handleError)
    );
  }

  public loadDailyLineChartData(): Observable<DailyLineChartData> {
    const ticketsSold = [];
    const totalTickets = [];
    const labells = [];
    this.getLotteries().subscribe((lot: Lottery[]) => {

      for (const lottery of lot){
        ticketsSold.push(lottery.ticketsSold);
        totalTickets.push(lottery.maxTicketsToSell);
        labells.push(lottery.id);
      }
    });

    return of({
      data: {
        ticketSold: ticketsSold,
        totalTicket: totalTickets,
      },
      labels: labells
    });
  }

  public loadSupportRequestData(): Observable<SupportRequestData[]> {
    const lotteryData = [];
    this.getLotteries().subscribe((lot: Lottery[]) => {

      for (const lottery of lot){
        lotteryData.push({
          lotteryId: lottery.id,
          surname: lottery.winner.surname,
          address: lottery.winner.address,
          status: lottery.isActive ? 'active' : 'inactive'
        });
      }
    });
    return of (lotteryData);
  }

  public loadProjectsStatsData(): Observable<number[]> {
    let curentTicketsSold = 0;
    let currentTotalTickets = 0;
    let numberLotteries = 0;
    this.getLotteries().subscribe((lot: Lottery[]) => {
      numberLotteries = lot.length;
      const currentLottery = lot.filter(lottery => lottery.isActive === true)[0];
      curentTicketsSold = currentLottery.ticketsSold;
      currentTotalTickets = currentLottery.maxTicketsToSell;
    });
    return of([curentTicketsSold, currentTotalTickets, numberLotteries]);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
