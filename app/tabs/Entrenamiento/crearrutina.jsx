import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { images } from "../../../constants/images";

const ACTIVE_ORANGE = "#fd7607";

const MUSCLE_GROUPS = [
  { id: "pecho", name: "Pecho", color: ACTIVE_ORANGE },
  { id: "hombro", name: "Hombro", color: ACTIVE_ORANGE },
];

const CreateRutina = () => {
  const [selectedGroups, setSelectedGroups] = useState(["pecho"]);

  const toggleGroup = (groupId) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId],
    );
  };

  const selectedMuscles = useMemo(
    () => MUSCLE_GROUPS.filter((zone) => selectedGroups.includes(zone.id)),
    [selectedGroups],
  );

  const isActive = (id) => selectedGroups.includes(id);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={10}
            style={styles.backButton}
          >
            <MaterialCommunityIcons name="arrow-left" size={22} color="#fff" />
          </Pressable>
          <Text style={styles.title}>CREAR RUTINA</Text>
          <View style={styles.spacer} />
        </View>

        <Text style={styles.subtitle}>
          Selecciona los musculos que quieres trabajar
        </Text>

        <View style={styles.mapWrap}>
          <ImageBackground
            source={images.cuerpo}
            style={styles.bodyImage}
            resizeMode="contain"
          >
            <View style={styles.overlay}>
              <Svg viewBox="0 0 222 109" style={styles.chestSvg}>
                <Path
                  d="M10 66.5152L0.5 47.0152V45.0152L3.5 41.0152L9.5 33.5152L24.5 18.5152L34.5 11.0152L42 7.01518L47.5 4.51518L57.5 2.01518L69.5 1.51518L82.5 3.51518L91 6.01518L103.5 12.0152L109.5 21.5152L113.5 15.0152L117 11.5152L121.5 8.51518L128.5 6.01518L142.5 3.01518L158.5 0.515182L166 3.51518L176 7.01518L182.5 11.0152L191.5 17.5152L201 25.5152L208 34.0152L220.5 46.0152L217.5 51.5152L212.5 62.0152L207 75.5152L201.5 84.0152L192 95.0152L186.5 98.5152L176.5 103.515L167 106.015L157.5 107.015L154 105.515H147L141.5 104.515L131.5 102.015L117 99.0152L109 107.515L105.5 104.015L99.5 99.0152L94.5 100.015L82.5 103.515L69.5 105.515L60.5 107.015L52 106.515L42 103.015L32 97.0152L24 90.5152L18 82.0152L13 74.5152L10 66.5152Z"
                  onPress={() => toggleGroup("pecho")}
                  fill={
                    isActive("pecho")
                      ? "rgba(253,118,7,0.60)"
                      : "rgba(253,118,7,0.02)"
                  }
                />
              </Svg>

              <Svg viewBox="0 0 100 95" style={styles.leftShoulderSvg}>
                <Path
                  d="M36 59L26.5 69L19.5 78L14 89.5L11.5 94H9L2.5 80.5L0.5 72.5V51.5L2.5 46.5L4 39.5L6 33.5L9.5 27L12.5 22L17 16L21.5 12L28 7.5L34.5 4L41.5 2L46.5 1L52 0.5H56H60L65.5 1L76.5 5.5L89.5 9.5L98 12.5L85 16.5L75 21L65.5 27.5L54.5 37L47 44.5L41.5 51.5L37.5 57L36 59Z"
                  onPress={() => toggleGroup("hombro")}
                  fill={
                    isActive("hombro")
                      ? "rgba(253,118,7,0.60)"
                      : "rgba(253,118,7,0.02)"
                  }
                />
              </Svg>

              <Svg viewBox="0 0 97 94" style={styles.rightShoulderSvg}>
                <Path
                  d="M1.27612 12.5019L14.2761 7.00191L28.2761 2.00191L34.7761 1.00191L43.2761 0.501907L54.7761 2.00191L66.2761 6.00191L76.7761 13.0019L83.7761 20.5019L88.2761 28.0019L93.7761 40.5019L96.2761 50.5019V67.5019V76.0019L93.7761 79.5019L91.2761 86.0019L87.7761 92.0019L86.2761 93.0019L83.2761 87.0019L80.7761 82.0019L75.7761 74.0019L68.7761 65.5019L62.2761 58.5019L56.7761 53.0019L49.7761 45.0019L45.7761 41.0019L41.7761 36.5019L35.7761 31.5019L27.7761 25.5019L22.7761 22.0019L17.2761 18.5019L10.7761 16.0019L4.77612 14.0019L1.27612 12.5019Z"
                  onPress={() => toggleGroup("hombro")}
                  fill={
                    isActive("hombro")
                      ? "rgba(253,118,7,0.60)"
                      : "rgba(253,118,7,0.02)"
                  }
                />
              </Svg>
            </View>
          </ImageBackground>
        </View>

        <Text style={styles.sectionTitle}>Musculos seleccionados</Text>
        <View style={styles.chipsWrap}>
          {selectedMuscles.length === 0 && (
            <Text style={styles.emptyText}>
              Aun no has seleccionado musculos
            </Text>
          )}

          {selectedMuscles.map((muscle) => (
            <View
              key={muscle.id}
              style={[
                styles.chip,
                {
                  borderColor: muscle.color,
                  backgroundColor: `${muscle.color}22`,
                },
              ]}
            >
              <View
                style={[styles.chipDot, { backgroundColor: muscle.color }]}
              />
              <Text style={styles.chipText}>{muscle.name}</Text>
            </View>
          ))}
        </View>

        <Pressable style={styles.continueButton}>
          <Text style={styles.continueText}>CONTINUAR (PRUEBA)</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#080808",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 99,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: { width: 30 },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
  },
  subtitle: {
    color: "#c8c8c8",
    textAlign: "center",
    marginBottom: 14,
  },
  mapWrap: {
    backgroundColor: "#000",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
    width: "100%",
    aspectRatio: 2 / 3,
  },
  bodyImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  chestSvg: {
    position: "absolute",
    left: "13.67%",
    top: "28.06%",
    width: "21.48%",
    height: "6.97%",
  },
  leftShoulderSvg: {
    position: "absolute",
    left: "4.6%",
    top: "21.8%",
    width: "10.7%",
    height: "9.3%",
  },
  rightShoulderSvg: {
    position: "absolute",
    left: "33.6%",
    top: "21.9%",
    width: "10.6%",
    height: "9.2%",
  },
  sectionTitle: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    minHeight: 48,
  },
  emptyText: {
    color: "#9c9c9c",
    fontSize: 13,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
  },
  chipDot: {
    width: 8,
    height: 8,
    borderRadius: 99,
  },
  chipText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  continueButton: {
    height: 48,
    borderRadius: 10,
    backgroundColor: "#ff7a00",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  continueText: {
    color: "#1c1c1c",
    fontWeight: "900",
    fontSize: 14,
  },
});

export default CreateRutina;
