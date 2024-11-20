import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { state } from '@angular/animations';
// prov previwn por pasar en todos sus hijos de reander esto es ese servicio store manager para dministarar esa logica
@Injectable({
  providedIn: 'root'
})
export class CartService {


  cart = signal<Product[]>([]);
  total = computed(() => {
    const cart = this.cart();
    return cart.reduce((total, product) => total + product.price, 0);
  })

  constructor() { }

  addToCart(product: Product) {
    this.cart.update(state => [...state, product]);
  }
}
