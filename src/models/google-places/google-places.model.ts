export interface PlaceDetailsModel {
  places: Array<{
    id: string;
    formattedAddress: string;
    displayName: { text: string };
  }>;
}
