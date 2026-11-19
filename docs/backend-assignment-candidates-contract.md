# Candidatos por tipo, rol y sala

Contrato de transición del frontend y propuesta de implementación backend.
Revisión: 2026-11-18.

## Alcance y compatibilidad

La propuesta es viable, pero corrige resultados existentes: recuperar historial
omitido puede cambiar la pertenencia a `frequent` y el orden de candidatos.
Compatibilidad del request y de la estructura JSON no significa resultados idénticos.
Las validaciones nuevas también rechazarán contextos contradictorios antes tolerados.

Implementar en dos etapas: primero la consulta compatible y su resolución común;
después la identidad persistida y su migración. Las modificaciones al guardado
se especifican por separado y no son un requisito para desplegar la consulta.
La implementación aditiva ya está disponible en el backend. Consultar
`vmc_backend/docs/assignment-identity-backend.md` para alcance, pruebas y migraciones
previas al arranque; el corte definitivo de permisos y modalidades sigue pendiente.

## Problema que debe corregir el backend

En `UserService.findAllUserByType`, `explainingYourBeliefs` consulta el historial
con la constante `Explique sus creencias`. Las consultas de `UserRepository`
comparan títulos mediante `LIKE` y también restringen por `assignmentNumber`.
Así pueden omitir participaciones de `Expliquemos nuestras creencias` o de
la misma categoría que apareció en otro número del programa.

El título visible y el número actual no identifican una categoría de historial.
El título importado debe conservarse para mostrarlo.

## Request que envía ahora el frontend

Se conserva `GET /users/by-congregation/participated-and-authorized-by-assignment`
y su respuesta `{ frequent, brothers, sisters }`. Se agregan dos parámetros
opcionales, sin cambiar los anteriores:

| Parámetro | Significado |
| --- | --- |
| `assignment` | Clave existente: `explainingYourBeliefs` o `explainingYourBeliefsAssistant`, por ejemplo. Se conserva por compatibilidad. |
| `assignmentId` | ID de `Assignment`, cuando la proyección lo incluye. No es el ID de `WeeklyProgram` ni del catálogo de permisos. |
| `participantRole` | `responsible` o `assistant` para partes semanales. Se omite en cargos del programa como presidencia y oraciones. |
| `room` | Sala seleccionada: `A` o `B`. Es independiente de `assignmentId`. |
| `congregationId` | Congregación de la consulta. Validar acceso del usuario autenticado. |
| `dateAssignment` | Fecha de referencia del selector. |
| `assignmentTitle` | Título visible original, conservado para compatibilidad y presentación. |
| `sectionMeeting` | Sección de la parte actual. |
| `assignmentNumber` | Posición de la parte actual, útil para resolver su contexto; no para limitar el historial de su categoría. |
| `sort` | Parámetro existente opcional. Conservar `lastAssignmentAsc`, `lastAssignmentDesc`, `lastGlobalAssignmentAsc` y `lastGlobalAssignmentDesc`; el valor predeterminado sigue siendo `lastGlobalAssignmentAsc`. |

Ejemplo con ID ilustrativo (reemplazar por el ID real recibido):

```http
GET /users/by-congregation/participated-and-authorized-by-assignment?assignment=explainingYourBeliefsAssistant&assignmentId=301&participantRole=assistant&congregationId=2&dateAssignment=2026-12-28&room=B&assignmentTitle=Expliquemos%20nuestras%20creencias&sectionMeeting=SEAMOS%20MEJORES%20MAESTROS&assignmentNumber=6
Authorization: Bearer <token>
```

Las proyecciones sin `assignmentId` siguen admitidas: se omite ese parámetro y
se envía el contexto anterior más el rol. Consultar candidatos no debe crear una
fila de sala B; la creación sigue ocurriendo al guardar la selección.
Los cargos del programa no deben resolver una asignación semanal residual.

## Salas y participantes de SEAMOS MEJORES MAESTROS

Una misma asignación puede presentarse en ambas salas. Sus cuatro selecciones
son independientes:

