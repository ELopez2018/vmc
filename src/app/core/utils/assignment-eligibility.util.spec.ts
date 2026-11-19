import { assignmentAssistantRestriction, isExplainingBeliefsSpeechAssignment, persistedAssignmentType, teachingAssignmentType } from './assignment-eligibility.util';
import { SectionMeeting } from '../enums/meetings.enums';

describe('Restricción de discurso de Explique sus creencias', () => {
  for (const title of ['Explique sus creencias', 'Expliquemos nuestras creencias', 'EXPLIQUEMOS NUESTRAS CREENCIAS']) {
    it(`mantiene la restricción de discurso para ${title}`, () => {
      expect(isExplainingBeliefsSpeechAssignment({ title, sourceText: '(5 mins.) Discurso.' })).toBeTrue();
      expect(isExplainingBeliefsSpeechAssignment({ title, sourceHtml: '<p>Discurso.</p>' })).toBeTrue();
      expect(isExplainingBeliefsSpeechAssignment({ title, sourceText: '(5 mins.) Escenificación.' })).toBeFalse();
    });
  }

  it('no extiende la restricción a otras asignaciones cuya fuente menciona discurso', () => {
    expect(isExplainingBeliefsSpeechAssignment({ title: 'Haga revisitas', sourceText: 'Discurso.' })).toBeFalse();
  });

  it('la modalidad PAIR prevalece sobre texto de fuente anterior', () => {
    expect(isExplainingBeliefsSpeechAssignment({ categoryCode: 'EXPLAINING_BELIEFS', participationMode: 'PAIR', title: 'Explique sus creencias', sourceText: 'Discurso.' })).toBeFalse();
  });

  it('SOLO no significa por sí solo discurso ni agrega una restricción de género', () => {
    expect(isExplainingBeliefsSpeechAssignment({ categoryCode: 'EXPLAINING_BELIEFS', participationMode: 'SOLO', title: 'Tema editado' })).toBeFalse();
  });
});

describe('Identidad persistida de asignaciones', () => {
  const sectionMeeting = SectionMeeting.SEAMOS_MEJORES_MAESTROS;
  it('no atribuye una categoría alternativa a un código desconocido o a otra sección', () => {
    expect(persistedAssignmentType({ categoryCode: 'FUTURE_CATEGORY', sectionMeeting }, false)).toBe('');
    expect(persistedAssignmentType({ categoryCode: 'EXPLAINING_BELIEFS', sectionMeeting: SectionMeeting.NUESTRA_VIDA_CRISTIANA }, false)).toBe('');
  });
  it('conserva la vía legada cuando no se recibe categoría', () => {
    expect(persistedAssignmentType({ categoryCode: null, sectionMeeting }, false)).toBeUndefined();
  });
  for (const participationMode of ['SOLO'] as const) {
    it(`impide ayudante para ${participationMode} en la sección estudiantil`, () => {
      expect(assignmentAssistantRestriction({ participationMode, sectionMeeting })).toBeTruthy();
    });
  }
  it('UNKNOWN conserva la compatibilidad transitoria sin declarar PAIR', () => {
    expect(assignmentAssistantRestriction({ participationMode: 'UNKNOWN', sectionMeeting })).toBeNull();
    expect(assignmentAssistantRestriction({ categoryCode: 'SPEECH', participationMode: 'UNKNOWN', sectionMeeting })).toBeTruthy();
  });
  it('clasifica solo equivalencias explícitas y conserva prioridad de identidad', () => {
    expect(teachingAssignmentType({ title: '  ¿QUÉ DIRÍAS? ', sectionMeeting }, true)).toBe('whatWouldYouSayAssistant');
    expect(teachingAssignmentType({ title: 'Comentarios sobre un discurso', sectionMeeting }, false)).toBe('');
    expect(teachingAssignmentType({ title: 'Tema editado', categoryCode: 'EXPLAINING_BELIEFS', sectionMeeting }, true)).toBe('explainingYourBeliefsAssistant');
  });
  it('no extiende la política a otras secciones ni convierte nulos en PAIR', () => {
    expect(assignmentAssistantRestriction({ participationMode: 'SOLO', sectionMeeting: SectionMeeting.NUESTRA_VIDA_CRISTIANA })).toBeNull();
    expect(assignmentAssistantRestriction({ participationMode: null, sectionMeeting })).toBeNull();
    expect(assignmentAssistantRestriction({ participationMode: 'PAIR', sectionMeeting })).toBeNull();
  });
});
