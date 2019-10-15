export type OfferId = number;

export enum OfferStatus {
  Published = 'published',
  InProgress = 'in_progress',
  WaitingForApproval = 'waiting_for_approval',
  Canceled = 'canceled',
}

export interface Offer {
  id: OfferId;
  title: string;
  description: string;
  img_url: string;
  price: number;
  discount: number;
  rating: number;
  status: OfferStatus;
  created_at: string;
}
