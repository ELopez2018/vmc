import { Semana } from "src/app/core/interfaces/reuniones.interface";

export const SemanasMock: Semana[] = [
  {
    id:1,
    week: '01-01-2023',
    openingSong: '140',
    openingPrayer: 'Estarlin',
    president: 'Estarlin',
    introTime: 1,
    timeType: 'min',
    intermediateSong: '100',
    finalSong: '190',
    finalPrayer: 'Estarlin',
    weekNumber:10,
    assignments: [
      { tips: "", showTips: false, number: 1, title: 'Tres formas de hacernos más sabios', time: 5, timeType: 'min', pointNumber: 5, responsible: 'Estarlin', assistant: 'rufrainy', position: 1, sectionMeeting: "tesoros" },
      { tips: "", showTips: false, number: 2, title: 'Busquemos perlas escondidas', time: 5, timeType: 'min', pointNumber: 5, responsible: 'Estarlin', assistant: 'rufrainy', position: 2, sectionMeeting: "tesoros" },
      { tips: "Estudiante", showTips: true, number: 3, title: 'Lectura de la Biblia', time: 5, timeType: 'min', pointNumber: 5, responsible: 'Estarlin', assistant: 'rufrainy', position: 3, sectionMeeting: "tesoros" },
      { tips: "Estudiante/Ayudante", showTips: true, number: 4, title: 'title', time: 5, timeType: 'min', pointNumber: 5, responsible: 'Estarlin', assistant: 'rufrainy', position: 1, sectionMeeting: "maestros" },
      { tips: "Estudiante/Ayudante", showTips: true, number: 5, title: 'title', time: 5, timeType: 'min', pointNumber: 5, responsible: 'Estarlin', assistant: 'rufrainy', position: 2, sectionMeeting: "maestros" },
      { tips: "Estudiante/Ayudante", showTips: true, number: 6, title: 'title', time: 5, timeType: 'min', pointNumber: 5, responsible: 'Estarlin', assistant: 'rufrainy', position: 3, sectionMeeting: "maestros" },
      { tips: "Estudiante/Ayudante", showTips: true, number: 7, title: 'title', time: 5, timeType: 'min', pointNumber: 5, responsible: 'Estarlin', assistant: 'rufrainy', position: 4, sectionMeeting: "maestros" },
      { tips: "", showTips: false, number: 8, title: 'title', time: 5, timeType: 'min', pointNumber: 5, responsible: 'Estarlin', assistant: 'rufrainy', position: 1, sectionMeeting: "vida" },
      { tips: "", showTips: false, number: 9, title: 'title', time: 5, timeType: 'min', pointNumber: 5, responsible: 'Estarlin', assistant: 'rufrainy', position: 2, sectionMeeting: "vida" },
      { tips: "Conductor/Lector", showTips: true, number: 10, title: 'Estudio bíblico de la congregación', time: 5, timeType: 'min', pointNumber: 5, responsible: 'Estarlin', assistant: 'rufrainy', position: 3, sectionMeeting: "vida" },
    ]
  },
]

