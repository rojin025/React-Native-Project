import { Alert, Pressable, StyleSheet, Text, TextInput } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LOCAL_STORAGE_KEY } from "./constants";
import { isEligibleUser } from "../Services/login.api";

import Styles from "./Styles";

interface LoginProps {
  setLoggedIn: (loggedIn: boolean) => void;
}

export default function Login({ setLoggedIn }: LoginProps) {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    try {
      if (email.trim() === "") {
        return Alert.alert("Please enter email");
      }

      const res = await isEligibleUser(email);

      if (res) {
        AsyncStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({ loggedIn: true })
        );
        setLoggedIn(true);
      } else {
        return Alert.alert("Wrong email");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={Styles.container}>
      <TextInput
        style={Styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
      />
      <Pressable style={Styles.button} onPress={handleLogin}>
        <Text style={Styles.buttonText}>Login</Text>
      </Pressable>
    </SafeAreaView>
  );
}