| Selección | `assignment` del ejemplo | `participantRole` | `room` | Historial del participante |
| --- | --- | --- | --- | --- |
| Responsable A | `explainingYourBeliefs` | `responsible` | `A` | `responsible` |
| Ayudante A | `explainingYourBeliefsAssistant` | `assistant` | `A` | `assistant` |
| Responsable B | `explainingYourBeliefs` | `responsible` | `B` | `responsible` |
| Ayudante B | `explainingYourBeliefsAssistant` | `assistant` | `B` | `assistant` |

La asignación compartida no implica compartir participantes. La consulta debe
separar el rol y calcular la métrica interna de sala para la sala elegida.
La respuesta actual no expone esa métrica por sala; ver el contrato de métricas.

Las variantes identificadas por la fuente como discurso no llevan ayudante.
La consulta debe rechazar ese rol cuando la modalidad pueda determinarse con
datos persistidos confiables. El título genérico de la categoría por sí solo no
permite distinguir una demostración de un discurso.

## Etapa 1: consulta compatible y resolución común

1. Aceptar `assignmentId` y `participantRole` opcionales en controller y servicio.
   Con ID, cargar la asignación real y resolver su categoría con sus datos
   persistidos. Verificar su relación con la semana y el programa de la
   congregación según las reglas de contexto siguientes. Validar acceso del
   usuario autenticado; tener un JWT no acredita acceso a cualquier congregación.
   No confiar en el título enviado para autorizar.
   Un ID inexistente o un contexto contradictorio debe producir un error claro,
   sin usar silenciosamente otra asignación. Sin ID, admitir el contrato legado.
2. Resolver una categoría estable y un rol. La clave con sufijo `Assistant`
   debe coincidir con `participantRole=assistant`; sin rol explícito, derivarlo
   de la clave para clientes antiguos. Rechazar contradicciones. No confundir
   `responsible` con los tipos del catálogo `Estudiante`/`Encargado`: mapearlos
   según la categoría. Para `assistant`, aplicar el permiso de `Ayudante` o una
   compatibilidad heredada explícita conforme a la tabla de permisos siguiente.
3. Centralizar equivalencias para resolución e historial: `Empiece/Empecemos
   conversaciones`, `Haga/Hagamos revisitas`, `Haga/Hagamos discípulos`,
   `Explique sus/Expliquemos nuestras creencias`, `¿Qué diría?/¿Qué dirías?`.
   Normalizar tildes, espacios y mayúsculas. Usar equivalencias explícitas para
   no mezclar partes distintas con un `LIKE` amplio.
4. Consultar autorizaciones desde el catálogo y su whitelist para categoría y
   rol, sin IDs numéricos hardcodeados ni coincidencias por descripción sola.
   La sección de la parte sigue siendo SEAMOS MEJORES MAESTROS para ambos roles.
   No eliminar las compatibilidades heredadas al introducir el rol explícito;
   tampoco ampliarlas mediante un fallback genérico por título o número.
5. Consultar historial por categoría + rol, incluyendo todas sus variantes y
   posiciones históricas. No filtrar por el ID de la asignación actual, por su
   título literal ni por su número actual. `assignmentId` resuelve el contexto;
   cada semana puede tener otro ID de la misma categoría.
6. Mantener el contrato de métricas siguiente. No sumar una participación como
   ayudante al historial de responsable del tipo. El historial global sí incluye
   ambos roles según las reglas existentes.
7. Conservar filtros de eliminación lógica y devolver autorizados sin historial
   en `brothers`/`sisters`; la ausencia de historial no elimina una autorización.

8. Compartir el resolvedor de categoría, modalidad y rol entre autorización,
   historial y `BalancedAssignmentService`. Este último también infiere categorías
   por texto y número: no mantener dos reglas distintas. Incorporarlo con pruebas
   de regresión que preserven puntuación y rotación salvo el historial corregido.
   No retirar globalmente filtros por número: las claves de partes numeradas y
   las categorías de otras secciones conservan sus reglas propias.

### Validación del contexto

- `Assignment` pertenece a una reunión importada y puede compartirse entre
  congregaciones; el acceso se valida sobre la congregación y su programa,
  no suponiendo que `Assignment` tiene una congregación propietaria.
