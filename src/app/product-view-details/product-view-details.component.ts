import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit {

  selectedProductIndex=0;

  product: Product;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private productService:ProductService) { }

  ngOnInit(): void {
    this.product=this.activatedRoute.snapshot.data['product'];
  }

  changeIndex(index){
    this.selectedProductIndex=index;
  }

  buyProduct(productId){
    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout:true,
      id:productId
    }]);
  }

  public addToCart(productId){
      this.productService.addToCart(productId).subscribe(
        (resp)=>{
          console.log(resp);
        },(err)=>{
          console.log(err);
        }
      )
  }
}
