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

export interface CatalogI {
  id: string;
  bookId: string;
  numberOfCopies: number;
  availableCopies: number;
}

export interface MemberI {
  id: string;
  residentID: string;
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  email: string;
}

export interface TransactionI {
  id: string;
  bookId: string;
  memberId: string;
  borrowedDate: string;
  returnedDate: string;
}
