import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { images } from "../../constants/images";

const MUSCLE_ZONES = [
  { id: "pecho", name: "Pecho", color: "#ff6b6b", x: "27%", y: "28%" },
  { id: "biceps", name: "Biceps", color: "#ff9f43", x: "17%", y: "36%" },
  { id: "abdomen", name: "Abdomen", color: "#feca57", x: "27%", y: "42%" },
  { id: "pierna", name: "Pierna", color: "#1dd1a1", x: "23%", y: "61%" },
  { id: "hombro", name: "Hombro", color: "#54a0ff", x: "39%", y: "28%" },
  { id: "espalda", name: "Espalda", color: "#5f27cd", x: "72%", y: "38%" },
  { id: "gluteo", name: "Gluteo", color: "#ee5253", x: "72%", y: "56%" },
];

const CreateRutina = () => {
  const [selectedZones, setSelectedZones] = useState([]);

  const toggleZone = (zoneId) => {
    setSelectedZones((prev) =>
      prev.includes(zoneId)
        ? prev.filter((id) => id !== zoneId)
        : [...prev, zoneId],
    );
  };

  const selectedMuscles = useMemo(
    () => MUSCLE_ZONES.filter((zone) => selectedZones.includes(zone.id)),
    [selectedZones],
  );

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
          <Image source={images.cuerpo} style={styles.bodyImage} />

          <View style={styles.overlay}>
            {MUSCLE_ZONES.map((zone) => {
              const isSelected = selectedZones.includes(zone.id);
              return (
                <Pressable
                  key={zone.id}
                  onPress={() => toggleZone(zone.id)}
                  style={[
                    styles.zoneDot,
                    {
                      left: zone.x,
                      top: zone.y,
                      borderColor: zone.color,
                      backgroundColor: isSelected
                        ? zone.color
                        : "rgba(0,0,0,0.6)",
                    },
                  ]}
                />
              );
            })}
          </View>
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
  },
  bodyImage: {
    width: "100%",
    height: 540,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  zoneDot: {
    position: "absolute",
    width: 22,
    height: 22,
    borderRadius: 20,
    borderWidth: 2,
    marginLeft: -11,
    marginTop: -11,
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
