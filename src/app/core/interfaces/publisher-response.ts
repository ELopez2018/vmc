import { Publisher } from "./reuniones.interface";

export interface PublisherResposne {
  user: Publisher;
  count: number;
}

export interface PublisherMeetingResposne {
  id: number;
  fullName: string;
  image?: any;
  firstName: string;
  secondName?: any;
  lastName?: any;
  surname: string;
  birthdate?: any;
  gender: string;
  documentNumber: number;
  documentType: string;
  cellPhone?: any;
  phone?: any;
  email?: any;
  openingPrayerCount: number;
  presidentCount: number;
  finalPrayerCount: number;
  numberWeek: number;
}
