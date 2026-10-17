# Asignaciones en el selector de publicadores

El modal de asignaciones (`SearchPublisherComponent`) muestra en Frecuentes,
Hermanos y Hermanas dos indicadores independientes: «Asignado esta semana» y
«Asignado la semana anterior». Cada uno incluye los títulos, roles y salas en
su descripción al pasar el cursor. Una persona puede tener ambos indicadores.
Son informativos: no impiden seleccionarla ni cambian el orden de candidatos.

## Evaluación del contrato actual

La evaluación se basa en los contratos y adaptadores del frontend; no se ha
comprobado una respuesta de un servidor activo ni modificado el backend.

- `GET /users/by-congregation/participated-and-authorized-by-assignment` entrega
  `frequent`, `brothers`, `sisters`, cada candidato con `user` e `history`.
  No declara asignaciones por semana ni alertas. `lastAssignment` y
  `dateLastAssignment` son históricos; no prueban la ausencia de asignaciones
  en las dos semanas consultadas.
- `ProgramValidationsService` conserva alertas del backend por programa y
  `userId`. `PersonValidation.items` incluye mensajes y referencias `related`.
  Son alertas de conflictos, no un censo de participantes. Una persona con
  una sola participación puede no aparecer. Tampoco basta consultar las
  alertas de la semana elegida para encontrar a quienes participaron solamente
  la semana anterior. No se interpretan textos ni códigos para inferir estados.
- `MeetingsService.getProgramsByDateRange` ya permite pedir desde la semana
  anterior hasta la elegida. Devuelve responsables y ayudantes de todas las
  salas, presidencia, oraciones y consejero. El adaptador existente también
  hidrata las alertas mediante la proyección paginada de programas.

Con estos contratos se puede completar la función sin un nuevo endpoint.
El selector consulta ese rango al abrirse, agrupa participaciones por `user.id`
y fecha de semana, y muestra además los mensajes de validación del programa
elegido. La semana anterior es exactamente siete días antes, incluso al cambiar
de mes o año; no se elige el último programa disponible. Si falla la consulta,
se informa que los indicadores no están disponibles y se conserva la selección.

## Mejora opcional para el backend

Para evitar la consulta adicional de programas y la hidratación de alertas,
ampliar la respuesta del endpoint de candidatos con un bloque común:

```typescript
interface CandidateWeekContext {
  week: string; // YYYY-MM-DD, semana elegida normalizada al lunes
  previousWeek: string; // lunes anterior, aunque no exista programa
  persons: Array<{
    userId: number;
    current: ParticipationRef[];
    previous: ParticipationRef[];
    validation: PersonValidation | null;
  }>;
}
```

`ParticipationRef` y `PersonValidation` ya están definidos en
`src/app/core/interfaces/program-validations.interface.ts`. Este bloque es una
propuesta; el frontend actual no depende de él. Incluir a todos los candidatos
con listas vacías cuando corresponda, para distinguir ausencia de asignaciones
de información omitida. Si se necesita mostrar la sala, añadir `room` a la
referencia. Respetar la congregación autorizada y cubrir todos los roles y salas,
sin limitarse al tipo de asignación que se está seleccionando.

Casos de aceptación: una sola participación sin alerta, ambas semanas para la
misma persona, ayudantes y sala B, presidencia y oraciones, semana anterior sin
programa, cambio de año, personas homónimas con IDs distintos y actualización
al reabrir el selector después de guardar o borrar una asignación.
