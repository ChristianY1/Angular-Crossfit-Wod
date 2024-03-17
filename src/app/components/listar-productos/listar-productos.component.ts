import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { stringify } from 'querystring';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { compileClassDebugInfo } from '@angular/compiler';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.css'
})
export class ListarProductosComponent implements OnInit {
  listProductos: Producto[] = [];
  constructor(private _productoService: ProductoService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this._productoService.getProductos().subscribe(api => {
      this.listProductos = api.data
      // this.listProductos.forEach((producto)=>{
      //   console.log('aqui esta el nombreee',producto.name)
      // })
    }, error => {
      console.log(error)
    })
  }

  deletProducto(id: any) {
    this._productoService.deleteProductos(id).subscribe(api => {
      this.toastr.info(api.deletedWorkout.message, 'Elimando');
      window.location.reload();
      //this.obtenerProductos();
    }, error => {
      this.toastr.error(error, 'A ocurrido un error');
    })
  }

  updateProducto(id: any){
    this._productoService.obtenerProducto(id).subscribe(api =>{
    }, error=>{
      this.toastr.error(error, 'A ocurrido un error al obtener cliente')
    })
  }

}
