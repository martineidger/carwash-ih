export interface NavigationItem {
  label: string;
  href: string;
  hasSubmenu?: boolean;
  submenu?: NavigationItem[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}

export interface Feature {
  id: string;
  title: string;
  imageUrl?: string;
}

export interface PriceTab {
  id: string;
  label: string;
  discount?: string;
  images: string[];
}

export interface PriceItem {
  title: string;
  prices: (number | string)[];
  time: string;
}

export interface ExtraPriceItem {
  title: string;
  price: number;
  time: number;
}

export interface ContactInfo {
  phone: string;
  phoneFormatted: string;
  address: string;
  mapUrl: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface CompanyInfo {
  name: string;
  unp: string;
  address: string;
}
