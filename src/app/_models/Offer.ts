import { OfferStatus } from "./OfferStatus";

export type OfferId = number;

export type Offer = {
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
