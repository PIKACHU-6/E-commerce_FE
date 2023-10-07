import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from '../image-processing.service';
import { Router } from '@angular/router';
//mport { error } from 'console';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css'],
})
export class ShowProductDetailsComponent implements OnInit {

  showTable= false;

  showLoadMoreProductButton = false;

  pageNumber: number =0;

  productDetails=[];
  displayedColumns: string[] = ['Id', 'Product Name', 'description', 'Product Discounted Price', 'Product Actual Price','Actions'];

  constructor(private productService: ProductService, public imagesDialog: MatDialog, private imageProcessingService: ImageProcessingService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(searchKey: string=""){
    this.showTable=false;
    this.productService.getAllProducts(this.pageNumber,searchKey)
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp: Product[])=>{
        console.log(resp);
        if(resp.length==2){
          this.showLoadMoreProductButton=true;
        }else{
          this.showLoadMoreProductButton=false;
        }
        resp.forEach(p=>this.productDetails.push(p));
        this.showTable=true;
        
        // this.productDetails=resp;
      }, (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  public deleteProduct(productId: number){
    this.productService.deleteProduct(productId).subscribe(
      (resp)=>{
        this.getAllProducts();
      }, (error:HttpErrorResponse)=>{
        console.log(error);
      }
    )
  }

showImages(product: Product){
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent,{
      data:{
        images: product.productImages
      },
      height: '500px',
      width: '800px',
    });
  }


  editProductDetails(productId){
    this.router.navigate(['/addNewProduct',{productId: productId}]);
  }

  loadMoreProduct(){
    this.pageNumber=this.pageNumber+1;
    this.getAllProducts();
    //this.showTable=true;
  }

  searchByKeyword(searchByKeyword){
    this.pageNumber=0;
    this.productDetails=[];
    this.getAllProducts(searchByKeyword);
  }
}

