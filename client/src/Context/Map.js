import { useEffect, useRef, useState } from "react";

const Map = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [placePicker, setPlacePicker] = useState(null);

  useEffect(() => {
    const initMap = async () => {
      if (!window.google) return;

      const googleMaps = window.google.maps;
      const mapInstance = new googleMaps.Map(mapRef.current, {
        center: { lat: 40.749933, lng: -73.98633 },
        zoom: 13,
        mapTypeControl: false,
      });

      const markerInstance = new googleMaps.Marker({
        map: mapInstance,
      });

      setMap(mapInstance);
      markerRef.current = markerInstance;

      const input = document.getElementById("place-input");
      const autocomplete = new googleMaps.places.Autocomplete(input);
      autocomplete.bindTo("bounds", mapInstance);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          alert("No details available for input: '" + place.name + "'");
          return;
        }

        if (place.geometry.viewport) {
          mapInstance.fitBounds(place.geometry.viewport);
        } else {
          mapInstance.setCenter(place.geometry.location);
          mapInstance.setZoom(17);
        }

        markerInstance.setPosition(place.geometry.location);
      });
    };

    if (!map) {
      initMap();
    }
  }, [map]);

  return (
    <div>
      <div className="search-container">
        <input
          id="place-input"
          type="text"
          placeholder="Search a place"
          className="search-box"
        />
      </div>
      <div ref={mapRef} style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
};

export default Map;
