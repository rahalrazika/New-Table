import { Component, ElementRef, OnInit } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
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
  searchText: string = '';
  filteredTableData: any[] = this.tableData;
  isTableCollapsed: boolean = true;


  private destroy$ = new Subject<void>();

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.initializeData();
    this.setupSearchInput();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  showDeleteButton(row: any): boolean {
    return row.selected;
  }

  toggleChildCollapse(parentIndex: number, childIndex: number) {
    this.tableData[parentIndex].children[childIndex].collapsed = !this.tableData[parentIndex].children[childIndex].collapsed;
  }

  deleteThirdRow(parentIndex: number, childIndex: number, subChildIndex: number) {
    if (
      subChildIndex >= 0 &&
      subChildIndex < this.tableData[parentIndex].children[childIndex].children.length
    ) {
      this.tableData[parentIndex].children[childIndex].children.splice(
        subChildIndex,
        1
      );
    }
  }

  // add search functions 

  onSearch() {
    this.filterTableData();
  }

  filterTableData() {
    this.filteredTableData = this.tableData.filter(item => {
      // Check if the item itself matches the search text
      const name = item.name?.toLowerCase();
      if (name?.includes(this.searchText.toLowerCase())) {
        return true;
      }

      // Check if any child item matches the search text
      if (item.children && item.children.length > 0) {
        const hasMatchingChild = item.children.some((child: any) => {
          const childName = child.name?.toLowerCase();
          return childName?.includes(this.searchText.toLowerCase());
        });
        if (hasMatchingChild) {
          return true;
        }

        // Check if any sub-child item matches the search text
        for (const child of item.children) {
          if (child.children && child.children.length > 0) {
            const hasMatchingSubChild = child.children.some((subChild: any) => {
              const subChildName = subChild.name?.toLowerCase();
              return subChildName?.includes(this.searchText.toLowerCase());
            });
            if (hasMatchingSubChild) {
              return true;
            }
          }
        }
      }

      return false;
    });
  }

  toggleTableCollapse() {
    this.isTableCollapsed = !this.isTableCollapsed;
    this.toggleAllRowCollapses(this.isTableCollapsed);
  }

  toggleAllRowCollapses(collapsed: boolean) {
    this.tableData.forEach(item => {
      item.collapsed = collapsed;
      if (item.children) {
        item.children.forEach((child: any) => {
          child.collapsed = collapsed;
          if (child.children) {
            child.children.forEach((subChild: any) => {
              subChild.collapsed = collapsed;
            });
          }
        });
      }
    });
  }

  private setupSearchInput() {
    const searchInput = this.elementRef.nativeElement.querySelector('#searchInput');

    if (searchInput) {
      fromEvent(searchInput, 'input')
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.onSearch();
        });
    }
  }

}