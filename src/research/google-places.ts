export type GoogleTextSearchPlace = {
  id: string;
  displayName?: { text?: string; languageCode?: string };
  formattedAddress?: string;
  primaryTypeDisplayName?: { text?: string; languageCode?: string };
  primaryType?: string;
  types?: string[];
};

export type GooglePlaceDetails = GoogleTextSearchPlace & {
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  regularOpeningHours?: {
    weekdayDescriptions?: string[];
  };
  rating?: number;
  userRatingCount?: number;
  reviews?: Array<{
    name?: string;
    rating?: number;
    text?: { text?: string; languageCode?: string };
    originalText?: { text?: string; languageCode?: string };
    authorAttribution?: {
      displayName?: string;
      uri?: string;
      photoUri?: string;
    };
    relativePublishTimeDescription?: string;
    publishTime?: string;
  }>;
  photos?: Array<{
    name?: string;
    widthPx?: number;
    heightPx?: number;
    authorAttributions?: Array<{
      displayName?: string;
      uri?: string;
      photoUri?: string;
    }>;
  }>;
  websiteUri?: string;
  googleMapsUri?: string;
  businessStatus?: string;
};

type TextSearchResponse = {
  places?: GoogleTextSearchPlace[];
};

const textSearchFieldMask = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.primaryType",
  "places.primaryTypeDisplayName",
  "places.types",
].join(",");

const detailsFieldMask = [
  "id",
  "displayName",
  "formattedAddress",
  "nationalPhoneNumber",
  "internationalPhoneNumber",
  "regularOpeningHours",
  "rating",
  "userRatingCount",
  "reviews",
  "photos",
  "websiteUri",
  "googleMapsUri",
  "businessStatus",
  "primaryType",
  "primaryTypeDisplayName",
  "types",
].join(",");

async function placesFetch<T>(url: string, init: RequestInit, apiKey: string): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Google Places request failed ${response.status}: ${body}`);
  }

  return (await response.json()) as T;
}

export async function textSearch(query: string, apiKey: string): Promise<GoogleTextSearchPlace[]> {
  const response = await placesFetch<TextSearchResponse>(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "X-Goog-FieldMask": textSearchFieldMask,
      },
      body: JSON.stringify({
        textQuery: query,
        languageCode: "es",
        regionCode: "AR",
      }),
    },
    apiKey,
  );

  return response.places ?? [];
}

export async function placeDetails(placeId: string, apiKey: string): Promise<GooglePlaceDetails> {
  return placesFetch<GooglePlaceDetails>(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
    {
      method: "GET",
      headers: {
        "X-Goog-FieldMask": detailsFieldMask,
      },
    },
    apiKey,
  );
}
