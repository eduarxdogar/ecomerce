import { Component, inject, Input, signal, SimpleChange, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product.model';

import { CartService } from '../../services/cart.service';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';




@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  hideSideMenu = signal(true);
  private cartService = inject(CartService);

  cart = this.cartService.cart;
  total = this.cartService.total;



  toogleSideMenu() {
    this.hideSideMenu.update(prevState => !prevState);
  }
  get cartCount(): number {
    return this.cart().length; // Actualiza dinámicamente el contador
  }

}
/**  se separa la responsabilidad con la inyecccion del servicio por buenas pacticas
  ngOnChanges(chages: SimpleChanges) {
    const cart = chages['cart'];
    if (cart) {
      this.total.set(this.calcTotal());
    }

  }
  calcTotal() {
    return this.cart.reduce((total, product) => total + product.price, 0);
  }**/