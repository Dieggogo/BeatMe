import {
  HoltwoodOneSC_400Regular,
  useFonts,
} from "@expo-google-fonts/holtwood-one-sc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { images } from "../constants/images";

SplashScreen.preventAutoHideAsync();
const ONBOARDING_SEEN_KEY = "@beatme_onboarding_seen";

export default function Login() {
  const [fontsLoaded] = useFonts({
    HoltwoodOneSC_400Regular,
  });
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const seen = await AsyncStorage.getItem(ONBOARDING_SEEN_KEY);
        if (seen !== "true") {
          router.replace("/pantallabienvenida");
          return;
        }
      } catch (_error) {
        // If storage fails, continue to login so the app remains usable.
      } finally {
        setIsCheckingOnboarding(false);
      }
    };

    checkOnboarding();
  }, []);

  if (!fontsLoaded || isCheckingOnboarding) return null;

  return (
    <ImageBackground source={images.bg} resizeMode="cover" style={styles.bg}>
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.container}
        >
          <View style={styles.header}>
            <Image
              source={images.logo}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.tagline}>COMPITE CONTIGO MISMO</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.title}>Inicia Sesión</Text>

            <Text style={styles.sub}>
              ¿Es tu primera vez?{" "}
              <Text
                style={styles.link}
                onPress={() => router.push("../auth/register")}
              >
                Regístrate
              </Text>
            </Text>

            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="email@domain.com"
              placeholderTextColor="#9a9a9a"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={[styles.label, { marginTop: 14 }]}>Contraseña</Text>
            <TextInput
              placeholder="contraseña"
              placeholderTextColor="#9a9a9a"
              style={styles.input}
              secureTextEntry
            />

            <Pressable
              style={styles.button}
              onPress={() => router.replace("/tabs/Perfil")}
            >
              <Text style={styles.buttonText}>Continuar</Text>
            </Pressable>

            <Text style={styles.forgot}>¿Olvidaste la contraseña?</Text>

            <Text style={styles.legal}>
              Al hacer clic en continuar, aceptas nuestros{" "}
              <Text style={styles.legalLink}>Condiciones de servicio</Text> y{" "}
              <Text style={styles.legalLink}>política de privacidad</Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const ORANGE = "#ff7a00";

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: "#0b0b0b" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  safe: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 22, paddingTop: 10 },
  header: { alignItems: "center", marginTop: 100 },
  logo: { width: 280, height: 70 },
  tagline: {
    marginTop: 6,
    color: "#e8e8e8",
    fontSize: 12,
    letterSpacing: 1.2,
    opacity: 0.95,
    fontFamily: "HoltwoodOneSC_400Regular",
  },

  form: { marginTop: 140 },
  title: { color: "#fff", fontSize: 28, fontWeight: "800", marginBottom: 6 },
  sub: { color: "#cfcfcf", marginBottom: 18, fontSize: 13 },
  link: { color: "#fff", fontWeight: "bold" },

  label: { color: "#fff", fontSize: 13, fontWeight: "700", marginBottom: 8 },
  input: {
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#1a1a1a",
  },

  button: {
    height: 48,
    backgroundColor: ORANGE,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
  buttonText: { color: "#fff", fontWeight: "800", fontSize: 15 },

  forgot: { marginTop: 12, color: "#fff", fontSize: 12, opacity: 0.9 },
  legal: {
    marginTop: 18,
    color: "#bdbdbd",
    fontSize: 12,
    lineHeight: 16,
    opacity: 0.8,
    textAlign: "center",
  },
  legalLink: { color: "#fff", fontWeight: "bold" },
});
