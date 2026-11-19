# Etapa 2: identidad persistida de asignaciones

Guía de implementación backend. Fecha: 2026-11-18.

Complementa [el contrato de candidatos](backend-assignment-candidates-contract.md).
Estado: implementación aditiva disponible en el backend; las migraciones no se
han aplicado a la base del usuario. Consultar `vmc_backend/docs/assignment-identity-backend.md`
para el alcance implementado, scripts y validación. Esta guía conserva el diseño
del corte definitivo, incluidos los permisos heredados y modalidades pendientes. La etapa 1 debe estar implementada y verificada antes de
activar las lecturas definitivas de etapa 2.

## Objetivo y límites

Persistir la categoría y modalidad de cada parte para que autorización e
historial dejen de depender del título visible o de su posición actual.
Conservar los IDs de asignaciones, relaciones semanales, participantes, salas,
fuentes y semántica del API existente.

La corrección puede recuperar eventos omitidos y cambiar `frequent`, sus fechas
y el orden de candidatos. La migración de permisos debe conservar el conjunto
efectivo de autorizados previo al cambio, salvo diferencias revisadas de forma
explícita. No prometer resultados idénticos cuando se corrige el historial.

El alcance inicial son las categorías de SEAMOS MEJORES MAESTROS atendidas por
el selector. Presidencia, oraciones, consejería y otras secciones conservan su
resolución actual; no forzar todos los cargos dentro del catálogo nuevo.

## Base comprobada y verificación previa

La revisión anterior usó `Full backup16-10-2026-vmc.sql`, del 2026-10-16 17:32.
Es una referencia histórica, no una comprobación del esquema de producción.
El usuario aportó el catálogo `assignment_types` el 2026-11-18; sus registros
prevalecen para el inventario de permisos de esta guía. Esa lista no incluye
`users_assignment_types`, asignaciones históricas ni modalidad de las partes.
Seleccionar de nuevo el respaldo más reciente y verificar el entorno antes de
preparar SQL definitivo. No incluir datos personales en informes de migración.

El código revisado presenta estas condiciones:

- `Assignment` contiene título, número, sección, reunión y fuentes, sin categoría
  ni modalidad persistidas.
- `AssignmentType` representa permisos y distingue descripción, tipo y sección.
  `users_assignment_types` es una whitelist: la ausencia de fila deniega permiso.
- `UserAssignmentTypeService` mantiene compatibilidades que utilizan permisos
  de estudiante para determinados ayudantes.
- `BalancedAssignmentService` tiene inferencia propia por texto y número.
- `AssignmentRepository.findImportMatches` busca por reunión, número y título.
  El índice `ux_assignments_import_identity` utiliza esos mismos datos normalizados.
- El contrato de fuentes indica que las migraciones SQL se aplican mediante el
  procedimiento de despliegue. Confirmar si existe un ejecutor de migraciones
  al implementar; no asumir que poner un archivo en una carpeta lo ejecuta.

## Modelo propuesto

Usar una categoría semántica independiente del permiso. El rol pertenece a la
participación, mientras que la modalidad pertenece a la parte de esa semana.

| Elemento | Datos y restricciones propuestas |
| --- | --- |
| `assignment_categories` | `code` como clave primaria estable, sección canónica y estado activo. El texto visible no es la clave. |
| `assignments.category_code` | FK nullable durante la transición. Obligatoria para las categorías dentro del alcance al finalizar su clasificación. |
| `assignments.participation_mode` | `PAIR`, `SOLO` o `UNKNOWN`; nullable solo durante la expansión si lo requiere la compatibilidad de despliegue. |
| Mapeo de permisos | La implementación aditiva incorpora `assignment_types.category_code` y conserva `type` y sección como discriminadores. No agrega una tabla `assignment_category_permissions`; si se necesita sustituir compatibilidades heredadas por mapeos externos, hacerlo en una migración posterior revisada. |
| Identidad de importación | Clave de parte externa opcional, separada de categoría y título, solo cuando la fuente permita extraer una identidad confiable. |

