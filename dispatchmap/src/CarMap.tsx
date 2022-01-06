import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Markers from "./Markers";

const containerStyle = {
  width: "800px",
  height: "600px",
};

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_KEY || 'YOUR_GOOGLE_API_KEY_HERE';

const CarMap = () => {
  // At the top of this component you should subscribe to updates from the server.
  // See https://www.apollographql.com/docs/react/data/subscriptions/#executing-a-subscription

  const centerPosition = {
    lat: 40.700748,
    lng: -74.013168
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerPosition}
        zoom={12}
      >
        {/* For documentation on the MapView see https://react-google-maps-api-docs.netlify.app/ */}
        <Markers />
      </GoogleMap>
    </LoadScript>
  );
};

export default CarMap;
