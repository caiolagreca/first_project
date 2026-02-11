import { PlacesClient } from "@googlemaps/places";
import { UserBase } from "../../helpers";
import {
  PlaceDetailsModel,
  PlacesDetailsFormModel,
  SessionConfigModel,
  SessionUserModel,
} from "../../models";

export class PlacesDetailsApp extends UserBase {
  private placesClient: PlacesClient;

  constructor(user: SessionUserModel, config: SessionConfigModel) {
    super(user, config, { allowAnnonymous: true });
    this.placesClient = new PlacesClient();
  }

  searchText = async (
    data: PlacesDetailsFormModel,
  ): Promise<PlaceDetailsModel> => {
    try {
      const response = await this.placesClient.searchText(data);

      return {
        displayName: response.places.displayName || [],
      };
    } catch (error) {}
  };
}
