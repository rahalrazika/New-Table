import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'; 



import { AppComponent } from './app.component';
import { NestedTableComponent } from './components/nested-table/nested-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NestedTableComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
