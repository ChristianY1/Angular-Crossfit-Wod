Creacion del proyecto 
```bash
ng new <mi proyecto> --standalone=false
```

Instalacion de bootstrap, el ngx-toastr es para los cors
```bash
npm i ngx-toastr
```

En la carpeta src/app creamos los siguientes directorios
```bash
src/app/components
src/app/models
src/app/services
```

Creacion de un componentes
```bash
ng g c components/crear-producto
```

Creacion de servicios, se borran los archivos .spec.ts
```bash
ng g s services/producto
```


