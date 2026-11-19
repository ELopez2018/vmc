# Integración del frontend con identidad de asignaciones

Revisión: 2026-11-18. Referencias: [contrato de candidatos](backend-assignment-candidates-contract.md)
y [guía de etapa 2](backend-assignment-candidates-stage-2-guide.md).
El estado implementado y la política transitoria vigentes se describen en
[implementación y despliegue](backend-assignment-identity-deployment.md), que
prevalece sobre el diseño anterior cuando difieren.

## Implementado en el frontend

- `Assignment`, la proyección de programas y `AssignmentLite` admiten
  `categoryCode` y `participationMode` opcionales y nulos.
- El adaptador de `/meetings/programs/{congregationId}` conserva ambos campos
  junto con `assignmentId`, título y las cuatro fuentes. Se conservan también
  al construir el modelo para impresión y al combinar respuestas de guardado.
- La ausencia de estos campos sigue siendo válida para el backend anterior.
  No se inventa una categoría o modalidad por defecto al recibirlos vacíos.
- Guardar participantes sigue enviando IDs de asignación, programa y personas,
  sala y los demás campos actuales. No se agrega una reclasificación semántica
  al request de guardado semanal ni se cambia el significado de sus nulos.
- El selector conserva el contrato de etapa 1: clave `assignment`, ID disponible,
  rol, sala y contexto. No envía códigos sugeridos como claves de `assignment`.
- Cuando recibe `categoryCode`, lo traduce a la clave del request con prioridad
  sobre título y número en las dos vistas de programa y en el selector. Un código
  desconocido o incompatible con la sección muestra un error; no recurre a una
  categoría distinta por coincidencia de título.
- Se reconocen los seis códigos de la guía: `STARTING_A_CONVERSATION`,
  `FOLLOWING_UP`, `MAKING_DISCIPLES`, `EXPLAINING_BELIEFS`, `WHAT_WOULD_YOU_SAY`
  y `SPEECH`. El rol se traduce a la clave correspondiente de responsable o
  ayudante; `SPEECH` no genera una clave de ayudante.
- `SOLO` oculta el selector de ayudante en ambas salas y bloquea su consulta
  incluso si se abre directamente el modal. `UNKNOWN` conserva la compatibilidad
  transitoria: permite consultar candidatos por categoría y rol en A/B, y el
  backend determina sus autorizaciones. No se convierte esa modalidad en `PAIR`.
- `PAIR` conserva la selección por rol en A/B y prevalece sobre la heurística
  anterior de discurso de creencias. La categoría `SPEECH` sigue sin admitir
  ayudante aunque se reciba un contexto contradictorio.
- Sin categoría, SEAMOS MEJORES MAESTROS se resuelve mediante las equivalencias
  explícitas de `AssignmentIdentity`, normalizando tildes, espacios, mayúsculas
  y signos de pregunta. No se clasifica por número ni por coincidencias parciales.
  Un título editado sin categoría reconocible requiere corregir su identidad en
  el backend. Las demás secciones conservan su resolución propia.
- La modalidad `SOLO` por sí sola no impone una restricción de género. Se conserva
  la restricción existente de discurso de creencias cuando la fuente lo identifica.

## Coordinación con backend

El documento de implementación confirma código backend para identidad, consulta,
historial, importación y balanceo. Se verificaron en el código local los seis
códigos de `AssignmentCategory` y las equivalencias de `AssignmentIdentity`.
Eso no acredita que las migraciones estén aplicadas a la base del usuario.
No se codifican IDs numéricos de permisos ni se conceden autorizaciones en el cliente.

La implementación utiliza `assignment_types.category_code` junto con rol y
sección; no requiere la segunda tabla de mapeo propuesta en el diseño inicial.
Durante esta transición no mueve permisos entre secciones, no modifica la
whitelist y conserva las compatibilidades existentes de discípulos y creencias.

El backend debe aplicar las validaciones de acceso, rol, sala y modalidad tanto
al consultar como al guardar. Las restricciones de interfaz no sustituyen esas
validaciones. El request de candidatos y el formato de sus métricas se conservan.

### Actualización del inventario de permisos

El catálogo aportado el 2026-11-18 identifica permisos de ayudante existentes
para discípulos y creencias en una sección distinta a la de sus partes. No se
deben tratar como permisos inexistentes ni crear duplicados por esa suposición.
La corrección de sección o creación de un permiso canónico corresponde a la
migración coordinada del backend, comparando primero las autorizaciones efectivas.

Esta actualización no cambia los códigos de categoría, las modalidades ni el
request del selector. El frontend no traduce esos registros a IDs constantes,
no mueve permisos de sección ni une las listas de estudiante y ayudante.
Las listas de candidatos siguen procediendo de la resolución del backend;
el catálogo de permisos por sí solo no acredita la autorización de una persona.

Para desplegar y verificar el flujo completo:

1. Aplicar mediante el procedimiento de despliegue los scripts
   `V20261118_1500__assignment_semantic_identity.sql` y
   `V20261118_1510__backfill_assignment_semantic_identity.sql`, en ese orden,
   antes de arrancar el backend actualizado. Esta actualización del frontend
   no ejecuta esos scripts.
2. Revisar los conteos de clasificación pendientes. El corte estricto de
   modalidades y la separación definitiva de permisos heredados siguen pendientes;
   `UNKNOWN` conserva el comportamiento transitorio implementado.
3. Verificar que los códigos desplegados corresponden al mapeo del cliente y
   probar títulos editados, modalidades y participantes en ambas salas.
4. Verificar integración con respuestas reales del backend. Las pruebas HTTP
   simuladas del frontend no acreditan migraciones, permisos ni validaciones
   ejecutadas en PostgreSQL.

La migración, el backfill, la resolución común del backend y su corte de lectura
siguen siendo trabajo del backend. Esta actualización implementa el consumo
condicional del frontend; no acredita que esos cambios estén desplegados.
