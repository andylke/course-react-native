import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useState } from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/Colors";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [numberOfGuesses, setNumberOfGuesses] = useState(0);
  const [gameIsOver, setGameIsOver] = useState(false);

  function pickedNumberHandler(enteredNumber) {
    setUserNumber(enteredNumber);
  }

  function gameIsOverHandler(numberOfGuesses) {
    setGameIsOver(true);
    setNumberOfGuesses(numberOfGuesses);
  }

  function startNewGameHandler() {
    setGameIsOver(false);
    setUserNumber(null);
    setNumberOfGuesses(0);
  }

  const [fontsLoaded, fontError] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />;
  if (userNumber) {
    if (gameIsOver) {
      screen = (
        <GameOverScreen
          userNumber={userNumber}
          numberOfGuesses={numberOfGuesses}
          onStartNewGame={startNewGameHandler}
        />
      );
    } else {
      screen = (
        <GameScreen userNumber={userNumber} onGameOver={gameIsOverHandler} />
      );
    }
  }

  return (
    <LinearGradient
      style={styles.rootScreen}
      colors={[Colors.primary800, Colors.accent500]}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgrounImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgrounImage: {
    opacity: 0.15,
  },
});
