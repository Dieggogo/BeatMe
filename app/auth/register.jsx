import {
  HoltwoodOneSC_400Regular,
  useFonts,
} from "@expo-google-fonts/holtwood-one-sc";
import { router, SplashScreen } from "expo-router";
import { useEffect } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { images } from "../constants/images";

SplashScreen.preventAutoHideAsync();

export default function Register() {
  const [fontsLoaded] = useFonts({ HoltwoodOneSC_400Regular });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ImageBackground source={images.bg} resizeMode="cover" style={styles.bg}>
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.container}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <Image
                source={images.logo}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.tagline}>COMPITE CONTIGO MISMO</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <Text style={styles.title}>Crear Cuenta</Text>
              <Text style={styles.sub}>
                Rellena los siguientes recuadros con tu información.
              </Text>

              <Text style={styles.label}>Nombre</Text>
              <TextInput
                placeholder="nombre"
                placeholderTextColor="#9a9a9a"
                style={styles.input}
              />

              <Text style={[styles.label, { marginTop: 14 }]}>Apellido</Text>
              <TextInput
                placeholder="apellido"
                placeholderTextColor="#9a9a9a"
                style={styles.input}
              />

              <Text style={[styles.label, { marginTop: 14 }]}>Email</Text>
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

              <Text style={[styles.label, { marginTop: 14 }]}>
                Confirmar Contraseña
              </Text>
              <TextInput
                placeholder="confirmar contraseña"
                placeholderTextColor="#9a9a9a"
                style={styles.input}
                secureTextEntry
              />

              <Pressable style={styles.button} onPress={() => {}}>
                <Text style={styles.buttonText}>Crear Cuenta</Text>
              </Pressable>

              <Pressable onPress={() => router.back()} style={styles.backWrap}>
                <Text style={styles.backText}>
                  ¿Ya tienes cuenta?{" "}
                  <Text style={styles.backLink}>Inicia Sesión</Text>
                </Text>
              </Pressable>

              <Text style={styles.legal}>
                Al hacer clic en Crear Cuenta, aceptas nuestros{" "}
                <Text style={styles.legalLink}>Condiciones de servicio</Text> y{" "}
                <Text style={styles.legalLink}>política de privacidad</Text>
              </Text>
            </View>
          </ScrollView>
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

  scrollContent: { paddingBottom: 26 },

  header: { alignItems: "center", marginTop: 50 },
  logo: { width: 280, height: 70 },
  tagline: {
    marginTop: 6,
    color: "#e8e8e8",
    fontSize: 12,
    letterSpacing: 1.2,
    opacity: 0.95,
    fontFamily: "HoltwoodOneSC_400Regular",
    textTransform: "uppercase",
  },

  form: { marginTop: 24 },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 6,
  },
  sub: {
    color: "#cfcfcf",
    marginBottom: 18,
    fontSize: 13,
    textAlign: "center",
  },

  label: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },
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

  backWrap: { marginTop: 12, alignItems: "center" },
  backText: {
    color: "#bdbdbd",
    fontSize: 12,
    opacity: 0.95,
  },
  backLink: {
    color: "#fff",
    fontWeight: "bold",
  },

  legal: {
    marginTop: 16,
    color: "#bdbdbd",
    fontSize: 12,
    lineHeight: 16,
    opacity: 0.8,
    textAlign: "center",
  },
  legalLink: {
    color: "#fff",
    fontWeight: "bold",
  },
});
