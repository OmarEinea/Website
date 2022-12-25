export interface IHomeData {
  resume: string;
  papers: IPaperData[];
  sections: ISectionData[];
}

export interface ISectionData {
  id: string;
  title: string;
  icon: string;
  items: any[];
}

export interface IPaperData {
  title: string;
  type: PaperType;
  icon: string;
  items: string[];
  mini: boolean;
}

export enum PaperType {
  table = 'table',
  list = 'list',
}

export interface IPaper {
  title: string;
  icon: string;
  element: React.ReactElement | React.ReactElement[];
  mini: boolean;
}