- El request actual no incluye `programId`. Resolver el programa por congregación
  y semana de la reunión. Si no existe o no puede resolverse de forma inequívoca,
  devolver un error de contexto; no escoger arbitrariamente otro programa.
- `dateAssignment` sigue siendo la fecha de referencia recibida, en formato
  `YYYY-MM-DD`. Para validar la semana, obtener su lunes y compararlo con
  `assignment.meeting.week`. Esto admite tanto el lunes como el día de reunión.
  Esa normalización es solo para validar contexto: no cambiar la fecha de corte
  usada por las métricas históricas y futuras.
- Con ID, sección y número recibidos, cuando estén presentes, deben coincidir
  con la asignación persistida. La clave debe ser compatible con su categoría
  y el rol. El título recibido es de presentación y no prevalece sobre el ID;
  una diferencia solo en ese texto no debe cambiar permisos ni generar error.
- No exigir una fila de `WeeklyProgram` en la sala solicitada para consultar
  candidatos. Validar sala configurada y política de la sección sin crear filas.
- Sin ID, resolver la categoría desde la clave y equivalencias explícitas,
  usando sección y número como contexto, nunca como autorización alternativa de
  otra categoría. Conservar las solicitudes válidas del cliente anterior.
- Presidencia, oraciones y demás cargos conservan su resolución propia.
  No buscar una parte semanal a partir de metadatos residuales. El frontend omite
  `assignmentId` y `participantRole` en estos cargos; el backend ignora esos
  metadatos semanales si llegan y autoriza exclusivamente el cargo solicitado.
- Publicar errores controlados: `400` para rol, sala o contexto incompatibles;
  `404` para un ID inexistente; `403` para falta de acceso. Mantener el formato
  de error existente y no continuar mediante otra asignación.

### Compatibilidad de permisos heredados

Referencia de catálogo actualizada con los datos aportados por el usuario el
2026-11-18. El respaldo `Full backup16-10-2026-vmc.sql` queda como referencia
histórica. Confirmar el catálogo del entorno al desplegar y no usar sus IDs
numéricos como constantes del código. La lista aportada no incluye la whitelist
`users_assignment_types`, por lo que no determina qué personas están habilitadas.

| Categoría | Responsable | Ayudante en la transición |
| --- | --- | --- |
| Empiece/Empecemos conversaciones | Permiso `Estudiante` de SEAMOS MEJORES MAESTROS. | Permiso `Ayudante` de la misma categoría y sección. |
| Haga/Hagamos revisitas | Permiso `Estudiante` de SEAMOS MEJORES MAESTROS. | Permiso `Ayudante` de la misma categoría y sección. |
| Haga/Hagamos discípulos | Permiso `Estudiante` de SEAMOS MEJORES MAESTROS. | El catálogo del respaldo ubica `Ayudante` en NUESTRA VIDA CRISTIANA. No activarlo automáticamente: la consulta existente puede recurrir al permiso `Estudiante` de SEAMOS MEJORES MAESTROS. Conservar esa compatibilidad hasta una migración coordinada. |
| Explique sus/Expliquemos nuestras creencias | Permiso `Estudiante` de SEAMOS MEJORES MAESTROS. | Existe un permiso `Ayudante` en la sección 3 (ID 16 en los datos aportados), fuera de la sección de la parte. No activarlo automáticamente: conservar la compatibilidad explícita con `Estudiante` de esta categoría hasta una migración coordinada, solo para modalidades que admiten ayudante. |
| ¿Qué diría?/¿Qué dirías? | Permiso `Estudiante` de SEAMOS MEJORES MAESTROS. | Permiso `Ayudante` de la misma categoría y sección. |
| Discurso | Permiso `Estudiante` de su categoría. | No admite ayudante. |

Si existe un permiso `Ayudante` propio en SEAMOS MEJORES MAESTROS, conservar
la precedencia actual de ese permiso sobre la compatibilidad con `Estudiante`.
No unir automáticamente ambas listas de autorizados. La pertenencia a la
whitelist se verifica siempre para el permiso finalmente resuelto.

