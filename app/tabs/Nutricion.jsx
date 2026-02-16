import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const TABBAR_HEIGHT = 90; // aprox: tu TabBar (paddingTop 20 + paddingBottom 30 + contenido)
const CTA_HEIGHT = 56; // altura del botón
const HEADER_HEIGHT = 100; // altura del título fijo

const Nutricion = () => {
  // ------- Datos mock (UI) -------
  const kcalActual = 1500;
  const kcalMeta = 2500;

  const macros = {
    proteinas: { actual: 120, meta: 200, color: "#55B56A" },
    carbohidratos: { actual: 160, meta: 250, color: "#F4D75C" },
    grasas: { actual: 45, meta: 80, color: "#E06A2B" },
  };

  const comidas = [
    {
      title: "Desayuno",
      total: 360,
      items: [
        {
          name: "3 Huevos revueltos",
          kcal: 220,
          p: 21,
          c: 1.2,
          g: 16,
          emoji: "🍳",
        },
        {
          name: "Licuado de plátano - 500 ml",
          kcal: 140,
          p: 6,
          c: 30,
          g: 2,
          emoji: "🥤",
        },
      ],
    },
    {
      title: "Comida",
      total: 550,
      items: [
        {
          name: "Double Western Bacon Cheeseburger",
          kcal: 1040,
          p: 58,
          c: 78,
          g: 56,
          emoji: "🍔",
        },
        {
          name: "Coca Cola - 500 ml",
          kcal: 210,
          p: 0,
          c: 53,
          g: 0,
          emoji: "🥤",
        },
      ],
    },
    {
      title: "Cena",
      total: 550,
      items: [
        { name: "Ramen", kcal: 1040, p: 58, c: 78, g: 56, emoji: "🍜" },
        { name: "Fanta - 500 ml", kcal: 210, p: 0, c: 53, g: 0, emoji: "🥤" },
      ],
    },
  ];

  // ------- Medidor semicircular -------
  const progress = Math.min(1, kcalActual / kcalMeta);

  const size = 240;
  const stroke = 18;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;

  const arcPath = useMemo(() => {
    const startX = cx - r;
    const startY = cy;
    const endX = cx + r;
    const endY = cy;
    return `M ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY}`;
  }, [cx, cy, r]);

  const progressPath = useMemo(() => {
    const angle = Math.PI * progress;
    const x = cx - r * Math.cos(angle);
    const y = cy - r * Math.sin(angle);
    return `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${x} ${y}`;
  }, [cx, cy, r, progress]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        {/* ✅ HEADER FIJO */}
        <View style={styles.stickyHeader}>
          <Text style={styles.title}>ALIMENTACIÓN</Text>
        </View>

        {/* ✅ SCROLL SOLO PARA EL CONTENIDO */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scroll,
            {
              paddingTop: HEADER_HEIGHT + 14, // espacio para el header fijo
              paddingBottom: TABBAR_HEIGHT + CTA_HEIGHT + 22, // espacio para botón fijo + tabbar
            },
          ]}
        >
          {/* Panel principal */}
          <View style={styles.panel}>
            <Pressable style={styles.settingsBtn} onPress={() => {}}>
              <Ionicons name="settings-sharp" size={20} color="#f0f0f0" />
            </Pressable>

            <View style={styles.gaugeWrap}>
              <Svg
                width={size}
                height={size * 0.62}
                viewBox={`0 0 ${size} ${size}`}
              >
                <Path
                  d={arcPath}
                  stroke="#D8D8D8"
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  fill="none"
                  opacity={0.9}
                />
                <Path
                  d={progressPath}
                  stroke="#55B56A"
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  fill="none"
                />
              </Svg>

              <View style={styles.gaugeCenter}>
                <Text style={styles.kcalMain}>
                  {kcalActual.toLocaleString()}{" "}
                  <Text style={styles.kcalSlash}>/{"\n"}</Text>
                  {kcalMeta.toLocaleString()}
                  <Text style={styles.kcalUnit}> kcal</Text>
                </Text>

                <View style={styles.metaPill}>
                  <Text style={styles.metaPillText}>META</Text>
                </View>
              </View>
            </View>

            <View style={styles.macroBlock}>
              <MacroRow
                label="Proteínas"
                actual={macros.proteinas.actual}
                meta={macros.proteinas.meta}
                color={macros.proteinas.color}
              />
              <MacroRow
                label="Carbohidratos"
                actual={macros.carbohidratos.actual}
                meta={macros.carbohidratos.meta}
                color={macros.carbohidratos.color}
              />
              <MacroRow
                label="Grasas"
                actual={macros.grasas.actual}
                meta={macros.grasas.meta}
                color={macros.grasas.color}
              />
            </View>
          </View>

          {/* Registro del día */}
          {comidas.map((bloque) => (
            <View key={bloque.title} style={styles.mealCard}>
              <View style={styles.mealHeader}>
                <Text style={styles.mealTitle}>{bloque.title}</Text>
                <Text style={styles.mealTotal}>{bloque.total} kcal</Text>
              </View>

              {bloque.items.map((it, idx) => (
                <View
                  key={`${bloque.title}-${it.name}-${idx}`}
                  style={[styles.mealItem, idx !== 0 && styles.mealItemTopLine]}
                >
                  <View style={styles.itemLeft}>
                    <View style={styles.itemIcon}>
                      <Text style={styles.itemEmoji}>{it.emoji}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={styles.itemName}>{it.name}</Text>
                      <Text style={styles.itemMacros}>
                        P: {it.p}g{"   "}C: {it.c}g{"   "}G: {it.g}g
                      </Text>
                    </View>
                  </View>

                  <View style={styles.itemRight}>
                    <Text style={styles.itemTime}>8:00 AM</Text>
                    <Text style={styles.itemKcal}>{it.kcal} kcal</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>

        {/* ✅ BOTÓN FIJO ABAJO */}
        <View style={[styles.stickyCtaWrap, { bottom: TABBAR_HEIGHT + 10 }]}>
          <Pressable style={styles.cta} onPress={() => {}}>
            <Text style={styles.ctaText}>REGISTRAR COMIDA</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

function MacroRow({ label, actual, meta, color }) {
  const pct = Math.min(1, actual / meta);

  return (
    <View style={styles.macroRow}>
      <View style={styles.macroTop}>
        <Text style={styles.macroLabel}>{label}</Text>
        <Text style={styles.macroValue}>
          {actual} / {meta} g
        </Text>
      </View>

      <View style={styles.macroTrack}>
        <View
          style={[
            styles.macroFill,
            { width: `${pct * 100}%`, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#121212" },
  root: { flex: 1, backgroundColor: "#121212" },

  // ✅ HEADER fijo
  stickyHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
    backgroundColor: "#121212",
    paddingTop: 30,
  },
  title: {
    marginTop: 20,
    color: "#F3F3F3",
    fontWeight: "bold",
    letterSpacing: 1.2,
    fontSize: 20,
  },

  scroll: {
    paddingHorizontal: 16,
  },

  panel: {
    backgroundColor: "rgba(70,70,70,0.45)",
    borderRadius: 14,
    padding: 14,
    overflow: "hidden",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  settingsBtn: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
  },

  gaugeWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
    paddingBottom: 6,
  },
  gaugeCenter: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: 48,
  },

  kcalMain: {
    color: "#F3F3F3",
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 30,
  },
  kcalSlash: { color: "#DCDCDC", fontWeight: "700" },
  kcalUnit: { color: "#CFCFCF", fontSize: 16, fontWeight: "700" },

  metaPill: {
    marginTop: 10,
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  metaPillText: {
    color: "#EAEAEA",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  macroBlock: { marginTop: 6, gap: 10 },
  macroRow: { gap: 6 },
  macroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  macroLabel: { color: "#F0F0F0", fontWeight: "800", fontSize: 12 },
  macroValue: { color: "#D7D7D7", fontSize: 11, opacity: 0.9 },

  macroTrack: {
    height: 8,
    backgroundColor: "rgba(0,0,0,0.28)",
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  macroFill: { height: "100%", borderRadius: 999 },

  mealCard: {
    backgroundColor: "#B1721F",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 2,
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mealTitle: { color: "#FFF", fontWeight: "900", fontSize: 13 },
  mealTotal: {
    color: "#F6F0E8",
    fontWeight: "800",
    fontSize: 11,
    opacity: 0.95,
  },

  mealItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    paddingTop: 12,
    paddingBottom: 10,
  },
  mealItemTopLine: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.25)",
  },

  itemLeft: { flexDirection: "row", gap: 10, flex: 1, alignItems: "center" },
  itemIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.18)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  itemEmoji: { fontSize: 18 },
  itemName: { color: "#FFF", fontWeight: "900", fontSize: 12 },
  itemMacros: { color: "rgba(255,255,255,0.85)", fontSize: 10, marginTop: 2 },

  itemRight: { alignItems: "flex-end", justifyContent: "center" },
  itemTime: { color: "rgba(255,255,255,0.85)", fontSize: 10, marginBottom: 2 },
  itemKcal: { color: "#FFF", fontWeight: "900", fontSize: 11 },

  // ✅ CTA fijo
  stickyCtaWrap: {
    position: "absolute",
    left: 16,
    right: 16,
    zIndex: 60,
  },
  cta: {
    height: CTA_HEIGHT,
    backgroundColor: "#4C4C4C",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  ctaText: { color: "#FFF", fontWeight: "900", letterSpacing: 0.8 },
});

export default Nutricion;
