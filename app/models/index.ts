export type Customer = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Work = {
  id: number;
  name: string;
  customerId: number;
  customer: Customer;
  createdAt: string;
  updatedAt: string;
};

export type Concrete = {
  id: number;
  moldingDate: string;
  invoice: string;
  qtd_cp: number;
  fck: number;
  slump: number;
  piece: string;
  workId: number;
  work: Pick<Work, "name">;
};

export type Rupture = {
  id: number;
  tf14h1: number;
  tf14h2: number;
  tf7d1: number;
  tf7d2: number;
  tf28d1: number;
  tf28d2: number;
  tf63d: number;
  mpa14h1: number;
  mpa14h2: number;
  mpa7d1: number;
  mpa7d2: number;
  mpa28d1: number;
  mpa28d2: number;
  mpa63d: number;
  concreteId: number;
};
