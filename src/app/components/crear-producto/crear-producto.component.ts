import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../models/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent {
  productoForm: FormGroup;

  id: string | null;
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productoService: ProductoService,
    private aRouter: ActivatedRoute) {
    this.productoForm = this.fb.group({
      name: ['', Validators.required],
      mode: ['', Validators.required],
      equipment: ['', Validators.required],
      exercises: ['', Validators.required],
      trainerTips: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }
  ngOnInit() {
    this.esEditar();
  }

  agregarProducto() {
    // el objeto que llega desde el formulario

    const PRODUCTO: Producto = {
      id: '',
      name: this.productoForm.get('name')?.value,
      mode: this.productoForm.get('mode')?.value,
      equipment: [],
      exercises: [],
      trainerTips: [],
    }

    if (this.id !== null) {
        PRODUCTO.id = this.id;
        PRODUCTO.equipment = this.productoForm.get('equipment')?.value,
        PRODUCTO.exercises = this.productoForm.get('exercises')?.value,
        PRODUCTO.trainerTips = this.productoForm.get('trainerTips')?.value,

        this._productoService.editarProducto(this.id, PRODUCTO).subscribe(api => {
          console.log(api)
          this.toastr.info('se ha actualizado el producto', 'Actualizado')
          this.router.navigate(['/']);

        })
    } else {
      // const PRODUCTO: Producto = {
      //   ...this.productoForm.getRawValue()
      // }
        PRODUCTO.equipment = this.productoForm.get('equipment')?.value.split(',').map((item: string) => item.trim()),
        PRODUCTO.exercises = this.productoForm.get('exercises')?.value.split(',').map((item: string) => item.trim()),
        PRODUCTO.trainerTips = this.productoForm.get('trainerTips')?.value.split(',').map((item: string) => item.trim()),
        this._productoService.saveProduct(PRODUCTO).subscribe(api => {
          console.log(api)
          this.toastr.success(api.data, 'Entrenamiento Registrado')
          this.router.navigate(['/']);
          window.location.reload();
        })

    }

  }

  esEditar() {
    if (this.id !== null) {
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          name: data.data.name,
          mode: data.data.mode,
          equipment: data.data.equipment,
          exercises: data.data.exercises,
          trainerTips: data.data.trainerTips
        })
      })
    }
  }

}
