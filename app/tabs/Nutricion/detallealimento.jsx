import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const TABBAR_HEIGHT = 90;

function toNumber(val) {
  if (val == null) return 0;
  const n = parseFloat(String(val).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

function roundSmart(n) {
  if (!Number.isFinite(n)) return "0";
  if (n === 0) return "0";
  if (Math.abs(n) < 1) return n.toFixed(1);
  return n.toFixed(0);
}

export default function DetalleAlimento() {
  const params = useLocalSearchParams();

  const name = (params?.name ?? "Huevo revuelto").toString();
  const baseKcal = toNumber(params?.kcal ?? "220");
  const baseP = toNumber(params?.p ?? "21");
  const baseC = toNumber(params?.c ?? "1.2");
  const baseG = toNumber(params?.g ?? "16");

  const descripcion =
    (params?.descripcion && params.descripcion.toString()) ||
    "1. Rompe 1 huevo en un vaso, pon sal y bátelos.\n" +
      "2. Calienta un sartén a fuego medio con poquita mantequilla o aceite.\n" +
      "3. Echa el huevo y mueve con una espátula 30–60 s hasta que cuaje.\n" +
      "4. Apaga, prueba y ajusta sal/pimienta.";

  const [qty, setQty] = useState(1);

  const macros = useMemo(() => {
    return {
      p: baseP * qty,
      c: baseC * qty,
      g: baseG * qty,
      kcal: baseKcal * qty,
    };
  }, [baseP, baseC, baseG, baseKcal, qty]);

  const dec = () => setQty((v) => Math.max(1, v - 1));
  const inc = () => setQty((v) => Math.min(99, v + 1));

  const onAdd = () => {
    // UI-only: aquí luego guardarías en tu estado / backend
    router.back();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#F3F3F3" />
          </Pressable>

          <Text style={styles.headerTitle}>AÑADIR ALIMENTO</Text>

          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: TABBAR_HEIGHT + 120 }}
        >
          {/* Card alimento */}
          <View style={styles.cardFood}>
            <View style={styles.foodIconWrap}>
              <Ionicons name="egg" size={22} color="#fff" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.foodTitle}>
                {name} <Text style={styles.foodQtyTag}>({qty})</Text>
              </Text>
            </View>
          </View>

          {/* Descripción */}
          <Text style={styles.sectionLabel}>Descripción</Text>
          <View style={styles.cardDesc}>
            {descripcion.split("\n").map((line, idx) => (
              <Text key={idx} style={styles.descText}>
                {line}
              </Text>
            ))}
          </View>

          {/* Cantidad */}
          <Text style={[styles.sectionLabel, { marginTop: 18 }]}>Cantidad</Text>
          <View style={styles.qtyWrap}>
            <Pressable style={styles.qtyBtn} onPress={dec}>
              <Text style={styles.qtyBtnText}>-</Text>
            </Pressable>

            <View style={styles.qtyCenter}>
              <Text style={styles.qtyNumber}>{qty}</Text>
            </View>

            <Pressable style={styles.qtyBtn} onPress={inc}>
              <Text style={styles.qtyBtnText}>+</Text>
            </Pressable>
          </View>

          {/* Macronutrientes */}
          <View style={styles.cardMacros}>
            <Text style={styles.cardMacrosTitle}>Macronutrientes</Text>

            <View style={styles.table}>
              <View style={styles.tr}>
                <Text style={styles.tdLeft}>Proteínas (g)</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{roundSmart(macros.p)}</Text>
                </View>
              </View>

              <View style={styles.hr} />

              <View style={styles.tr}>
                <Text style={styles.tdLeft}>Carbohidratos (g)</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{roundSmart(macros.c)}</Text>
                </View>
              </View>

              <View style={styles.hr} />

              <View style={styles.tr}>
                <Text style={styles.tdLeft}>Grasas (g)</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{roundSmart(macros.g)}</Text>
                </View>
              </View>

              <View style={styles.hr} />

              <View style={styles.tr}>
                <Text style={styles.tdLeft}>Calorías (kcal)</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {roundSmart(macros.kcal)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Botón fijo */}
        <View style={styles.ctaWrap}>
          <Pressable style={styles.cta} onPress={onAdd}>
            <Text style={styles.ctaText}>AÑADIR ALIMENTO</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#121212" },
  root: { flex: 1, backgroundColor: "#121212" },

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
    fontWeight: "900",
    letterSpacing: 1.2,
    marginTop: 20,
    fontSize: 18,
  },

  cardFood: {
    marginTop: 14,
    marginHorizontal: 16,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  foodIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  foodTitle: { color: "#FFF", fontWeight: "900", fontSize: 16 },
  foodQtyTag: { color: "rgba(255,255,255,0.8)", fontWeight: "800" },

  sectionLabel: {
    marginTop: 16,
    marginHorizontal: 16,
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  cardDesc: {
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 14,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  descText: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 12,
    lineHeight: 18,
  },

  qtyWrap: {
    marginTop: 10,
    marginHorizontal: 16,
    height: 44,
    borderRadius: 12,
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  qtyBtn: {
    width: 56,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  qtyBtnText: { color: "#FFF", fontSize: 20, fontWeight: "900" },
  qtyCenter: { flex: 1, alignItems: "center", justifyContent: "center" },
  qtyNumber: { color: "#FFF", fontWeight: "900", fontSize: 16 },

  cardMacros: {
    marginTop: 18,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 14,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  cardMacrosTitle: {
    color: "rgba(255,255,255,0.85)",
    fontWeight: "900",
    marginBottom: 10,
  },

  table: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.20)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  tr: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tdLeft: { color: "rgba(255,255,255,0.85)", fontWeight: "800", fontSize: 12 },
  badge: {
    minWidth: 44,
    paddingHorizontal: 10,
    height: 24,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  badgeText: { color: "#FFF", fontWeight: "900", fontSize: 12 },
  hr: { height: 1, backgroundColor: "rgba(255,255,255,0.10)" },

  ctaWrap: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: TABBAR_HEIGHT + 12,
  },
  cta: {
    height: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#63B06E",
  },
  ctaText: { color: "#0E1A10", fontWeight: "900", letterSpacing: 0.8 },
});
