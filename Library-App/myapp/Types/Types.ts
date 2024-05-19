export interface BookI {
  id: string;
  title: string;
  genre: string;
  category: string;
  authorIDs: string[];
  publisherId: string;
}

export interface AuthorI {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export interface PublisherI {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}
