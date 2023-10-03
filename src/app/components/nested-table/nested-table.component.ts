import { Component, OnInit } from '@angular/core';
import data from 'src/app/data/data';

@Component({
  selector: 'app-nested-table',
  templateUrl: './nested-table.component.html',
  styleUrls: ['./nested-table.component.scss']
})
export class NestedTableComponent implements OnInit {
  tableData: any[] = data;
  selectedCheckboxes: number[] = [];

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

  toggleCheckbox(index: number) {
    if (this.isSelectedRow(index)) {
      this.selectedCheckboxes = this.selectedCheckboxes.filter((item) => item !== index);
    } else {
      this.selectedCheckboxes.push(index);
    }
  }

  selectRow(index: number) {
    this.tableData[index].selected = !this.tableData[index].selected;
  }

  isSelectedRow(index: number): boolean {
    return this.tableData[index].selected;
  }

  selectAllRows(event: any) {
    const checked = event.target.checked;
    this.tableData.forEach((item, index) => {
      item.selected = checked;
      if (checked && !this.isSelectedRow(index)) {
        this.selectedCheckboxes.push(index);
      } else if (!checked && this.isSelectedRow(index)) {
        this.selectedCheckboxes = this.selectedCheckboxes.filter((item) => item !== index);
      }
    });
  }

  areAllRowsSelected(): boolean {
    return this.tableData.every(item => item.selected);
  }


  deleteRow(index: number) {
    this.tableData.splice(index, 1);
    this.selectedCheckboxes = this.selectedCheckboxes.filter((item) => item !== index);
  }


  deleteMultipleRows() {
    this.selectedCheckboxes.sort((a, b) => b - a);
    for (const index of this.selectedCheckboxes) {
      this.tableData.splice(index, 1);
    }
    // Clear the selectedCheckboxes 
    this.selectedCheckboxes = [];
  }
  toggleChildCheckbox(parentIndex: number, childIndex: number) {
    const item = this.tableData[parentIndex].children[childIndex];
    item.selected = !item.selected;
  }

  isSelectedChildRow(parentIndex: number, childIndex: number): boolean {
    return this.tableData[parentIndex].children[childIndex].selected;
  }

  showDeleteButton(index: number): boolean {
    return this.selectedCheckboxes.includes(index);
  }


}
