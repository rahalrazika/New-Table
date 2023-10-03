import { Component, OnInit } from '@angular/core';
import data from 'src/app/data/data';

@Component({
  selector: 'app-nested-table',
  templateUrl: './nested-table.component.html',
  styleUrls: ['./nested-table.component.scss']
})
export class NestedTableComponent implements OnInit {
  tableData: any[] = data; 

  constructor() { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData() {
    this.tableData.forEach(item => {
      item.collapsed = true;
      item.selected = false; 
    });
  }

  toggleCollapse(index: number) {
    this.tableData[index].collapsed = !this.tableData[index].collapsed;
  }

  selectRow(index: number) {
    this.tableData[index].selected = !this.tableData[index].selected;
  }

  isSelectedRow(index: number): boolean {
    return this.tableData[index].selected;
  }

  selectAllRows(event: any) {
    const checked = event.target.checked;
    this.tableData.forEach(item => (item.selected = checked));
  }

  areAllRowsSelected(): boolean {
    return this.tableData.every(item => item.selected);
  }
}