La compatibilidad de permiso no mezcla historial: aunque se autorice mediante
`Estudiante`, el historial solicitado como ayudante usa únicamente `assistant_id`.
La sección histórica sigue siendo SEAMOS MEJORES MAESTROS.

### Contrato de métricas y listas

Conservar `{ frequent, brothers, sisters }` y los campos de `history`:

| Campo | Semántica que debe conservarse |
| --- | --- |
| `lastAssignment` | Última fecha del tipo y rol solicitados, considerando ambas salas. No convertirla en fecha de la sala seleccionada. |
| `allAssignments` | Total global de participaciones según el cálculo existente. No reutilizarlo como contador de la categoría ni del rol. |
| `dateLastAssignment` | Última fecha global de participación. |
| `daysSinceLastIntervention` | Diferencia en días entre la última fecha global y `dateAssignment`, conservando el tratamiento actual por lista y de valores nulos. |
| `inNearFuture` | Días desde `dateAssignment` hasta la próxima participación global; `null` si no existe. No convertirlo en booleano ni limitarlo a categoría, rol o sala. |

El historial actual incluye semanas con `meeting.week <= dateAssignment`; la
búsqueda futura usa semanas posteriores a esa fecha. Mantener esa frontera,
incluida la semana consultada y las participaciones de cargos del programa en
el cálculo global. No cambiar fechas de semana por fechas reales de reunión.

El contador por categoría/rol y la última fecha de esa categoría/rol por sala
son métricas internas separadas. No se exponen actualmente en este DTO. Si se
necesitan en pantalla, acordar campos adicionales opcionales y documentarlos
antes de agregarlos, conservando los campos anteriores.

`brothers` y `sisters` incluyen autorizados sin historial. `frequent` mantiene
la condición de participación previa y el filtro actual de frecuencia de
SEAMOS MEJORES MAESTROS, basado en la última participación global. Conservar
orden predeterminado, valores admitidos de `sort`, desempates y manejo de nulos.
La corrección del historial puede cambiar las listas y el orden resultantes,
pero no sus reglas de clasificación.

## Etapa 2: categoría y modalidad persistidas

Desarrollo detallado: [guía de implementación de etapa 2](backend-assignment-candidates-stage-2-guide.md).

Introducir una categoría estable en las asignaciones importadas y relacionarla
con permisos por rol. Mantener separadas la categoría y la modalidad que indica
si admite ayudante. Un único `assignment_type_id` no representa necesariamente
los permisos de ambos participantes.

Preparar una migración revisable del esquema, catálogo, whitelist e historial:

1. Incorporar la identidad semántica sin modificar títulos visibles ni campos
   de fuente (`sourceText`, `sourceHtml`, `sourceLinks`, `sourceUrl`).
2. Clasificar históricos con equivalencias explícitas; listar casos ambiguos
   para revisión, sin asignar permisos por aproximación textual o por número.
3. Migrar permisos de ayudante faltantes o ubicados en otra sección con un mapeo
   explícito de autorizaciones. No habilitar a todos los estudiantes como
   ayudantes fuera de las compatibilidades ya documentadas.
4. Preservar relaciones de `weekly_programs`, participantes, salas y programas.
   Cambiar un título o reimportar debe conservar categoría y modalidad válidas.
   Revisar el upsert existente por reunión/número/título: cambiar el título hoy
   puede producir otro registro; agregar una categoría por sí solo no lo corrige.
   No colapsar dos partes de la misma categoría en una semana ni quitar el índice
   de identidad de importación sin una alternativa que evite duplicados.
5. Verificar la migración en una copia, comparar autorizaciones antes/después y
   definir reversión antes de aplicarla en el entorno de despliegue.

En etapa 1, cambiar solo el título enviado junto al ID no afecta la resolución.
Editar arbitrariamente el título persistido no tiene esa garantía hasta contar
con la identidad de etapa 2. Un caso no clasificable debe fallar de forma clara.

## Guardado: alcance independiente

