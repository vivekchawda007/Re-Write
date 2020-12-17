import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnConfig, DynamicTableComponent } from 'material-dynamic-table';
import { AuditService } from '../../services/audit.service'
import { Audit } from '../../models/audit'
import { Product } from '../../models/product'
import { FilteredDataSource } from '../data-source/filtered-data-source';
import * as XLSX from "xlsx";
import { TableUtil } from '../../utils/table-util'
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service'
@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  @ViewChild(DynamicTableComponent) dynamicTable: DynamicTableComponent;
  @ViewChild(MatSort) sort: MatSort;
  currentUser;
  audits : Audit[];
  columns: ColumnConfig[] = [
    {
      name: 'activity',
      displayName: 'Activity',
      type: 'string'
    },
    {
      name: 'userName',
      displayName: 'User',
      type: 'string'
    },
    {
      name: 'role',
      displayName: 'Role',
      type: 'string'
    },
    {
      name: 'auditTime',
      displayName: 'Audit Date/Time',
      type: 'date',
      options: {
        dateFormat: 'shortDate'
      }
    },
    {
      name: 'metadata',
      displayName: 'Metadata',
      type: 'string'
    },
  ];

  data: Audit[] = [
    {
      "id": "1",
      "userId": "4c1e15c4-e35a-4989-acdc-b4c16701597f",
      "userName": "Jahnavi.Thacker",
      "activity": "SEARCH_EVENT",
      "auditTime": new Date(),
      "role": "Registrar",
      "metadata": "Hi"
    },
    {
      "id": "1",
      "userId": "4c1e15c4-e35a-4989-acdc-b4c16701597f",
      "userName": "Vivek.Thacker",
      "activity": "MyEvent",
      "auditTime": new Date(),
      "role": "Registrar",
      "metadata": "hi"
    }
  ];
  dataSource = new FilteredDataSource<Audit>(this.data);
  constructor(private authService: AuthService, private auditService: AuditService) {
    const itemStr = localStorage.getItem("currentUser")
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const item = JSON.parse(itemStr)
    const now = new Date();
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem("currentUser");
      this.authService.logout();
      location.reload();
    }
    this.auditService.getAudits()
      .subscribe(result => {
        //this.dataSource =new FilteredDataSource<Audit>(result as Audit[]);
        this.dataSource.data = result as Audit[];
      },
        error => {

        });

  }

  ngOnInit() {

  }
  clearFilters() {
    this.dynamicTable.clearFilters();
  }
  exportTable() {
    
    this.audits =this.dataSource.filteredData ;
    this.auditService.getPdf(this.audits)
      .subscribe(result => {
        //this.dataSource =new FilteredDataSource<Audit>(result as Audit[]);
       console.log(result);
       var file = new Blob([result], { type: 'application/pdf' })
          var fileURL = URL.createObjectURL(file);

          window.open(fileURL); 
          /* var a         = document.createElement('a');
          a.href        = fileURL; 
          a.target      = '_blank';
          a.download    = 'bill.pdf';
          document.body.appendChild(a);
          a.click(); */
      },
        error => {

        });

    
  }
}