Roles permitidos en el mapeo: `RESPONSIBLE` y `ASSISTANT`. El request conserva
`responsible` y `assistant`; convertirlos en el límite del API.
La modalidad `SOLO` impide ayudante aunque exista un mapeo para la categoría.
Una categoría como creencias puede admitir modalidades distintas según la semana.

Códigos iniciales sugeridos, que deben fijarse antes de generar SQL:

| Código | Equivalencias explícitas de clasificación |
| --- | --- |
| `STARTING_A_CONVERSATION` | Empiece conversaciones / Empecemos conversaciones |
| `FOLLOWING_UP` | Haga revisitas / Hagamos revisitas |
| `MAKING_DISCIPLES` | Haga discípulos / Hagamos discípulos |
| `EXPLAINING_BELIEFS` | Explique sus creencias / Expliquemos nuestras creencias |
| `WHAT_WOULD_YOU_SAY` | ¿Qué diría? / ¿Qué dirías? |
| `SPEECH` | Discurso |

Normalizar tildes, espacios y mayúsculas antes de clasificar. No usar el número
para atribuir una categoría diferente ni una coincidencia amplia para conceder
permisos. Los códigos son identificadores del dominio; los IDs numéricos de
permisos se resuelven desde el catálogo verificado.

No agregar un único `assignment_type_id` a `assignments` para representar los
dos participantes. Tampoco crear una restricción única por reunión y categoría:
una semana puede contener varias partes de la misma categoría.

## Resolución de modalidad

El importador debe obtener `PAIR` o `SOLO` de evidencia inequívoca del contenido
fuente de la parte. Registrar la regla aplicada en el informe de clasificación
y conservar el contenido fuente existente. Un título genérico no basta.

Los históricos sin evidencia suficiente quedan `UNKNOWN` para revisión.
La presencia histórica de un ayudante sirve para detectar conflictos, pero no
prueba que la fuente permita ese rol. No borrar ni reinterpretar participaciones
históricas para hacerlas coincidir con una modalidad inferida.

Durante la transición, mantener el comportamiento de etapa 1 para datos sin
clasificar, de forma acotada y observable. Antes del corte definitivo, resolver
los `UNKNOWN` de las partes que puedan consultarse o guardarse. Tras el corte,
un ayudante sobre una parte aún ambigua produce un error controlado de contexto;
no se habilita por defecto ni se acepta silenciosamente al guardar.

## Migración del catálogo y las autorizaciones

Inventario basado en el catálogo aportado por el usuario. Los IDs siguientes
documentan esos registros; no son constantes para el resolvedor ni sustituyen
las precondiciones del SQL de migración.

| Categoría | Permiso de responsable actual | Permiso de ayudante actual | Observación |
| --- | --- | --- | --- |
| `STARTING_A_CONVERSATION` | ID 4, `Estudiante`, sección 2 | ID 13, `Ayudante`, sección 2 | Ambos roles tienen un permiso propio en la sección de la parte. |
| `FOLLOWING_UP` | ID 12, `Estudiante`, sección 2 | ID 5, `Ayudante`, sección 2 | Normalizar espacios de descripción para resolver el catálogo. |
| `MAKING_DISCIPLES` | ID 6, `Estudiante`, sección 2 | ID 15, `Ayudante`, sección 3 | El permiso existe, pero está en otra sección; comprobar su uso efectivo y whitelist. |
| `EXPLAINING_BELIEFS` | ID 7, `Estudiante`, sección 2 | ID 16, `Ayudante`, sección 3 | El permiso existe, pero está en otra sección; no tratarlo como inexistente ni activarlo automáticamente. |
| `WHAT_WOULD_YOU_SAY` | ID 23, `Estudiante`, sección 2 | ID 24, `Ayudante`, sección 2 | Ambos roles tienen un permiso propio en la sección de la parte. |
| `SPEECH` | ID 8, `Estudiante`, sección 2 | Ninguno | Modalidad individual; no crear permiso de ayudante. |

Los valores `number` del catálogo son históricos y no son una identidad de
categoría: por ejemplo, creencias figura con 5 y discurso con 7. No usarlos para
restringir las posiciones históricas ni para sustituir otra categoría.

