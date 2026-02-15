import axios from "axios";
import { UserBase } from "../../helpers";
import {
  PlaceDetailsModel,
  PlacesDetailsFormModel,
  SessionConfigModel,
  SessionUserModel,
} from "../../models";

export class PlacesDetailsApp extends UserBase {
  constructor(user: SessionUserModel, config: SessionConfigModel) {
    super(user, config);
  }

  searchText = async (
    data: PlacesDetailsFormModel,
  ): Promise<PlaceDetailsModel> => {
    const apiKey = process.env.GOOGLE_API_KEY;
    const url = "https://places.googleapis.com/v1/places:searchText";
    try {
      const response = await axios.post(
        url,
        { textQuery: data.textQuery },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask":
              "places.id,places.displayName.text,places.formattedAddress",
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new Error(`GOOGLE_API_SEARCH_ERROR: ${error}`);
    }
  };
}
