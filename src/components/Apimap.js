import React from "react";
import { IonButton } from "@ionic/react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { Geolocation } from "@ionic-native/geolocation";

import "./Apimap.css";
import "@reach/combobox/styles.css";
import Geocode from "react-geocode";

const libraries = ["places"];
const mapContainerStyle = {
  height: "200px",
  width: "250px",
};
Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 20000 })
  .then((resp) => {
    var lat = resp.coords.latitude;
    var lng = resp.coords.longitude;
    localStorage.setItem("lat", JSON.stringify(lat));
    localStorage.setItem("lng", JSON.stringify(lng));
    console.log("my location", lat, lng);
  })
  .catch((error) => {
    console.log("Error getting location", error);
  });

var lat = JSON.parse(localStorage.getItem("lat") || "0");

var lng = JSON.parse(localStorage.getItem("lng") || "0");

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: lat,
  lng: lng,
};

Geocode.setApiKey("AIzaSyAVqiKv944LBsEgMsxNaG8hBNcwUstEBr0");
Geocode.setLanguage("en");

// Get address from latitude & longitude.
Geocode.fromLatLng(lat, lng).then(
  (response) => {
    const address = response.results[0].formatted_address;
    console.log(address);
    localStorage.setItem("location", response.results[0].formatted_address);
  },
  (error) => {}
);

export default function Apimap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAVqiKv944LBsEgMsxNaG8hBNcwUstEBr0",
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <Locate panTo={panTo} />
      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <IonButton
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      Lokasi Saya
    </IonButton>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    localStorage.setItem("location", address);
    console.log(localStorage.getItem("location"));

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
      localStorage.setItem("lat", JSON.stringify(lat));
      localStorage.setItem("lng", JSON.stringify(lng));
      console.log("new location", lat, lng);
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Masukkan kawasan anda"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
