import { Component, inject, signal } from '@angular/core';
import { ProductComponent } from "./../../components/product/product.component"
import { CommonModule } from '@angular/common';
import { Product } from './../../../shared/models/product.model'
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { CartService } from '../../../shared/services/cart.service';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, CommonModule, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  products = signal<Product[]>([]);
  private cartService = inject(CartService);
  private produtService = inject(ProductService);

  ngOnInit() {
    this.produtService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: () => {

      }
    });
  }



  addToCart(product: Product) {
    this.cartService.addToCart(product)
  }

}
/** local
 *   constructor() {
    const initProducts: Product[] = [
      {
        id: Date.now(),
        title: 'Jabon Rey',
        price: 100,
        img: "assets/imgR.jpg",
        creationAt: new Date().toISOString()

      },
      {
        id: Date.now(),
        title: 'Jabon Lavadora',
        price: 100,
        img: "assets/img.jpg",
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Mi empresa ',
        price: 100,
        img: "assets/img.webp",
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Jabon Loza',
        price: 100,
        img: "assets/imgL.jpg",
        creationAt: new Date().toISOString()

      },
      {
        id: Date.now(),
        title: 'pro 5',
        price: 100,
        img: "https://picsum.photos/640/640?r=1",
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'pro 6',
        price: 100,
        img: "https://picsum.photos/640/640?r=25",
        creationAt: new Date().toISOString()
      }

    ]
    this.products.set(initProducts);
  }

 */