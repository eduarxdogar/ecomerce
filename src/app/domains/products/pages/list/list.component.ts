import { Component, inject, Input, signal, SimpleChange, SimpleChanges } from '@angular/core';
import { ProductComponent } from "./../../components/product/product.component"

import { Product } from './../../../shared/models/product.model'
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { CartService } from '../../../shared/services/cart.service';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Category } from '../../../shared/models/category.model';
import { RouterLinkWithHref } from '@angular/router';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);

  private cartService = inject(CartService);
  private produtService = inject(ProductService);
  private categoryServices = inject(CategoryService);
  @Input() category_id?: string;


  ngOnInit() {
    this.getCategories();

  }

  ngOnChanges(changes: SimpleChanges) {
    this.getProducts();
  }





  addToCart(product: Product) {
    this.cartService.addToCart(product)
  }

  private getProducts() {
    this.produtService.getProducts(this.category_id)
      .subscribe({
        next: (products) => {
          this.products.set(products);
        },
        error: () => {

        }
      });

  }


  private getCategories() {
    this.categoryServices.getAll().subscribe({
      next: (data) => {
        const uniqueCategories = data
          .filter((category, index, self) =>
            // Filtrar categorías únicas y descartar las no deseadas como "Change title"
            index === self.findIndex((c) => c.name === category.name) &&
            category.name !== 'Change title'
          )
          .map((category) => {
            // Renombrar "New Category" a "Other"
            if (category.name === 'New Category') {
              category.name = 'Other';
            }
            return category;
          });

        console.log('Categorías actualizadas:', uniqueCategories);
        this.categories.set(uniqueCategories); // Asignar las categorías filtradas y actualizadas
      },
      error: () => {
        console.error('Error al obtener las categorías');
      }
    });
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