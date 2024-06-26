import { StyleSheet, View } from "react-native";
import PlaceForm from "../components/Places/PlaceForm";
import * as Database from "../util/database";

function AddPlace({ navigation }) {
  function createPlaceHandler(place) {
    Database.insertPlace(place);
    navigation.navigate("AllPlaces");
    // navigation.navigate("AllPlaces", {
    //   place: place,
    // });
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;

const styles = StyleSheet.create({
  container: {},
});
