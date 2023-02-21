import React from "react";
import myConfiguredSanityClient from "./sanity.client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(myConfiguredSanityClient);

function urlFor(source) {
  return builder.image(source);
}
