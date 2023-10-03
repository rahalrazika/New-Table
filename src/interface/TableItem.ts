export interface TableItem {
    name: string;
    type: string;
    email: string;
    phoneNo: string;
    companyName: string;
    address: string;
    children?: TableItem[]; 
    collapsed: boolean; 
    selected: boolean;
  }