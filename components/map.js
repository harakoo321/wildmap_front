import React from "react";
import { useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import GoogleMapReact from 'google-map-react';

export default function Map(props) {
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [marker, setMarker] = useState(null);

  const handleApiLoaded = (object) => {
    setMap(object.map);
    setMaps(object.maps);
  };

  const setLatLng = ({ x, y, lat, lng, event }) => {
    if (marker) {
      marker.setMap(null);
    }

    const latLng = {
      lat,
      lng,
    };

    props.setPosition([lat, lng]);

    setMarker(new maps.Marker({
      map,
      position: latLng,
    }));
    map.panTo(latLng);
  };

  return (
    <div style={props.size}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
        onGoogleApiLoaded={handleApiLoaded}
        onClick={setLatLng}
      />
    </div>
  );
};