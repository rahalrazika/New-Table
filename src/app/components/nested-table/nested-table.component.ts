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
  anyRowsSelected: boolean = false;


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

    // Clear the selectedCheckboxes array
    this.selectedCheckboxes = [];

    this.tableData.forEach((item, index) => {
      item.selected = checked;
      if (checked) {
        this.selectedCheckboxes.push(index);
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

  //deleteSecondRow function to handle second-level rows
  deleteSecondRow(parentIndex: number, childIndex: number) {
    if (childIndex >= 0 && childIndex < this.tableData[parentIndex].children.length) {
      this.tableData[parentIndex].children.splice(childIndex, 1);
    }
  }



  deleteMultipleRows() {
    this.selectedCheckboxes.sort((a, b) => a - b);
    for (let i = this.selectedCheckboxes.length - 1; i >= 0; i--) {
      const index = this.selectedCheckboxes[i];
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
