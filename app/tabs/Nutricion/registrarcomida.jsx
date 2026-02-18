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
      {
        key: "favoritos",
        title: "Favoritos",
        icon: "star",
        items: [
          {
            name: "Huevos revueltos",
            kcal: "150 kcal",
            p: "12g",
            c: "1g",
            g: "10g",
          },
          {
            name: "Avena con plátano",
            kcal: "310 kcal",
            p: "10g",
            c: "55g",
            g: "6g",
          },
          {
            name: "Pechuga de pollo con arroz",
            kcal: "520 kcal",
            p: "40g",
            c: "55g",
            g: "12g",
          },
        ],
      },

      {
        key: "desayunos",
        title: "Desayunos",
        icon: "egg",
        items: [
          {
            name: "Huevos revueltos",
            kcal: "150 kcal",
            p: "12g",
            c: "1g",
            g: "10g",
          },
          {
            name: "Huevos con jamón",
            kcal: "220 kcal",
            p: "18g",
            c: "2g",
            g: "14g",
          },
          {
            name: "Omelette de queso",
            kcal: "280 kcal",
            p: "18g",
            c: "2g",
            g: "22g",
          },
          {
            name: "Avena con plátano",
            kcal: "310 kcal",
            p: "10g",
            c: "55g",
            g: "6g",
          },
          {
            name: "Yogurt griego con granola",
            kcal: "260 kcal",
            p: "18g",
            c: "30g",
            g: "6g",
          },
          {
            name: "Hotcakes",
            kcal: "175 kcal",
            p: "4g",
            c: "25g",
            g: "5g",
          },
          {
            name: "Tostadas de aguacate",
            kcal: "320 kcal",
            p: "8g",
            c: "35g",
            g: "16g",
          },
          {
            name: "Chilaquiles rojos",
            kcal: "480 kcal",
            p: "16g",
            c: "60g",
            g: "20g",
          },
        ],
      },

      {
        key: "comidas",
        title: "Comidas",
        icon: "fast-food",
        items: [
          {
            name: "Pechuga de pollo con arroz",
            kcal: "520 kcal",
            p: "40g",
            c: "55g",
            g: "12g",
          },
          {
            name: "Carne asada con ensalada",
            kcal: "600 kcal",
            p: "45g",
            c: "15g",
            g: "38g",
          },
          {
            name: "Tacos de pollo",
            kcal: "480 kcal",
            p: "28g",
            c: "45g",
            g: "18g",
          },
          {
            name: "Pasta con atún",
            kcal: "540 kcal",
            p: "28g",
            c: "70g",
            g: "14g",
          },
          {
            name: "Ensalada César con pollo",
            kcal: "450 kcal",
            p: "32g",
            c: "18g",
            g: "26g",
          },
          {
            name: "Burrito de frijol y queso",
            kcal: "560 kcal",
            p: "22g",
            c: "75g",
            g: "18g",
          },
        ],
      },

      {
        key: "cenas",
        title: "Cenas",
        icon: "moon",
        items: [
          {
            name: "Atún con galletas saladas",
            kcal: "320 kcal",
            p: "28g",
            c: "24g",
            g: "10g",
          },
          {
            name: "Sándwich de pavo",
            kcal: "380 kcal",
            p: "26g",
            c: "40g",
            g: "12g",
          },
          {
            name: "Quesadillas de queso",
            kcal: "420 kcal",
            p: "18g",
            c: "44g",
            g: "18g",
          },
          {
            name: "Ensalada de atún",
            kcal: "350 kcal",
            p: "30g",
            c: "10g",
            g: "20g",
          },
          {
            name: "Tostadas de pollo",
            kcal: "460 kcal",
            p: "26g",
            c: "42g",
            g: "18g",
          },
        ],
      },

      {
        key: "jugos",
        title: "Jugos",
        icon: "wine",
        items: [
          {
            name: "Jugo de Mango",
            kcal: "51 kcal",
            p: "0.1g",
            c: "13.1g",
            g: "0.06g",
          },
          {
            name: "Jaztea",
            kcal: "30 kcal",
            p: "0g",
            c: "7.5g",
            g: "0g",
          },
          {
            name: "Coca Cola",
            kcal: "30 kcal",
            p: "0g",
            c: "7.5g",
            g: "0g",
          },
        ],
      },

      {
        key: "licuados",
        title: "Licuados",
        icon: "cafe",
        items: [
          {
            name: "Licuado de plátano",
            kcal: "160 kcal - 100 ml",
            p: "3g",
            c: "30g",
            g: "3g",
          },
          {
            name: "Licuado de fresa",
            kcal: "140 kcal - 100 ml",
            p: "3g",
            c: "26g",
            g: "3g",
          },
          {
            name: "Licuado de avena",
            kcal: "190 kcal - 100 ml",
            p: "4g",
            c: "32g",
            g: "5g",
          },
        ],
      },
    ],
    [],
  );

  // ✅ Estado inicial automático: todas cerradas
  const initialOpen = useMemo(() => {
    const obj = {};
    data.forEach((cat) => (obj[cat.key] = false));
    return obj;
  }, [data]);

  const [open, setOpen] = useState(initialOpen);

  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  // Filtro simple (UI)
  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return data;

    return data.map((cat) => ({
      ...cat,
      items: cat.items.filter((it) => it.name.toLowerCase().includes(qq)),
    }));
  }, [q, data]);

  // ✅ SOLO alimentos navegan
  const goToFoodDetail = (cat, it) => {
    router.push({
      pathname: "/tabs/Nutricion/detallealimento", // cambia si tu ruta es otra
      params: {
        category: cat.key,
        name: it.name,
        kcal: it.kcal,
        p: it.p,
        c: it.c,
        g: it.g,
      },
    });
  };

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
              {/* Categoría SOLO abre/cierra */}
              <Pressable
                style={({ pressed }) => [
                  styles.blockHeader,
                  pressed && { opacity: 0.9 },
                ]}
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
                      // ✅ ALIMENTO presionable
                      <Pressable
                        key={`${cat.key}-${it.name}-${idx}`}
                        onPress={() => goToFoodDetail(cat, it)}
                        style={({ pressed }) => [
                          styles.row,
                          idx !== 0 && styles.rowTopLine,
                          pressed && { opacity: 0.85 },
                        ]}
                      >
                        <View style={{ flex: 1 }}>
                          <Text style={styles.rowName}>{it.name}</Text>
                          <Text style={styles.rowMacros}>
                            P: {it.p} C: {it.c} G: {it.g}
                          </Text>
                        </View>

                        <Text style={styles.rowKcal}>{it.kcal}</Text>
                      </Pressable>
                    ))
                  )}
                </View>
              )}
            </View>
          ))}
        </ScrollView>

        {/* Botón fijo */}
        <View style={styles.ctaWrap}>
          <Pressable
            style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9 }]}
            onPress={() => router.push("/tabs/Nutricion/nuevacomida")}
          >
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
