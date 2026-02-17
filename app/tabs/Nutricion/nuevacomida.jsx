import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

const CATEGORIAS = ["Desayuno", "Comida", "Cena", "Snack", "Postre", "Bebida"];
const TABBAR_HEIGHT = 90; // para que no se tape con tu tabbar

export default function NuevaComida() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [categoria, setCategoria] = useState("");
  const [openCategorias, setOpenCategorias] = useState(false);

  const [proteinas, setProteinas] = useState("0");
  const [carbos, setCarbos] = useState("0");
  const [grasas, setGrasas] = useState("0");
  const [calorias, setCalorias] = useState("0");

  const [chatOpen, setChatOpen] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        {/* Header fijo (IDÉNTICO a RegistrarComida) */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.push("/tabs/Nutricion/registrarcomida")}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={22} color="#F3F3F3" />
          </Pressable>

          <Text style={styles.headerTitle}>NUEVA COMIDA</Text>

          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: TABBAR_HEIGHT + 140 }}
        >
          {/* Nombre */}
          <View style={[styles.inputWrap, { marginTop: 10 }]}>
            <TextInput
              placeholder="Nombre"
              placeholderTextColor="rgba(255,255,255,0.45)"
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
            />
          </View>

          {/* Foto */}
          <View style={styles.inputWrap}>
            <View style={styles.photoRow}>
              <Text style={styles.fakePlaceholder}>Foto</Text>

              <Pressable
                onPress={() => {}}
                style={({ pressed }) => [
                  styles.uploadBtn,
                  pressed && { opacity: 0.85 },
                ]}
              >
                <Ionicons
                  name="cloud-upload-outline"
                  size={18}
                  color="#EDEDED"
                />
              </Pressable>
            </View>
          </View>

          {/* Categoría */}
          <View style={styles.inputWrap}>
            <Pressable
              onPress={() => setOpenCategorias(true)}
              style={({ pressed }) => [
                styles.select,
                pressed && { opacity: 0.9 },
              ]}
            >
              <Text
                style={categoria ? styles.selectText : styles.selectPlaceholder}
              >
                {categoria ? categoria : "Categoría"}
              </Text>
              <Ionicons
                name="chevron-down"
                size={18}
                color="rgba(255,255,255,0.75)"
              />
            </Pressable>
          </View>

          {/* Macronutrientes */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Macronutrientes</Text>
            <View style={styles.divider} />

            <MacroRow
              label="Proteínas (g)"
              value={proteinas}
              onChange={setProteinas}
            />
            <MacroRow
              label="Carbohidratos (g)"
              value={carbos}
              onChange={setCarbos}
            />
            <MacroRow label="Grasas (g)" value={grasas} onChange={setGrasas} />
            <MacroRow
              label="Calorías (kcal)"
              value={calorias}
              onChange={setCalorias}
              isLast
            />
          </View>

          {/* Descripción */}
          <View style={styles.descCard}>
            <Text style={styles.descTitle}>Descripción</Text>
            <TextInput
              placeholder="Describe los alimentos..."
              placeholderTextColor="rgba(255,255,255,0.45)"
              value={descripcion}
              onChangeText={setDescripcion}
              style={styles.descInput}
              multiline
              textAlignVertical="top"
            />
          </View>
        </ScrollView>

        {/* Botón Chat flotante */}
        <Pressable
          onPress={() => setChatOpen(true)}
          style={({ pressed }) => [
            styles.chatPill,
            pressed && { transform: [{ scale: 0.99 }], opacity: 0.95 },
          ]}
        >
          <Ionicons name="sparkles" size={16} color="#FFB13B" />
          <Text style={styles.chatPillText}>BeatMe IA</Text>
        </Pressable>

        {/* Botón Guardar fijo (igual al de RegistrarComida) */}
        {/* Botón Guardar fijo (siempre funciona) */}
        <View style={styles.ctaWrap}>
          <Pressable
            onPress={() => router.push("/tabs/Nutricion/registrarcomida")}
            style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9 }]}
          >
            <Text style={styles.ctaText}>GUARDAR NUEVA COMIDA</Text>
          </Pressable>
        </View>

        {/* Modal Categorías */}
        <Modal
          transparent
          animationType="fade"
          visible={openCategorias}
          onRequestClose={() => setOpenCategorias(false)}
        >
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setOpenCategorias(false)}
          >
            <Pressable style={styles.modalCard} onPress={() => {}}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Selecciona una categoría</Text>
                <Pressable onPress={() => setOpenCategorias(false)}>
                  <Ionicons name="close" size={20} color="#EDEDED" />
                </Pressable>
              </View>

              {CATEGORIAS.map((c) => (
                <Pressable
                  key={c}
                  onPress={() => {
                    setCategoria(c);
                    setOpenCategorias(false);
                  }}
                  style={({ pressed }) => [
                    styles.modalItem,
                    pressed && { opacity: 0.85 },
                  ]}
                >
                  <Text style={styles.modalItemText}>{c}</Text>
                  {categoria === c ? (
                    <Ionicons name="checkmark" size={18} color="#FFB13B" />
                  ) : (
                    <View style={{ width: 18 }} />
                  )}
                </Pressable>
              ))}
            </Pressable>
          </Pressable>
        </Modal>

        {/* Modal Chat (UI mock) */}
        <Modal
          transparent
          animationType="fade"
          visible={chatOpen}
          onRequestClose={() => setChatOpen(false)}
        >
          <View style={styles.chatBackdrop}>
            <View style={styles.chatBox}>
              <View style={styles.chatHeader}>
                <View style={styles.avatar}>
                  <Ionicons name="hardware-chip" size={18} color="#FFB13B" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.chatName}>BeatMe IA</Text>
                  <Text style={styles.chatStatus}>● Online now</Text>
                </View>
                <Pressable
                  onPress={() => setChatOpen(false)}
                  style={styles.chatClose}
                >
                  <Ionicons name="close" size={18} color="#EDEDED" />
                </Pressable>
              </View>

              <ScrollView
                style={styles.chatBody}
                contentContainerStyle={{ paddingBottom: 10 }}
              >
                <BubbleLeft text="Hola 👋, ¿Cómo puedo ayudarte?" />
                <BubbleRight text="Quiero saber los macronutrientes de mi receta." />
                <BubbleLeft text="¡Ok! Pásame la receta en el siguiente mensaje 😄" />
                <BubbleRight
                  text={
                    "Huevo revuelto:\n1) Rompe 2 huevos en un vaso.\n2) Calienta sartén...\n3) Agrega..."
                  }
                />
                <BubbleLeft
                  text={
                    "Proteína: 12 g\nCarbohidratos: 1 g\nGrasas: 10 g\nCalorías: 140 kcal"
                  }
                  compact
                />
              </ScrollView>

              <View style={styles.chatInputRow}>
                <Text style={styles.chatPlaceholder}>Escribir...</Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

