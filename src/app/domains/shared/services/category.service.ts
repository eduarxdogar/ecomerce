import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private categoriesCache: Category[] | null = null;

  getAll() {
    if (this.categoriesCache) {
      return of(this.categoriesCache); // Retorna el cache si ya se cargó
    }
    return this.http.get<Category[]>(`https://api.escuelajs.co/api/v1/categories`).pipe(
      tap((categories) => (this.categoriesCache = categories))
    );
  }
}
