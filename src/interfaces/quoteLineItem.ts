import Location from "@/interfaces/location";
export default interface QuoteLineItem {
  campaignName: string;
  faceId?: string;
  id: string;
  isExtended: boolean;
  periodDates?: string;
  periodDetailId: string;
  periodNumber: string;
  phaseId?: string;
  regionName: string;
  locations?: Location[]
}