/* ---------- Componentes ---------- */

function MacroRow({ label, value, onChange, isLast }) {
  return (
    <View style={[styles.macroRow, isLast && { borderBottomWidth: 0 }]}>
      <Text style={styles.macroLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        keyboardType="numeric"
        style={styles.macroInput}
        placeholder="0"
        placeholderTextColor="rgba(0,0,0,0.35)"
      />
    </View>
  );
}

function BubbleLeft({ text, compact }) {
  return (
    <View
      style={[
        styles.bubble,
        styles.bubbleLeft,
        compact && { paddingVertical: 10 },
      ]}
    >
      <Text style={styles.bubbleText}>{text}</Text>
    </View>
  );
}

function BubbleRight({ text }) {
  return (
    <View style={[styles.bubble, styles.bubbleRight]}>
      <Text style={styles.bubbleText}>{text}</Text>
    </View>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#121212" },
  root: { flex: 1, backgroundColor: "#121212" },

  /* HEADER IDÉNTICO */
  header: {
    height: 85,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    backgroundColor: "#121212", // cámbialo a #121212 luego
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

  /* Inputs */
  inputWrap: {
    marginHorizontal: 16,
    height: 42,
    borderRadius: 10,
    paddingHorizontal: 12,
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginTop: 12,
  },
  input: { color: "#F3F3F3", flex: 1 },

  photoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fakePlaceholder: { color: "rgba(255,255,255,0.45)", fontStyle: "italic" },
  uploadBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,177,59,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,177,59,0.25)",
  },

  select: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 42,
  },
  selectPlaceholder: { color: "rgba(255,255,255,0.45)", fontStyle: "italic" },
  selectText: { color: "#F3F3F3", fontWeight: "900" },

  /* Cards */
  card: {
    marginTop: 15,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#5a3a0f",
    borderWidth: 1,
    borderColor: "rgba(255,177,59,0.25)",
  },
  cardTitle: { color: "#FFE7B8", fontWeight: "bold", fontSize: 15 },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginVertical: 10,
  },

  macroRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.12)",
    paddingLeft: 5,
  },
  macroLabel: {
    color: "#FFE7B8",
    fontSize: 13,
    fontWeight: "bold",
  },
  macroInput: {
    width: 65,
    height: 35,
    borderRadius: 8,
    backgroundColor: "#f88d00",
    color: "#1b1206",
    fontWeight: "900",
    textAlign: "center",
    fontSize: 12,
  },

  descCard: {
    marginTop: 14,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#7a4b11",
    borderWidth: 1,
    borderColor: "rgba(255,177,59,0.25)",
  },
  descTitle: {
    color: "#FFE7B8",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 8,
  },
  descInput: {
    minHeight: 140,
    color: "#F3F3F3",
    fontSize: 13,
    lineHeight: 18,
  },

  /* Chat */
  chatPill: {
    position: "absolute",
    right: 18,
    bottom: 163,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    height: 40,
    borderRadius: 999,
    backgroundColor: "rgba(190, 200, 170, 0.55)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  chatPillText: { color: "#1b1b1b", fontWeight: "900" },

  /* Botón Guardar fijo */
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
  ctaText: {
    color: "#FFF",
    fontWeight: "900",
    letterSpacing: 0.8,
  },

  /* Modal categorías */
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  modalCard: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#1b1b1b",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,177,59,0.20)",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitle: { color: "#EDEDED", fontWeight: "900", fontSize: 13 },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalItemText: { color: "#DADADA", fontWeight: "700" },

  /* Modal chat */
  chatBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  chatBox: {
    width: "92%",
    maxWidth: 420,
    height: 520,
    backgroundColor: "#2a2a2a",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  chatHeader: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#303030",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.10)",
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,177,59,0.30)",
  },
  chatName: { color: "#EDEDED", fontWeight: "900" },
  chatStatus: { color: "#AFAFAF", fontSize: 11, marginTop: 2 },
  chatClose: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  chatBody: { flex: 1, paddingHorizontal: 12, paddingTop: 12 },

  bubble: {
    maxWidth: "80%",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  bubbleLeft: {
    alignSelf: "flex-start",
    backgroundColor: "#3a3a3a",
    borderTopLeftRadius: 6,
  },
  bubbleRight: {
    alignSelf: "flex-end",
    backgroundColor: "#C97E1C",
    borderTopRightRadius: 6,
  },
  bubbleText: {
    color: "#EDEDED",
    fontWeight: "700",
    fontSize: 12,
    lineHeight: 16,
  },

  chatInputRow: {
    height: 44,
    backgroundColor: "#e6e6e6",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  chatPlaceholder: { color: "#7a7a7a", fontSize: 12 },
});
