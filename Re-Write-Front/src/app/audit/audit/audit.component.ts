import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnConfig, DynamicTableComponent } from 'material-dynamic-table';
import { AuditService } from '../../services/audit.service'
import { Audit } from '../../models/audit'
import { Product } from '../../models/product'
import { FilteredDataSource } from '../data-source/filtered-data-source';
import * as XLSX from "xlsx";
import { TableUtil } from '../../utils/table-util'
import { MatSort, MatSortable } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  @ViewChild(DynamicTableComponent) dynamicTable: DynamicTableComponent;
  @ViewChild(MatSort) sort: MatSort;
  currentUser;
  audits: Audit[];

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
      type: 'date'
    },
    {
      name: 'metadata',
      displayName: 'Metadata',
      type: 'string'
    },
  ];

  data: Audit[] = [
    {
      "id": "",
      "userId": "",
      "userName": "",
      "activity": "",
      "auditTime": new Date(),
      "role": "",
      "metadata": ""
    },
    {
      "id": "",
      "userId": "",
      "userName": "",
      "activity": "",
      "auditTime": new Date(),
      "role": "",
      "metadata": ""
    }
  ];
  dataSource = new FilteredDataSource<Audit>(this.data);
  constructor(private toastr: ToastrService, private authService: AuthService, private auditService: AuditService) {
    this.auditService.getAudits()
      .subscribe(result => {
        this.dataSource.data = result as Audit[];
       
      },
        error => {
          this.toastr.error("Error while fetching Audits. Please refresh page.")
        });

  }

  ngOnInit() {

  }
  clearFilters() {
    this.dynamicTable.clearFilters();
  }
  exportTable() {

    this.audits = this.dataSource.filteredData;
    this.auditService.getPdf(this.audits)
      .subscribe(result => {
        //this.dataSource =new FilteredDataSource<Audit>(result as Audit[]);
        console.log(result);
        var file = new Blob([result], { type: 'application/pdf' })
        var fileURL = URL.createObjectURL(file);

        // window.open(fileURL); 
        var a = document.createElement('a');
        a.href = fileURL;
        a.target = '_blank';
        a.download = 'bill.pdf';
        document.body.appendChild(a);
        a.click();
      },
        error => {
          this.toastr.error("Error while downloading file. Please try again later.");
        });


  }
}



