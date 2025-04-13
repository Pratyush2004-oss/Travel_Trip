export interface Place {
  _id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  description: string;
  image: string[];
}

export interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  startDate: Date;
  endDate: Date;
  people: number;
  place: Place;
}
