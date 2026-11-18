import { isExplainingBeliefsSpeechAssignment } from './assignment-eligibility.util';

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
});
