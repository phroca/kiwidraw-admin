import { Component, Input } from '@angular/core';

import { SupportRequestData } from '../../models/support-request-data';

@Component({
  selector: 'app-support-requests',
  templateUrl: './support-requests.component.html',
  styleUrls: ['./support-requests.component.scss']
})
export class SupportRequestsComponent {
  @Input() supportRequestData: SupportRequestData[];
  public displayedColumns: string[] = ['lotteryId', 'surname', 'address', 'status'];
}
