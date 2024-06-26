import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import * as Database from "../util/database";

function PlaceDetails({ route, navigation }) {
  const selectedPlaceId = route.params.placeId;
  const [selectedPlace, setSelectedPlace] = useState();

  useEffect(() => {
    const place = Database.getPlace(selectedPlaceId);
    setSelectedPlace(place);
    navigation.setOptions({ title: place.title });
  }, [selectedPlaceId]);

  function viewOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: selectedPlace.location.lat,
      initialLng: selectedPlace.location.lng,
    });
  }

  if (!selectedPlace) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={viewOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
