import { ApiService } from './services/api.service';

import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angularCRUD';

  displayedColumns: string[] = ['productName', 'category', 'date','freshness', 'price','comment','actions'];
  
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api:ApiService) {}

    ngOnInit(): void {
      this.getAllProducts();
    }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width : '30%'
    }).afterClosed().subscribe(val =>{
      if(val == 'save'){
        this.getAllProducts();
      }
    });
  }
 
    getAllProducts(){
      this.api.getProduct().subscribe({

        next: (res)=>{

          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
              //console.log(res);
        },
        error: (err)=>{
              console.log(err);
        }

      });
    }

  editProduct(row:any){
    this.dialog.open(DialogComponent, {
      width : '30%',
      data:row
    }).afterClosed().subscribe(val =>{
      if(val == 'update'){
        this.getAllProducts();
      }
    });
  }

  deleteProduct(id:number){
    this.api.deleteProduct(id).subscribe({
      next:()=>{
        alert("product deleted successfully");
        this.getAllProducts();
      },
      error:()=>{
        alert("Error while deleting product");
      }
  });
    //console.log(row);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
