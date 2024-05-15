export interface Review {
  name: string;
  rating: number;
  comment: string;
}

export default interface ICourse {
  title: string;
  faculty: string;
  code: string;
  rating: number;
  reviews: Review[];
}
