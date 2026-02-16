import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
} from "react-native";

const MY_ROUTINES = [
  { id: "1", title: "PIERNA", exercises: 9, icon: "run-fast", level: "FUERZA" },
  { id: "2", title: "MIERCOLES", exercises: 6, icon: "dumbbell", level: "CORE" },
  { id: "3", title: "FULLBODY", exercises: 14, icon: "arm-flex", level: "MIXTO" },
];

const RECOMMENDATIONS = [
  { id: "1", title: "BELCAST - ESPALDA Y BICEPS", exercises: 7, time: "38 MIN" },
  { id: "2", title: "MOISES EBRAHIN - PIERNA COMPLETA", exercises: 11, time: "49 MIN" },
  { id: "3", title: "JEFF NIPPARD - FULLBODY", exercises: 14, time: "54 MIN" },
];

const SectionTitle = ({ children }) => (
  <Text style={styles.sectionTitle}>{children}</Text>
);

const RoutineCard = ({ title, exercises, icon, level }) => (
  <Pressable style={styles.card} android_ripple={{ color: "rgba(255,255,255,0.08)" }}>
    <View style={styles.cardLeft}>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons name={icon} size={22} color="#ffb14f" />
      </View>
      <View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{exercises} EJERCICIOS</Text>
      </View>
    </View>

    <View style={styles.cardRight}>
      <Text style={styles.levelPill}>{level}</Text>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#a3a3a3" />
    </View>
  </Pressable>
);

const RecommendationCard = ({ title, exercises, time }) => (
  <Pressable style={styles.card} android_ripple={{ color: "rgba(255,255,255,0.08)" }}>
    <View style={styles.cardLeft}>
      <Image source={require("../../assets/images/gym.png")} resizeMode="cover" style={styles.recoImage} />
      <View>
        <Text style={styles.recoTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{exercises} EJERCICIOS · {time}</Text>
      </View>
    </View>

    <MaterialCommunityIcons name="chevron-right" size={24} color="#a3a3a3" />
  </Pressable>
);

const Entrenamiento = () => {
  return (
    <ImageBackground source={require("../../assets/images/bg.png")} resizeMode="cover" style={styles.safe}>
      <View style={styles.darkOverlay} />
      <View style={styles.tintOverlay} />

      <SafeAreaView style={styles.safe}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} hitSlop={10} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={22} color="#fff" />
            </Pressable>
            <Text style={styles.headerTitle}>ENTRENAMIENTO</Text>
            <View style={styles.headerSpacer} />
          </View>

          <Pressable
            style={styles.createButton}
            android_ripple={{ color: "rgba(255,255,255,0.12)" }}
            onPress={() => router.push("/crearrutina")}
          >
            <MaterialCommunityIcons name="plus" size={18} color="#fff" />
            <Text style={styles.createButtonText}>CREAR RUTINA</Text>
          </Pressable>

          <SectionTitle>MIS RUTINAS</SectionTitle>
          {MY_ROUTINES.map((item) => (
            <RoutineCard key={item.id} {...item} />
          ))}

          <SectionTitle>RECOMENDACIONES</SectionTitle>
          {RECOMMENDATIONS.map((item) => (
            <RecommendationCard key={item.id} {...item} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0c0c0c",
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  tintOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(204,126,34,0.38)",
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 8 : 10,
    paddingBottom: 130,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  headerSpacer: {
    width: 30,
  },
  createButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#57ab6b",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#1b7a3f",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 0.4,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "900",
    marginTop: 8,
    marginBottom: 10,
    letterSpacing: 0.4,
  },
  card: {
    minHeight: 78,
    borderRadius: 14,
    backgroundColor: "rgba(20,20,20,0.64)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 9,
    overflow: "hidden",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    paddingRight: 10,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "rgba(255,177,79,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardRight: {
    alignItems: "flex-end",
    gap: 6,
  },
  levelPill: {
    color: "#ffcc8a",
    backgroundColor: "rgba(255,177,79,0.12)",
    borderColor: "rgba(255,177,79,0.22)",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 3,
    fontSize: 10,
    fontWeight: "800",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },
  recoTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
  },
  cardSubtitle: {
    color: "#cecece",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 2,
  },
  recoImage: {
    width: 44,
    height: 44,
    borderRadius: 8,
  },
});

export default Entrenamiento;
