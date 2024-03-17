import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'http://localhost:3000/api/v1/workouts/';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get(this.url)
  }

  deleteProductos(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  saveProduct(producto: Producto): Observable<any> {
    return this.http.post(this.url, producto);
  }

  obtenerProducto(id: string): Observable<any> {
    return this.http.get(this.url + id)
  }

  editarProducto(id: string, producto: Producto): Observable<any>{
    return this.http.put(this.url + id, producto);
  }

}
