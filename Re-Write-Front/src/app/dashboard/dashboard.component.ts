import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  chartReady;
   public pieChartData: SingleDataSet ;
  constructor(private dashboardService: DashboardService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }
   spinner;
  stats;
  ngOnInit() {
    this.spinner = true;
    this.dashboardService.getStats()
      .subscribe(result => {
        this.stats = result;
        this.pieChartData = [this.stats.totalVolunteers-this.stats.blockedVolunteers, this.stats.blockedVolunteers];
        this.chartReady = true;
        this.spinner = false;
        //this.dataSource =new FilteredDataSource<Audit>(result as Audit[]);

      },
        error => {
          
        });

  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Unblocked Volunteers'], ['Blocked Volunteers']];
 
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

}
