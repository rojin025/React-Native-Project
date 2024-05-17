export interface IReview {
  name: string;
  rating: number;
  comment: string;
}

export default interface ICourse {
  id?: string;
  title: string;
  faculty: string;
  code: string;
  rating: number;
  reviews: IReview[];
}
