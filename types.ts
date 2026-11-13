import { ImageSourcePropType } from 'react-native';

export type ItemType = 'Package' | 'Activity';

export interface Adventure {
  id: number;
  name: string;
  price: number;
  type: ItemType;
  image: ImageSourcePropType;
  imageAlt: string;
  duration: string;
  summary: string;
  includes: string[];
  venue: string;
}

export type Screen =
  | { name: 'splash' }
  | { name: 'login' }
  | { name: 'home' }
  | { name: 'about' }
  | { name: 'overview'; query?: string }
  | { name: 'detail'; id: number }
  | { name: 'fees' }
  | { name: 'contact'; packageId?: number }
  | { name: 'payment' }
  | { name: 'account' }
  | { name: 'quote' }
  | { name: 'map'; venueId?: number }
  | { name: 'reviews' };

export type Navigate = (screen: Screen) => void;

export interface FeeResult {
  subtotal: number;
  discountPercent: number;
  discount: number;
  vat: number;
  total: number;
}

export interface User {
  name: string;
  email: string;
}

export interface Review {
  id: number;
  author: string;
  adventureId: number;
  rating: number;
  comment: string;
}

export type FormErrors<K extends string> = Partial<Record<K, string>>;
