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
  { id: "biceps", name: "Biceps", color: ACTIVE_ORANGE },
  { id: "triceps", name: "Triceps", color: ACTIVE_ORANGE },
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

              <Svg viewBox="0 0 49 127" style={styles.leftBicepsSvg}>
                <Path
                  d="M28 6.79639L35 0.796387L38 6.79639L41 12.7964L45.5 20.7964L48 29.7964L48.5 36.2964V47.7964L48 60.2964L46.5 67.7964L45.5 75.2964L44 81.7964L42.5 87.7964L40.5 96.2964L38 104.796L33.5 113.296L26.5 120.296L22.5 122.796L18 125.296L13.5 126.296L10.5 125.296L6.5 122.796L4.5 117.796L2 111.296L0.5 100.296V81.2964L1.5 70.2964L5.5 52.2964L8 43.7964L9.5 38.7964L14 27.7964L18 19.7964L22 14.2964L28 6.79639Z"
                  onPress={() => toggleGroup("biceps")}
                  fill={
                    isActive("biceps")
                      ? "rgba(253,118,7,0.60)"
                      : "rgba(253,118,7,0.02)"
                  }
                />
              </Svg>

              <Svg viewBox="0 0 51 126" style={styles.rightBicepsSvg}>
                <Path
                  d="M10.0063 10.2638L15.5063 0.763809L21.5063 5.76381L27.0063 12.2638L31.5063 18.2638L35.5063 26.2638L39.0063 34.7638L41.5063 43.7638L44.0063 51.7638L46.0063 59.7638L47.5063 70.2638L49.0063 76.7638V82.7638L50.0063 91.2638L49.5063 105.764L47.5063 115.764L44.5063 124.264L37.5063 125.264L32.0063 123.264L26.5063 120.764L20.5063 114.264L14.0063 106.264L10.0063 96.2638L7.50635 82.7638L5.50635 69.2638L1.50635 47.7638L0.506348 33.7638L5.50635 20.2638L10.0063 10.2638Z"
                  onPress={() => toggleGroup("biceps")}
                  fill={
                    isActive("biceps")
                      ? "rgba(253,118,7,0.60)"
                      : "rgba(253,118,7,0.02)"
                  }
                />
              </Svg>

              <Svg viewBox="0 0 23 79" style={styles.leftTricepsFrontSvg}>
                <Path
                  d="M12.5 1.16278L21.5 17.1628L17 30.1628L14.5 43.1628L12.5 57.1628V78.1628L7 76.1628L3.5 72.1628L0.5 66.6628V51.6628V39.6628L3.5 25.6628L7 15.1628L12.5 1.16278Z"
                  onPress={() => toggleGroup("triceps")}
                  fill={
                    isActive("triceps")
                      ? "rgba(253,118,7,0.60)"
                      : "rgba(253,118,7,0.02)"
                  }
                />
              </Svg>

              <Svg viewBox="0 0 25 80" style={styles.rightTricepsFrontSvg}>
                <Path
                  d="M0.534668 16.325L9.03467 0.824951L11.5347 3.32495L14.5347 13.325L18.0347 22.325L21.0347 32.825L23.0347 42.825L24.0347 63.325L22.0347 64.825V73.325L20.0347 73.825L16.5347 77.825L10.5347 78.825V69.325L9.53467 58.325L8.03467 47.825L4.53467 31.325L0.534668 16.325Z"
                  onPress={() => toggleGroup("triceps")}
                  fill={
                    isActive("triceps")
                      ? "rgba(253,118,7,0.60)"
                      : "rgba(253,118,7,0.02)"
                  }
                />
              </Svg>

              <Svg viewBox="0 0 63 158" style={styles.leftTricepsBackSvg}>
                <Path
                  d="M37.5002 11.6378L52.5002 0.637787L56.0002 3.63779L57.5002 7.63779L60.0002 15.1378V24.1378L61.0002 39.1378L61.7502 45.8878L62.5002 52.6378V66.1378L60.0002 80.6378L57.5002 94.6378L51.5002 109.138L47.0002 116.138L41.0002 122.638L34.5002 128.638L32.0002 135.138L27.5002 146.638L24.5002 152.138L18.5002 157.138H15.0002L11.5002 155.138L8.50024 150.638L6.00024 145.138L5.00024 138.138V117.138L4.00024 111.638L1.00024 101.638L0.500244 90.6378L1.00024 74.6378L3.50024 62.6378L7.50024 51.1378L13.5002 40.1378L20.0002 30.6378L28.5002 20.6378L37.5002 11.6378Z"
                  onPress={() => toggleGroup("triceps")}
                  fill={
                    isActive("triceps")
                      ? "rgba(253,118,7,0.60)"
                      : "rgba(253,118,7,0.02)"
                  }
                />
              </Svg>

              <Svg viewBox="0 0 63 159" style={styles.rightTricepsBackSvg}>
                <Path
                  d="M27.5 13.1531L10 0.653061L8 2.65306L5 8.65306L2.5 22.6531L0.5 47.6531V72.6531L4 86.1531L6 96.1531L11 107.653L17 119.153L26.5 128.153L29.5 133.153L34 143.653L37.5 150.653L44 157.153L48 157.653L54.5 152.653L57.5 143.653V121.153L58.5 117.653L62.5 102.653V75.1531L57 54.1531L49.5 39.1531L38.5 24.6531L27.5 13.1531Z"
                  onPress={() => toggleGroup("triceps")}
                  fill={
                    isActive("triceps")
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
    paddingTop: 0,
    paddingBottom: 24,
  },
  header: {
    height: 85,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 30,
    marginBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: { width: 40 },
  title: {
    color: "#F3F3F3",
    fontWeight: "bold",
    letterSpacing: 1.2,
    marginTop: 20,
    fontSize: 20,
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
    left: "10.11%",
    top: "27.21%",
    width: "9.52%",
    height: "6.09%",
  },
  rightShoulderSvg: {
    position: "absolute",
    left: "29.30%",
    top: "27.25%",
    width: "9.28%",
    height: "6.02%",
  },
  leftBicepsSvg: {
    position: "absolute",
    left: "10.25%",
    top: "31.05%",
    width: "4.69%",
    height: "8.17%",
  },
  rightBicepsSvg: {
    position: "absolute",
    left: "33.74%",
    top: "31.09%",
    width: "4.83%",
    height: "8.11%",
  },
  leftTricepsFrontSvg: {
    position: "absolute",
    left: "9.08%",
    top: "32.42%",
    width: "2.05%",
    height: "5.01%",
  },
  rightTricepsFrontSvg: {
    position: "absolute",
    left: "37.60%",
    top: "32.32%",
    width: "2.29%",
    height: "5.08%",
  },
  leftTricepsBackSvg: {
    position: "absolute",
    left: "57.96%",
    top: "30.89%",
    width: "6.05%",
    height: "10.19%",
  },
  rightTricepsBackSvg: {
    position: "absolute",
    left: "84.18%",
    top: "30.86%",
    width: "6.05%",
    height: "10.22%",
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
