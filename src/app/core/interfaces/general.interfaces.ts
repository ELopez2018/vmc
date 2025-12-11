export interface ResponsePaginated {
  content: Content[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

interface Content {
  id: number;
  time: number;
  timeType: string;
  title: string;
  tips: null | string;
  sectionMeeting: string;
  showTips: boolean | null;
  number: number;
  meeting: Meeting;
}

interface Meeting {
  id: number;
  week: number;
  weekNumber: number;
  openingSong: string;
  introTime: number;
  timeType: string;
  intermediateSong: string;
  finalSong: string;
  url: string;
}