import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { IItem } from 'src/app/interfaces/item.interface';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import {  faCreditCard, faTruck } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from '../../services/message.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-productoid',
  templateUrl: './productoid.component.html',
  styleUrls: ['./productoid.component.scss']
})
export class ProductoidComponent implements OnInit {

  libro!: IItem ;

  faTruck = faTruck;
  faCreditCard= faCreditCard;



  constructor(private ActivatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private _cartService :CartService,
    private toastr: ToastrService,
    private messageService : MessageService,
    private spinner: NgxSpinnerService
    
    ) { }

  ngOnInit(): void {
    

    this.spinner.show();


    this.ActivatedRoute.params
    .pipe(
      switchMap( ( { id} ) => this.productsService.getLibroPorId(id))
      )
    .subscribe(libro => {console.log(libro);
      this.libro = libro;
      this.spinner.hide();})



console.log(this.libro);




  }

  public addCart(libro: IItem)
{
 //this.libro.cantidad = 1;
  this._cartService.changeCart(libro);
  this.toastr.success('¡El producto fue añadido a tu carrito!', 'Enhorabuena :)');
  


}

addToCart(): void {
  this.messageService.sendMessage(this.libro);
}





}