En el alcance inicial, los únicos desajustes de sección de ayudante identificados
son los registros 15 y 16. Los cargos y permisos de otras secciones permanecen
fuera de esta migración. El catálogo por sí solo no demuestra que haya que crear
permisos adicionales o que todos los estudiantes deban ser ayudantes.

1. Inventariar por categoría los permisos actuales, su tipo y sección. Resolver
   duplicados y ambigüedades antes de elegir un registro; no usar `findFirst`
   como regla de negocio ni IDs copiados del respaldo.
2. Obtener el conjunto efectivo de autorizados por categoría y rol usando el
   comportamiento de etapa 1. Comparar conjuntos mediante IDs internos, sin
   nombres, correos ni otros datos personales en artefactos compartidos.
3. Conservar el permiso propio de `Ayudante` de la sección correcta cuando
   exista: no unirlo automáticamente con los permisos de estudiante.
4. Para creencias, revisar el permiso de ayudante existente en sección 3
   (ID 16 en el catálogo aportado) y para discípulos hacer lo mismo con el ID 15.
   Verificar referencias, whitelist y consumidores antes de decidir entre
   corregir su sección conservando su ID o crear un permiso canónico separado.
   No crear duplicados por asumir que esos registros no existen.
5. Si se conserva el registro y se corrige la sección, comparar la whitelist
   que empezaría a aplicar con el conjunto efectivo de etapa 1. Si difiere,
   preparar una conciliación explícita; mover la sección no preserva por sí
   solo el comportamiento. Si se necesita un registro nuevo para conservar
   consumidores del anterior, copiar únicamente las autorizaciones efectivas
   revisadas. No unir automáticamente la whitelist de estudiante con la del
   ayudante heredado. Conservar los permisos de estudiante originales.
6. Vincular cada categoría y rol con el permiso definitivo. Cambiar la lectura
   a ese mapeo solo después de cargar y verificar las autorizaciones.
7. Comparar conjuntos antes y después: diferencias no justificadas bloquean el
   corte. No habilitar usuarios por haber participado en el pasado.

La copia inicial no implica sincronización perpetua entre estudiante y ayudante.
Tras el corte sus permisos se editan por separado. Durante la migración, impedir
ediciones concurrentes de whitelist o capturar y aplicar sus diferencias antes
del corte; de otro modo, la copia puede perder altas o bajas recientes.

Conservar filtros de eliminación lógica de usuarios y congregaciones. La
elegibilidad actual no elimina eventos históricos de personas que ya no son
candidatos; autorización e historial son conceptos separados.

## Clasificación de históricos

Preparar un backfill separado de los cambios de esquema:

1. Clasificar únicamente registros dentro del alcance, con sección verificada
   y equivalencias explícitas. Clasificar modalidad por evidencia de fuente.
2. Producir conteos agregados de clasificados, ambiguos y pendientes. Incluir
   IDs técnicos en un informe interno de revisión, sin datos personales.
3. Permitir una tabla o archivo de excepciones revisadas por `assignment_id`
   para casos ambiguos; registrar clasificación anterior, nueva y motivo.
4. Actualizar categoría y modalidad sobre el registro existente. No crear otra
   asignación, renumerar partes ni modificar `weekly_programs.assignments_id`.
5. Hacer el backfill reejecutable sin sobrescribir decisiones manuales. Una
   clasificación diferente en una segunda ejecución debe generar conflicto
   revisable, no reemplazar la anterior silenciosamente.

No exigir `NOT NULL` a todas las asignaciones mientras otras secciones estén
fuera del alcance. Validar la cobertura del alcance mediante consultas y reglas
de aplicación; cualquier constraint condicional debe considerar la sección real
y los registros manuales admitidos antes de instalarse.

## Importación y edición sin pérdida de identidad

La categoría expresa qué tipo de parte es; no identifica cuál parte es dentro
de una semana. La clave de importación debe mantenerse separada.

Orden de resolución propuesto para una reimportación:

1. Si existe una clave externa confiable de la parte, buscar por reunión y esa
   clave. Validar su estabilidad en muestras reales; un ancla HTML o el número
   de un encabezado no son estables por definición.