La consulta de candidatos no cambia participantes ni crea salas. El guardado
actual recibe y establece responsable y ayudante; no asumir que omitir uno de
ellos equivale a conservarlo. Mantener los contratos actuales de POST/PUT y
enviar ambos valores vigentes cuando se actualiza la fila completa.

Si se implementa una actualización de un solo participante, definir un contrato
explícito de actualización parcial: campo omitido conserva el valor, `null`
explícito lo elimina y un ID lo reemplaza. Ese contrato debe actualizar solo
la fila y sala elegidas, conservar el otro participante y evitar sobrescrituras
concurrentes. No reinterpretar silenciosamente los nulos del contrato existente.

La prohibición de ayudante en modalidad discurso también debe validarse en
las rutas de guardado, usando modalidad persistida o evidencia de fuente
confiable. Hoy no está garantizada de forma uniforme: reforzar estas rutas es
un cambio de validación separado, con pruebas propias. No borrar ayudantes
históricos automáticamente al desplegar la validación.

## Pruebas de aceptación del backend

- Título antiguo y nuevo producen la misma categoría e historial.
- Participaciones de la categoría en los números 4, 5, 6, 7 u 8 no se pierden
  por consultar una parte actualmente numerada 6.
- Responsable y ayudante se consultan por separado en A y B; la métrica interna
  de sala corresponde a la elegida y `lastAssignment` incluye ambas.
- Una persona que fue ayudante no figura con ese evento como responsable.
- Los autorizados sin participaciones siguen disponibles; los no autorizados
  y eliminados no aparecen como candidatos elegibles.
- La misma asignación permite seleccionar en B antes de existir su fila semanal.
- ID real y título enviado editado conservan categoría y permisos en etapa 1.
- Editar el título persistido conserva categoría y modalidad en etapa 2.
- Sin ID y sin rol explícito sigue funcionando el cliente anterior.
- ID/contexto/rol incompatibles fallan de forma controlada; no se otorgan permisos
  de otra categoría o congregación.
- Las compatibilidades heredadas de discípulos y creencias mantienen sus
  autorizados; un permiso de otra categoría no concede acceso y el permiso
  específico de ayudante conserva su precedencia cuando existe.
- Cada campo de `history`, `sort`, el filtro de frecuencia, los nulos y los
  indicadores futuros conservan su semántica con casos de frontera temporal.
- Lunes y día de reunión resuelven la misma semana para validar contexto, sin
  modificar la fecha de corte recibida para las métricas.
- Cargos del programa ignoran metadatos semanales residuales.
- `BalancedAssignmentService` usa la misma clasificación y conserva las reglas
  de puntuación y rotación salvo los resultados derivados del historial corregido.
- La variante discurso no admite consulta de ayudante en A ni B cuando su
  modalidad está determinada. La validación de guardado se verifica por separado.
- La consulta no persiste cambios, incluso si falla o aún no existe sala B.

Pruebas adicionales para la etapa 2 y el guardado: migración sin pérdida de
relaciones ni ampliación accidental de permisos; reimportación sin duplicados;
dos partes de una categoría en la misma semana conservan identidades distintas;
actualización parcial conserva campos omitidos y permite borrar con `null`
solo bajo su contrato explícito; modificar A no altera B y viceversa.

## Estado de integración

El frontend transmite identidad cuando está disponible y rol explícito,
manteniendo título, sección, número, clave y sala del contrato anterior.
Las pruebas del selector cubren ambas salas, ambos roles y títulos anteriores y
nuevos. El backend actualizado acepta ID y rol, valida contexto y consulta el
historial por categoría sin restringirlo al número actual. Para usarlo, aplicar
las migraciones de identidad y reiniciar según la documentación del backend.
No se ejecutaron migraciones sobre la base del usuario.

La revisión del backend ejecutó `UserAssignmentTypeServiceResolveRequestedTypeTest`
y `UserServiceFindAllUserByTypeResponseTest`: 25 pruebas aprobadas del estado
existente. No prueban las etapas nuevas; las pruebas de aceptación anteriores
deben implementarse y pasar antes de declarar completada la integración.
