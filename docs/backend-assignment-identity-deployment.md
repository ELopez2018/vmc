# Identidad de asignaciones: implementación y despliegue

Actualizado: 2026-11-18.

## Comportamiento implementado

`AssignmentIdentity` centraliza equivalencias explícitas para conversaciones,
revisitas, discípulos, creencias, ¿qué diría/dirías? y discurso. No identifica una
categoría de SEAMOS MEJORES MAESTROS por el número de la parte.

`assignments.category_code` guarda la categoría y `participation_mode` la modalidad
`SOLO`, `PAIR` o `UNKNOWN`. `assignment_types.category_code`, junto con el tipo
y la sección ya existentes, relaciona la categoría con sus permisos por rol.
No se necesita una segunda tabla de mapeo en esta implementación aditiva.

La categoría persistida prevalece sobre el título visible en permisos, historial
y balanceo. Editar el título mediante `/assignment` conserva identidad y modalidad.
Una reclasificación contradictoria se rechaza; requiere un procedimiento explícito.

El selector admite `assignmentId` y `participantRole` opcionales. Con ID valida
semana, programa único de la congregación, categoría, sección/número recibidos,
rol y política de sala. El usuario autenticado debe pertenecer a la congregación
activa en términos de eliminación lógica. `acctive=false` no impide consultar
programas existentes. La sala B debe estar configurada, pero no necesita una fila
semanal creada. La consulta no persiste datos.

Sin ID se mantiene la clave anterior y se deriva el rol cuando se omite.
Los cargos del programa ignoran metadatos semanales residuales. Un título enviado
diferente no modifica categoría ni autorización cuando existe ID.

El historial de categorías cubiertas agrupa variantes y posiciones en ambas salas
por columna `responsible` o `assistant`, con filtros de congregación y eliminación
lógica. `lastAssignment` sigue siendo la última participación de categoría/rol
en ambas salas y `allAssignments` sigue siendo global. No cambia la frontera de
fechas, frecuencia, orden ni el cálculo de próximas participaciones.

`/meetings/programs/{congregationId}` agrega `assignmentId`, `categoryCode` y
`participationMode` a cada parte. Su `id` anterior sigue identificando la fila
semanal. `AssignmentLiteDto` y la entidad de asignación exponen identidad y
modalidad sin quitar los cuatro campos de fuente.

## Permisos y modalidad durante la transición

La implementación no modifica `users_assignment_types`, no mueve los permisos
15/16 de sección y no crea autorizaciones. Se conserva la precedencia del permiso
propio de ayudante en SEAMOS MEJORES MAESTROS. Para creencias y discípulos, cuando
ese permiso no existe en esa sección, se mantiene la compatibilidad previa con
el permiso de estudiante de la misma categoría. Nunca se une automáticamente
la whitelist del ayudante heredado en otra sección.

Un discurso conocido o una parte `SOLO` rechaza ayudante en consulta y guardado.
Una modalidad histórica sin evidencia queda `UNKNOWN` y conserva la compatibilidad
transitoria; no se presume que el histórico tenga modalidad resuelta. El importador
reconoce el formato explícito de discurso al inicio de la fuente. Las categorías
desconocidas se registran para revisión y no se clasifican por número. El balanceo
rechaza una parte desconocida de la sección cubierta en lugar de elegir otro tipo.

El corte estricto de modalidades y la separación definitiva de permisos heredados
requieren revisar pendientes y comparar la whitelist real. No están activados por
estos scripts. Esos trabajos siguen el procedimiento de la guía de etapa 2.

## Importación

La coincidencia exacta mantiene el índice existente de reunión/número/título.
Si cambia el título conocido, se conserva el ID cuando hay una única parte de
esa categoría en la misma posición y sección de la reunión. Una contradicción
o ambigüedad falla de forma controlada. Dentro de la importación transaccional
se bloquea la reunión antes de resolver sus partes existentes.

No se infiere identidad si cambian simultáneamente título y posición sin una
coincidencia confiable. No se introduce una supuesta clave externa a partir de
anclas HTML. Dos partes de la misma categoría en una semana siguen siendo distintas.
La creación concurrente de una reunión antes inexistente conserva las limitaciones
del importador anterior; el bloqueo protege la conciliación en una reunión existente.

## Despliegue

Aplicar en PostgreSQL, en orden y antes de arrancar el backend actualizado:

1. `src/main/resources/db/migration/V20261118_1500__assignment_semantic_identity.sql`
2. `src/main/resources/db/migration/V20261118_1510__backfill_assignment_semantic_identity.sql`

El primer archivo crea el catálogo semántico, columnas, FKs e índices. El segundo
clasifica equivalencias conocidas en la sección correcta sin cambiar títulos,
números, fuentes, participantes o whitelist. Ambos son reejecutables. El backfill
no sobrescribe identidades ni modalidades ya revisadas y devuelve conteos agregados
para revisar registros sin categoría o con modalidad desconocida.

Estos archivos se prepararon y probaron en PostgreSQL aislado. No se aplicaron a
la base de datos del usuario. No asumir ejecución automática por guardar SQL en
`db/migration`; usar el procedimiento de despliegue del proyecto.

Después de aplicar los archivos y reiniciar, repetir la consulta del selector con
credenciales vigentes. No es necesario editar el catálogo para que los títulos
`Explique sus creencias` y `Expliquemos nuestras creencias` sean equivalentes.

## Verificación reproducible

```powershell
.\mvnw.cmd -q test
.\scripts\test-assignment-identity-migration.ps1
```

El segundo comando crea un contenedor PostgreSQL 17 desechable sin puertos ni
volúmenes del usuario. Aplica los scripts dos veces y comprueba categorías,
normalización, restricciones y conservación de whitelist y filas semanales.
La suite Java cubre permisos, contexto, historial por categoría/rol/sala e
importación con cambio de título conservando ID y participantes.

Para revertir aplicación, conservar las columnas aditivas y volver a la versión
anterior. No borrar catálogo, identidades ni whitelist durante la reversión.
El código anterior recuperaría sus limitaciones de inferencia textual.
