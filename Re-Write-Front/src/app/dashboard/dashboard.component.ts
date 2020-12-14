import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }
  stats;
  ngOnInit() {

    this.dashboardService.getStats()
      .subscribe(result => {
        this.stats = result;
        //this.dataSource =new FilteredDataSource<Audit>(result as Audit[]);

      },
        error => {

        });

  }

}
