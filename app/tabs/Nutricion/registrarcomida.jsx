import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

const TABBAR_HEIGHT = 90;

const RegistrarComida = () => {
  const [q, setQ] = useState("");

  // Categorías (UI mock)
  const data = useMemo(
    () => [
      { key: "favoritos", title: "Favoritos", icon: "star", items: [] },
      { key: "desayunos", title: "Desayunos", icon: "egg", items: [] },
      { key: "comidas", title: "Comidas", icon: "fast-food", items: [] },
      { key: "cenas", title: "Cenas", icon: "moon", items: [] },
      {
        key: "jugos",
        title: "Jugos",
        icon: "wine",
        items: [
          {
            name: "Jugo de Mango",
            kcal: "51 kcal - 100 ml",
            p: "0.1g",
            c: "13.1g",
            g: "0.06g",
          },
          {
            name: "Jaztea",
            kcal: "30 kcal - 100 ml",
            p: "0g",
            c: "7.5g",
            g: "0g",
          },
          {
            name: "Coca Cola",
            kcal: "30 kcal - 100 ml",
            p: "0g",
            c: "7.5g",
            g: "0g",
          },
        ],
      },
      { key: "licuados", title: "Licuados", icon: "cafe", items: [] },
    ],
    [],
  );

  // Estado de acordeón (qué categorías están abiertas)
  const [open, setOpen] = useState({
    favoritos: false,
    desayunos: false,
    comidas: false,
    cenas: true, // como en tu imagen (puedes poner false si quieres)
    jugos: true, // abierto para mostrar lista
    licuados: false,
  });

  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  // Filtro simple (UI)
  const filtered = data.map((cat) => {
    if (!q.trim()) return cat;
    const qq = q.trim().toLowerCase();
    return {
      ...cat,
      items: cat.items.filter((it) => it.name.toLowerCase().includes(qq)),
    };
  });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        {/* Header fijo */}
        <View style={styles.header}>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#F3F3F3" />
          </Pressable>

          <Text style={styles.headerTitle}>REGISTRAR COMIDA</Text>

          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: TABBAR_HEIGHT + 110 }}
        >
          {/* Search */}
          <View style={styles.searchWrap}>
            <Ionicons name="search" size={18} color="rgba(255,255,255,0.6)" />
            <TextInput
              value={q}
              onChangeText={setQ}
              placeholder="Buscas alimento..."
              placeholderTextColor="rgba(255,255,255,0.45)"
              style={styles.searchInput}
            />
          </View>

          {/* Acordeones */}
          {filtered.map((cat) => (
            <View key={cat.key} style={styles.block}>
              <Pressable
                style={styles.blockHeader}
                onPress={() => toggle(cat.key)}
              >
                <View style={styles.blockLeft}>
                  <Ionicons name={cat.icon} size={18} color="#F3F3F3" />
                  <Text style={styles.blockTitle}>{cat.title}</Text>
                </View>

                <Ionicons
                  name={open[cat.key] ? "chevron-up" : "chevron-down"}
                  size={18}
                  color="rgba(255,255,255,0.75)"
                />
              </Pressable>

              {open[cat.key] && (
                <View style={styles.blockBody}>
                  {cat.items.length === 0 ? (
                    <Text style={styles.emptyText}>Sin elementos</Text>
                  ) : (
                    cat.items.map((it, idx) => (
                      <View
                        key={`${cat.key}-${it.name}-${idx}`}
                        style={[styles.row, idx !== 0 && styles.rowTopLine]}
                      >
                        <View style={{ flex: 1 }}>
                          <Text style={styles.rowName}>{it.name}</Text>
                          <Text style={styles.rowMacros}>
                            P: {it.p} C: {it.c} G: {it.g}
                          </Text>
                        </View>

                        <Text style={styles.rowKcal}>{it.kcal}</Text>
                      </View>
                    ))
                  )}
                </View>
              )}
            </View>
          ))}
        </ScrollView>

        {/* Botón fijo */}
        <View style={styles.ctaWrap}>
          <Pressable style={styles.cta} onPress={() => {}}>
            <Text style={styles.ctaText}>REGISTRAR NUEVA COMIDA</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#121212" },
  root: { flex: 1, backgroundColor: "#121212" },

  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    backgroundColor: "#121212",
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { color: "#F3F3F3", fontWeight: "900", letterSpacing: 1.1 },

  // fondo tipo degradado (simulado con overlay naranja)
  // si quieres degradado real luego lo hacemos con expo-linear-gradient
  searchWrap: {
    marginTop: 10,
    marginHorizontal: 16,
    height: 42,
    borderRadius: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  searchInput: { flex: 1, color: "#F3F3F3" },

  block: {
    marginTop: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "rgba(70,70,70,0.45)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  blockHeader: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  blockLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  blockTitle: { color: "#F3F3F3", fontWeight: "900" },

  blockBody: {
    paddingHorizontal: 14,
    paddingBottom: 12,
    backgroundColor: "rgba(0,0,0,0.10)",
  },
  emptyText: { color: "rgba(255,255,255,0.65)", paddingTop: 8 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  rowTopLine: { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.15)" },
  rowName: { color: "#FFF", fontWeight: "900", fontSize: 12 },
  rowMacros: { color: "rgba(255,255,255,0.75)", fontSize: 10, marginTop: 2 },
  rowKcal: { color: "rgba(255,255,255,0.8)", fontSize: 10 },

  ctaWrap: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: TABBAR_HEIGHT + 10,
  },
  cta: {
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

export default RegistrarComida;
