import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldShowAlert: true,
      shouldSetBadge: true,
    };
  },
});

export default function App() {
  const [notification, setNotification] = useState();
  const [pushToken, setPushToken] = useState();

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    async function configurePushNotifications() {
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
          vibrationPattern: [0, 250, 0, 250],
          lightColor: "#FF231F7C",
        });
      }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      if (existingStatus !== "granted") {
        const { status } = Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Required",
            "Push notification require notification permission"
          );
          return;
        }
      }

      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        Alert.alert("Project Id not found");
        return;
      }

      const pushTokenResult = await Notifications.getExpoPushTokenAsync({
        projectId,
      });
      console.log("Push Token = " + JSON.stringify(pushTokenResult));
      setPushToken(pushTokenResult.data);
    }

    configurePushNotifications();
  }, []);

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification = " + JSON.stringify(notification));
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Response = " + JSON.stringify(response));
        setNotification(response.notification);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function scheduleNotificationHandler() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Local Notification",
        body: "Some message",
        data: { someOtherMessage: "Hello world" },
      },
      trigger: { seconds: 2 },
    });
  }

  async function sendPushNotificationHandler() {
    const result = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: pushToken,
        title: "Push Notification from App",
        body: "Some message",
      }),
    });
    console.log("Push Notification API Result = " + JSON.stringify(result));
  }

  return (
    <View style={styles.container}>
      <Button
        title="Schedule Notification"
        onPress={scheduleNotificationHandler}
      ></Button>

      <Button
        title="Send Push Notification"
        onPress={sendPushNotificationHandler}
      ></Button>

      <View>
        <Text style={styles.text}>
          Title: {notification && notification.request.content.title}
        </Text>
        <Text style={styles.text}>
          Body: {notification && notification.request.content.body}
        </Text>
        <Text style={styles.text}>
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    margin: 4,
    padding: 4,
  },
});
