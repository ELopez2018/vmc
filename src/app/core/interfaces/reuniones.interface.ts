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
export interface Week {
  id: number;
  week: string;
  weekNumber: number;
  openingSong: string;
  openingPrayer: Publisher;
  president: Publisher;
  introTime: number;
  timeType: string;
  intermediateSong: string;
  finalSong: string;
  finalPrayer: Publisher;
  assignments: Assignment[];
  adviser?: Publisher;
}
export interface Assignment {
  id?: number;
  time?: any;
  timeType: string;
  responsible?: Publisher;
  assistant?: Publisher;
  assignmentNumber?: number;
  title: string;
  pointNumber?: any;
  tips?: string;
  sectionMeeting: string;
  showTips: boolean;
  number: number;
  position?: any;
  meeting?: any;
}
export interface Publisher {
  id: number;
  fullName: string;
  image?: any;
  firstName: string;
  secondName: string;
  lastName: string;
  surname: string;
  birthdate?: any;
  gender?: any;
  documentNumber?: any;
  documentType?: any;
  cellPhone?: any;
  phone?: any;
  email?: any;
  designations: any[];
}
