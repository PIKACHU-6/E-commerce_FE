import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartDetails: any[] = [];

  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Discounted Price', 'Action'];

  constructor(private productService:ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails(){
    this.productService.getCartDetails().subscribe(
      (resp:any[])=>{
        console.log(resp);
        this.cartDetails=resp;
      },(err)=>{
        console.log(err);
      }
    );
  }

  checkout(){
    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout:false,
      id:0
    }]);
  }

  delete(cartId){
    this.productService.deleteCartItem(cartId).subscribe(
      (resp)=>{
        console.log(resp);
        this.getCartDetails();
      },(err)=>{
        console.log(err);
      }
    )
  }
}


