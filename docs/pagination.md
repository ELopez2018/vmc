# Paginación del frontend

Los valores de paginación se configuran en `environment.pagination`, tanto en
`src/environments/environment.ts` (producción) como en
`src/environments/environment.development.ts` (desarrollo).

| Propiedad | Valor inicial | Uso |
| --- | --- | --- |
| `initialPage` | `0` | Primera página del API. Mantener cero porque el backend usa índices basados en cero. |
| `pageSize` | `10` | Tamaño general por defecto y filas de la tabla de notificaciones. |
| `pageSizeOptions` | `[5, 10, 25, 50]` | Opciones del paginador de tablas. |
| `programsPageSize` | `4` | Semanas por petición en la carga progresiva del programa. |
| `batchSize` | `100` | Programas por petición al cargar todas las validaciones de un rango. |

Los tamaños deben ser enteros positivos. Al modificar `pageSize`, incluir su
valor en `pageSizeOptions`. Los tamaños especiales del programa permiten ajustar
la cantidad de semanas y los lotes sin cambiar la cantidad de filas de las tablas.

## Consultas paginadas

Usar `buildPaginationParams` para generar los parámetros `page` y `size` y
conservar los filtros. Sin opciones utiliza los valores generales del environment.
Una consulta puede indicar un tamaño especial o una página concreta:

```ts
import { HttpParams } from '@angular/common/http';
import { buildPaginationParams } from 'src/app/core/utils/pagination.util';
import { PaginatedResponse } from 'src/app/core/interfaces/general.interfaces';

const filters = new HttpParams().set('congregationId', String(congregationId));
const params = buildPaginationParams({ page: 0 }, filters);
return this.httpClient.get<PaginatedResponse<Program>>(url, { params });
```

La función sustituye páginas o tamaños inválidos por los valores generales. Los
servicios deben usar `PaginatedResponse<T>` para el contrato común (`content`,
`number`, `size`, `totalPages`, `totalElements`, `last`). Si se necesita toda la
colección, consultar las siguientes páginas hasta `last: true` o `totalPages`;
no asumir que la primera página contiene todos los registros.

## Endpoints disponibles

`GET /meetings/programs/{congregationId}` acepta `page` y `size`. La carga inicial
y las validaciones del rango filtrado usan la configuración global.

Los endpoints que devuelven listas completas mantienen su contrato sin añadir
parámetros que el servidor no utiliza.

El controlador actual de `GET /assignment` llama a `getAll(0, 20)` y no acepta
`page` ni `size`. Su página fija de 20 registros requiere un cambio coordinado en
el backend para poder controlarse desde esta configuración; añadir parámetros
solo en el frontend no modifica ese resultado.
