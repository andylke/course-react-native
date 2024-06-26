import { StyleSheet, View } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import * as Database from "../util/database";

function AllPlaces(
  {
    // route
  }
) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    // if (isFocused && route.params) {
    //   console.log(route.params);
    //   setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    // }
    async function getAllPlaces() {
      const allPlaces = await Database.getAllPlaces();
      console.log("fetched all places = " + JSON.stringify(allPlaces));
      setLoadedPlaces(allPlaces);
    }
    getAllPlaces();
  }, [isFocused]);
  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;

const styles = StyleSheet.create({
  container: {},
});
