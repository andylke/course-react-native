import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.container}>
        <FontAwesome name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 6,
  },
  pressed: {
    opacity: 0.7,
  },
});
