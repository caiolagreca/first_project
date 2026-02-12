import { PlacesClient } from "@googlemaps/places";
import { UserBase } from "../../helpers";
import {
  PlaceDetailsModel,
  PlacesDetailsFormModel,
  SessionConfigModel,
  SessionUserModel,
} from "../../models";
import axios from "axios";

export class PlacesDetailsApp extends UserBase {
  constructor(user: SessionUserModel, config: SessionConfigModel) {
    super(user, config);
  }

  searchText = async (
    data: PlacesDetailsFormModel,
  ): Promise<PlaceDetailsModel> => {
    try {
      const apiKey = process.env.GOOGLE_API_KEY;
      const url = "https://places.googleapis.com/v1/places:searchText";
      const fields = [
        "places.id",
        "places.displayName",
        "places.formattedAddress",
        // add more fields as needed
      ].join(",");
      const response = await axios.post(
        url + `?fields=${fields}`,
        {
          textQuery: data.textQuery,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": fields,
          },
        },
      );

      return {
        places: (response.data.places || []).map((place: any) => ({
          id: place.id || "",
          formattedAddress: place.formattedAddress || "",
          displayName: { text: place.displayName?.text || "" },
        })),
      };
    } catch (err) {
      throw new Error(`GOOGLE_PLACES_SEARCH_ERRROR: ${err}`);
    }
  };
}
