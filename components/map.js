import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

export default function Map(props) {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
      <GoogleMap
        mapContainerStyle={props.size}
        center={props.center}
        zoom={props.zoom}
      ></GoogleMap>
    </LoadScript>
  );
};