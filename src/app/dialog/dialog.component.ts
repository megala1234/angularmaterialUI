import { ApiService } from './../services/api.service';
import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
     private dialog:MatDialogRef<DialogComponent>) { }

    freshness =["Brand New","Second Hand","Refurbished"];
    productForm !: FormGroup;
    actionbtn : string ='SAVE';

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      freshness:['',Validators.required],
      price:['',Validators.required],
      comment:['',Validators.required],
      date:['',Validators.required]
    });
    console.log(this.editData);

    if(this.editData){
        this.actionbtn ="UPDATE";
        this.productForm.controls['productName'].setValue(this.editData.productName);
        this.productForm.controls['category'].setValue(this.editData.category);
        this.productForm.controls['date'].setValue(this.editData.date);
        this.productForm.controls['comment'].setValue(this.editData.comment);
        this.productForm.controls['price'].setValue(this.editData.price);
        this.productForm.controls['freshness'].setValue(this.editData.freshness);

    }

  }


  addProduct(){
//console.log(this.editData);
          if(!this.editData){

            if(this.productForm.valid){

              this.api.postProduct(this.productForm.value).subscribe({
                next:(res)=>{
                      alert("data saved successfully");
                      this.productForm.reset();
                      this.dialog.close('save');
                      
                },
                error:()=>{
                  alert("Error while adding Product");
                }
              });
        
          }
        }
          else{
            //console.log("check update");
            this.api.updateProduct(this.editData.id,this.productForm.value).subscribe({
              next:(res) => {
                alert("Product updated successfully");
                this.productForm.reset();
                      this.dialog.close('update');
              },
              error:()=>{
                  alert("Error while Updating Product");
              }
            });
          }


        }
      
  }
    
       
    //console.log(this.productForm.value);

 