2. Para registros antiguos sin clave, conservar la coincidencia exacta actual
   por reunión, número y título normalizado, validando contexto y clasificación.
3. Si el título cambió, proponer conciliación por reunión, posición y sección
   únicamente cuando haya una única coincidencia y categoría/modalidad sean
   compatibles. Asociar la identidad externa si está disponible.
4. Si existe contradicción o más de una coincidencia, detener la conciliación
   con error controlado e informe técnico. No elegir el primer registro ni
   insertar otro registro para ocultar el conflicto.
5. Insertar una parte nueva solo cuando se haya descartado un candidato previo
   dentro de su contexto. Los cambios simultáneos de título y posición sin clave
   externa requieren conciliación explícita; no se garantiza identidad automática.

Una edición de título mantiene `id`, categoría y modalidad. Una reclasificación
semántica requiere una operación explícita que valide participantes y permisos;
no hacerla como efecto secundario de editar texto. Si la fuente contradice una
clasificación ya persistida, informar el conflicto antes de sobrescribirla.

Mantener las cuatro fuentes y el título importado conforme a
`vmc_backend/docs/assignment-sources-front-contract.md`. No derivar la categoría
del título enviado por el cliente cuando existe identidad persistida.

Conservar `ux_assignments_import_identity` durante la transición. Si se introduce
una clave externa, agregar unicidad por reunión y clave para valores no nulos,
después de verificar colisiones. Cubrir importaciones concurrentes con
transacción y una estrategia de bloqueo por reunión o mecanismo equivalente;
el índice basado en título no impide por sí solo duplicados tras un renombrado.

## Cambios de aplicación

| Área | Trabajo requerido |
| --- | --- |
| Entidades y repositorios | Mapear categoría, modalidad y permisos por rol. Evitar serializar grafos JPA completos o provocar consultas por candidato. |
| `MeetingsService` | Clasificar al importar, conservar identidad al actualizar y detectar contradicciones. Mantener atomicidad de importación y generación. |
| `UserAssignmentTypeService` | Resolver por categoría y rol persistidos; consultar la whitelist del permiso mapeado. Mantener la vía de etapa 1 solo durante la transición. |
| `UserService` / `UserRepository` | Consultar historial por categoría y columna de participante. La sala limita únicamente la métrica de sala; el número actual no limita el historial de categoría. |
| `BalancedAssignmentService` | Consumir el mismo resolvedor, sin heurísticas paralelas. Preservar puntuación, rotación y reglas temporales salvo datos históricos corregidos. |
| Guardado semanal | Validar modalidad, acceso, sala y autorización con la misma resolución. Mantener el significado actual de POST/PUT y sus nulos. |
| DTOs y proyecciones | Agregar, si se necesitan, `categoryCode` y `participationMode` como campos opcionales en los DTOs que exponen asignaciones; conservar ID y campos de fuente. |

La respuesta del selector mantiene sus campos: `lastAssignment` sigue siendo
la última participación de categoría y rol en ambas salas; `allAssignments`
sigue siendo global. Conservar `dateLastAssignment`, `daysSinceLastIntervention`,
`inNearFuture`, frecuencia, orden, desempates y valores nulos del contrato previo.

Las solicitudes antiguas sin ID siguen admitidas mediante clave y equivalencias
explícitas hacia el catálogo nuevo. Esa compatibilidad del request no implica
continuar clasificando todo el historial por texto después del corte.

## Secuencia de despliegue

1. **Inventario:** verificar esquema, catálogo, código desplegado, restricciones,
   respaldo restaurable y conjuntos efectivos de permisos. Medir pendientes.
2. **Expansión:** aplicar SQL aditivo revisado para tablas, columnas e índices.
   Conservar columnas e índices anteriores y compatibilidad con el backend previo.
3. **Escritura y lectura transitorias:** desplegar el importador que persiste
   identidad y el resolvedor común con fallback acotado de etapa 1. Registrar
   cobertura y conflictos con conteos, sin datos personales.
4. **Backfill:** clasificar históricos, resolver excepciones y preparar permisos
   nuevos. Controlar las escrituras concurrentes durante la copia y el corte.
