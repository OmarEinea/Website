export interface ICardsSection<T extends ICardData> {
  section: string;
  items: T[];
}

export interface ICardData {
  title: string;
  subtitle: string;
}

export interface ICertificateCard extends ICardData {
  authority: string;
}

export interface IEventCard extends ICardData {
  location: string;
  images: string[];
  preview?: boolean;
}

export interface IProjectCard extends ICardData {
  images: string[];
  repo?: string;
  skills: string[];
  type?: string;
  demo?: string;
  preload?: boolean;
}