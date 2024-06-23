import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useEffect, useState } from "react";
import { getAddress, getMapPreview } from "../../util/location";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

function LocationPicker({ onPickedLocation }) {
  const [pickedLocation, setPickedLocation] = useState();

  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng
        );
        onPickedLocation({ ...pickedLocation, address: address });
      }
    }

    handleLocation();
  }, [pickedLocation, onPickedLocation]);

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = route.params.pickedLocation;

      console.log("mapPickedLocation = " + mapPickedLocation);
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  async function verifyPermissions() {
    console.log(
      "[locationPicker] location = " +
        JSON.stringify(locationPermissionInformation)
    );
    if (locationPermissionInformation.status !== PermissionStatus.GRANTED) {
      const permissionResponse = await requestPermission();
      return permissionResponse;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant location permissions to use this app"
      );
      return false;
    }
    return true;
  }

  async function locateUserHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return null;
    }

    const location = await getCurrentPositionAsync();
    console.log("[locationPicker] location = " + JSON.stringify(location));

    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  async function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let preview = <Text>No location picked yet.</Text>;
  if (pickedLocation) {
    preview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.preview}>{preview}</View>
      <View style={styles.buttons}>
        <OutlinedButton icon="location" onPress={locateUserHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick On Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  container: {},
  preview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