5. **Comparación:** contrastar autorizados y métricas, justificar diferencias de
   historial y ejecutar las pruebas de aceptación sobre una copia del entorno.
6. **Corte:** activar lectura por identidad para las categorías cubiertas y
   validación de modalidad al guardar. No activar con permisos o casos ambiguos
   sin resolver en partes que el usuario puede seleccionar.
7. **Consolidación:** retirar fallback textual del historial cubierto cuando la
   cobertura y la observación sean satisfactorias. Mantener compatibilidad de
   claves antiguas del request. Retirar estructuras antiguas solo en otro cambio.

Los interruptores de transición y su configuración son trabajo por implementar;
no se presume que existan. No depender de `ddl-auto=update` para este despliegue.
Versionar SQL de expansión, backfill y catálogo por separado, con precondiciones
y verificaciones posteriores; esta guía no sustituye esos scripts.

## Verificación y aceptación

- Títulos antiguos y nuevos resuelven la misma categoría; editar el título
  persistido conserva identidad y permisos.
- La categoría reúne históricos en posiciones 4 a 8 sin incluir otra categoría.
- Responsable y ayudante mantienen historiales separados en A y B. Las métricas
  globales conservan ambos roles según la regla actual.
- Las autorizaciones efectivas antes y después coinciden, incluidas las
  compatibilidades de creencias y discípulos; usuarios sin historial permanecen.
- Un permiso de otra categoría, sección o congregación no habilita candidatos.
- `SOLO` rechaza ayudante tanto al consultar como al guardar, en A y B.
- Ambigüedad no concede permisos; la migración no borra participantes históricos.
- Consultar sala B sin fila semanal no crea registros y sigue siendo posible.
- Reimportar con título corregido conserva el ID y todos los vínculos semanales.
- Dos partes de la misma categoría en una semana conservan identidades distintas.
- Importaciones concurrentes no duplican partes; un conflicto revierte la
  operación completa, incluida la generación asociada de programas.
- Editar una sala no modifica la otra; POST/PUT conservan su semántica de nulos.
- Fechas límite, frecuencia, orden, próximas participaciones y puntuación/rotación
  mantienen las reglas del contrato, con diferencias de historial justificadas.
- Reejecutar backfill no cambia decisiones revisadas ni multiplica permisos.

Combinar pruebas unitarias del resolvedor con integración sobre PostgreSQL para
FKs, índices, backfill y concurrencia. Los mocks o una base H2 no verifican por sí
solos el comportamiento de estas migraciones PostgreSQL. Probar restauración en
una instancia aislada, sin sustituir datos del entorno de trabajo.

## Reversión

Antes del corte, poder desactivar las lecturas nuevas y volver al resolvedor de
etapa 1, conservando las columnas aditivas. Revertir aplicación y esquema son
operaciones distintas: no eliminar datos nuevos para volver a una versión previa.

No borrar ni mover permisos originales durante la expansión. Registrar las
filas creadas por la migración para distinguirlas de ediciones posteriores.
Después del corte, el resolvedor anterior puede ignorar cambios hechos únicamente
en permisos nuevos; reconciliar las diferencias antes de retroceder o suspender
temporalmente su edición. No restaurar un respaldo sobre escrituras recientes
sin un procedimiento explícito de recuperación.

Conservar versiones de aplicación, scripts, informes agregados de comparación y
excepciones revisadas. La reversión debe ensayarse antes del despliegue definitivo.

## Entregables para declarar completada la etapa

- Migraciones SQL revisadas y aplicadas mediante el procedimiento del entorno.
- Backfill reejecutable y reporte de excepciones resueltas dentro del alcance.
- Mapeo final de permisos y comparación de autorizados sin diferencias imprevistas.
- Resolvedor único integrado en consulta, balanceo, importación y guardado.
- Pruebas aprobadas, verificación de cobertura y reversión ensayada.
- Contratos de API actualizados con los campos opcionales realmente implementados.

La implementación aditiva ya incorpora identidad, resolvedor común, consulta con
ID/rol, historial por categoría y conciliación de títulos al importar. El corte
estricto de modalidades, la conciliación de whitelist y la aplicación de las
migraciones al entorno siguen pendientes conforme a esta guía.
