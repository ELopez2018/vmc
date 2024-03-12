// export interface Semanas {
//   semana: string;
//   cancionInicial: string;
//   oracionInicial: string;
//   presidente: string;
//   tiempoIntro: number;
//   unidad: string;
//   cancionIntermedia: string;
//   cancionFinal: string;
//   oracionFinal: string;
//   asignaciones: Asignacion[];
// }
export interface Asignacion {
  tips: string;
  showtips: boolean;
  numero: number;
  title: string;
  tiempo: number;
  medida: string;
  puntoConsejo: number;
  encargado: string;
  ayudante: string;
  pos: number;
  seccion: string;
}
export interface Semana {
  id: number;
  week: string;
  weekNumber: number;
  openingSong: string;
  openingPrayer: any;
  president: any;
  introTime: number;
  timeType: string;
  intermediateSong: string;
  finalSong: string;
  finalPrayer: any;
  assignments: Assignment[];
}
export interface Assignment {
  id?: number;
  time?: any;
  timeType: string;
  responsible?: any;
  assistant?: any;
  assignmentNumber?: number;
  title: string;
  pointNumber?: any;
  tips?: string;
  sectionMeeting: string;
  showTips: boolean;
  number: number;
  position?: any;
}
