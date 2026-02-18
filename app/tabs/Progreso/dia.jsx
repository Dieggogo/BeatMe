import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const TABBAR_HEIGHT = 90;
const ORANGE = "#ff7a00";

export default function DiaDetalle() {
  const { date, trained } = useLocalSearchParams();
  const entreno = trained === "1";

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        {/* ✅ HEADER COPIADO TAL CUAL */}
        <View style={styles.header}>
          <Pressable
            style={styles.backBtn}
            onPress={() => router.push("/tabs/Progreso")}
          >
            <Ionicons name="arrow-back" size={22} color="#F3F3F3" />
          </Pressable>

          <Text style={styles.headerTitle}>DETALLE</Text>

          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: TABBAR_HEIGHT + 24 }}
        >
          <View style={styles.card}>
            <Text style={styles.big}>{(date || "").toString()}</Text>

            <View
              style={[
                styles.badge,
                entreno ? styles.badgeOk : styles.badgeRest,
              ]}
            >
              <Text style={[styles.badgeTxt, entreno && { color: "#141414" }]}>
                {entreno ? "DÍA ENTRENADO" : "DÍA DE DESCANSO"}
              </Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.section}>Resumen</Text>

            <View style={styles.kpiRow}>
              <View style={styles.kpi}>
                <Text style={styles.kpiLabel}>Duración</Text>
                <Text style={styles.kpiValue}>
                  {entreno ? "55 min" : "0 min"}
                </Text>
              </View>
              <View style={styles.kpi}>
                <Text style={styles.kpiLabel}>Calorías</Text>
                <Text style={styles.kpiValue}>{entreno ? "620" : "0"}</Text>
              </View>
            </View>

            <View style={styles.kpiRow}>
              <View style={styles.kpi}>
                <Text style={styles.kpiLabel}>Volumen</Text>
                <Text style={styles.kpiValue}>
                  {entreno ? "10,250 kg" : "0 kg"}
                </Text>
              </View>
              <View style={styles.kpi}>
                <Text style={styles.kpiLabel}>Series</Text>
                <Text style={styles.kpiValue}>{entreno ? "18" : "0"}</Text>
              </View>
            </View>
          </View>

          <Pressable
            style={styles.cta}
            onPress={() => router.replace("/tabs/Progreso")}
          >
            <Text style={styles.ctaText}>VOLVER</Text>
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#121212" },
  root: { flex: 1, backgroundColor: "#121212" },

  /* ✅ HEADER COPIADO TAL CUAL */
  header: {
    height: 85,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    backgroundColor: "#121212",
    paddingTop: 30,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#F3F3F3",
    fontWeight: "bold",
    letterSpacing: 1.2,
    marginTop: 20,
    fontSize: 20,
  },

  card: {
    marginTop: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "rgba(70,70,70,0.45)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 14,
  },

  big: {
    color: "#F3F3F3",
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 0.5,
  },

  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginTop: 10,
  },
  badgeOk: { backgroundColor: ORANGE },
  badgeRest: { backgroundColor: "rgba(255,255,255,0.10)" },
  badgeTxt: {
    color: "#F3F3F3",
    fontWeight: "900",
    fontSize: 11,
    letterSpacing: 0.6,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    marginVertical: 12,
  },

  section: { color: "#F3F3F3", fontWeight: "900", marginBottom: 10 },

  kpiRow: { flexDirection: "row", gap: 10, marginBottom: 10 },
  kpi: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.10)",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  kpiLabel: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 11,
    fontWeight: "900",
  },
  kpiValue: { color: "#F3F3F3", fontSize: 18, fontWeight: "900", marginTop: 6 },

  cta: {
    marginTop: 12,
    marginHorizontal: 16,
    height: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4C4C4C",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  ctaText: { color: "#FFF", fontWeight: "900", letterSpacing: 0.8 },
});
