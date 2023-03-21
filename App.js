import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import * as Notifications from "expo-notifications";

export default function App() {
  const webViewRef = useRef(null);

  const handleWebViewLoad = () => {
    // Execute JavaScript code in the WebView context to get the window object
    webViewRef.current.injectJavaScript(`
    const originalNotification = window.Notification;
    window.Notification = function(title, options) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        title: title,
        body: options.body,
        data: options.data,
      }));
      return new originalNotification(title, options);
    };
  `);
  };

  const handleWebViewMessage = (event) => {
    // Handle incoming messages from the WebView
    // const message = JSON.parse(event.nativeEvent.data);
    console.log(event.nativeEvent.data);
    // if (message.type === "WINDOW_OBJECT") {
    //   const windowObject = message.value;
    //   // Use the window object in your React Native code
    //   console.log("Window object:", windowObject);
    // }
  };

  return (
    <>
      <WebView
        ref={webViewRef}
        source={{
          uri: "https://www.bennish.net/web-notifications.html",
        }}
        style={{ marginTop: 40 }}
        onLoad={handleWebViewLoad}
        onMessage={handleWebViewMessage}
      />
      <StatusBar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
  },
  input: {
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
  },
});
