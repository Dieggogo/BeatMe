import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const BG = "#121212";
const CARD = "#1a1a1a";
const CARD2 = "#161616";
const TEXT = "#eaeaea";
const MUTED = "#a9a9a9";
const LINE = "rgba(255,255,255,0.08)";
const ACCENT = "#d8891f"; // naranja
const ACCENT2 = "#f2a83b";

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const ProgressBar = ({ value = 0 }) => {
  const v = clamp(value, 0, 1);
  return (
    <View style={styles.barTrack}>
      <View style={[styles.barFill, { width: `${v * 100}%` }]} />
    </View>
  );
};

const Chip = ({ label, active, onPress }) => (
  <Pressable
    onPress={onPress}
    style={[styles.chip, active ? styles.chipActive : styles.chipInactive]}
  >
    <Text style={[styles.chipText, active && { color: "#121212" }]}>
      {label}
    </Text>
  </Pressable>
);

const AchievementCard = ({ item, onPress }) => {
  const locked = !item.unlocked;
  return (
    <Pressable
      onPress={onPress}
      style={[styles.achCard, locked && { opacity: 0.75 }]}
    >
      <View
        style={[
          styles.achIconWrap,
          locked ? styles.achLocked : styles.achUnlocked,
        ]}
      >
        <Ionicons
          name={locked ? "lock-closed" : "trophy"}
          size={18}
          color={locked ? "#cfcfcf" : "#121212"}
        />
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.achTopRow}>
          <Text style={styles.achTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.achXp}>+{item.xp} XP</Text>
        </View>

        <Text style={styles.achDesc} numberOfLines={2}>
          {item.desc}
        </Text>

        <View style={{ marginTop: 10 }}>
          <ProgressBar value={item.progress} />
          <View style={styles.achBottomRow}>
            <Text style={styles.achMeta}>
              {Math.round(item.progress * 100)}%
            </Text>
            <Text style={styles.achMeta}>{item.category}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default function PerfilConLogros() {
  const [filtro, setFiltro] = useState("Todos");

  // Mock data (puedes editarlo a tu gusto)
  const user = {
    name: "HIRAM NORIEGA",
    age: "21 años",
    country: "México",
    bio: "Soy un joven universitario\namante del deporte.\nViva la vida.",
    stats: [
      { label: "Sesiones", value: 110 },
      { label: "Racha", value: 32 },
      { label: "Record", value: 57 },
    ],
  };

  const levelInfo = useMemo(() => {
    const level = 12;
    const xp = 2450;
    const next = 3000;
    return { level, xp, next, progress: xp / next };
  }, []);

  const achievements = useMemo(
    () => [
      {
        id: "a1",
        title: "Primer paso",
        desc: "Completa tu primera sesión registrada.",
        xp: 50,
        category: "Rutina",
        unlocked: true,
        progress: 1,
      },
      {
        id: "a2",
        title: "Constancia I",
        desc: "Mantén una racha de 7 días.",
        xp: 120,
        category: "Constancia",
        unlocked: true,
        progress: 1,
      },
      {
        id: "a3",
        title: "Constancia II",
        desc: "Mantén una racha de 30 días.",
        xp: 250,
        category: "Constancia",
        unlocked: true,
        progress: 32 / 30 > 1 ? 1 : 32 / 30,
      },
      {
        id: "a4",
        title: "Titán del gym",
        desc: "Registra 200 sesiones totales.",
        xp: 400,
        category: "Rutina",
        unlocked: false,
        progress: 110 / 200,
      },
      {
        id: "a5",
        title: "Nutri-Orden",
        desc: "Registra 10 comidas en una semana.",
        xp: 180,
        category: "Nutrición",
        unlocked: false,
        progress: 0.4,
      },
      {
        id: "a6",
        title: "Modo bestia",
        desc: "Alcanza tu record de racha (o supéralo).",
        xp: 220,
        category: "Constancia",
        unlocked: false,
        progress: 32 / 57,
      },
      {
        id: "a7",
        title: "Chef fit",
        desc: "Crea 5 comidas personalizadas.",
        xp: 140,
        category: "Nutrición",
        unlocked: false,
        progress: 0.2,
      },
      {
        id: "a8",
        title: "Disciplina",
        desc: "Registra actividad 3 semanas seguidas.",
        xp: 300,
        category: "Constancia",
        unlocked: false,
        progress: 0.55,
      },
    ],
    [],
  );

  const recientes = useMemo(
    () => achievements.filter((a) => a.unlocked).slice(0, 3),
    [achievements],
  );

  const filtrados = useMemo(() => {
    if (filtro === "Todos") return achievements;
    return achievements.filter((a) => a.category === filtro);
  }, [achievements, filtro]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Espaciador izquierdo (mismo tamaño que el botón) */}
        <View style={styles.backBtn} />

        <Text style={styles.headerTitle}>PERFIL</Text>

        <Pressable
          onPress={() => router.push("/(tabs)/Perfil/Settings")}
          style={styles.backBtn}
        >
          <Ionicons name="settings-outline" size={22} color="#F3F3F3" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Tarjeta perfil */}
        <View style={styles.profileCard}>
          <View style={styles.profileTopRow}>
            {/* Avatar */}
            <View style={styles.avatarRing}>
              <View style={styles.avatar}>
                {/* Si tienes imagen real, reemplaza por <Image source={{uri:...}} /> */}
                <Ionicons name="person" size={34} color={TEXT} />
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{user.name}</Text>

              <View style={styles.metaRow}>
                <View style={styles.flagDot} />
                <Text style={styles.metaText}>{user.country}</Text>
                <View style={styles.metaSep} />
                <Text style={styles.metaText}>{user.age}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.bio}>{user.bio}</Text>

          {/* Stats */}
          <View style={styles.statsCard}>
            {user.stats.map((s, idx) => (
              <View key={s.label} style={styles.statItem}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
                {idx !== user.stats.length - 1 && (
                  <View style={styles.statDivider} />
                )}
              </View>
            ))}
          </View>

          <Pressable
            onPress={() => router.push("/(tabs)/Perfil/EditarPerfil")} // ruta ejemplo
            style={styles.editBtn}
          >
            <Ionicons name="create-outline" size={16} color="#121212" />
            <Text style={styles.editText}>Editar perfil</Text>
          </Pressable>
        </View>

        {/* ====== LOGROS HUB ====== */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Logros</Text>
            <Pressable style={styles.smallLink} onPress={() => {}}>
              <Text style={styles.smallLinkText}>Ver todo</Text>
              <Ionicons name="chevron-forward" size={14} color={ACCENT2} />
            </Pressable>
          </View>

          {/* Nivel + XP */}
          <View style={styles.levelCard}>
            <View style={styles.levelLeft}>
              <View style={styles.levelBadge}>
                <Text style={styles.levelBadgeText}>NVL</Text>
                <Text style={styles.levelNumber}>{levelInfo.level}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.levelTitle}>Progreso general</Text>
                <Text style={styles.levelSub}>
                  {levelInfo.xp} / {levelInfo.next} XP
                </Text>
                <View style={{ marginTop: 10 }}>
                  <ProgressBar value={levelInfo.progress} />
                </View>
              </View>
            </View>

            <Pressable style={styles.claimBtn} onPress={() => {}}>
              <Ionicons name="sparkles" size={16} color="#121212" />
              <Text style={styles.claimText}>Niveles</Text>
            </Pressable>
          </View>

          {/* Recientes */}
          <View style={{ marginTop: 12 }}>
            <Text style={styles.subTitle}>Desbloqueados recientemente</Text>

            <View style={styles.recentRow}>
              {recientes.map((r) => (
                <View key={r.id} style={styles.recentItem}>
                  <View style={styles.recentIcon}>
                    <Ionicons name="trophy" size={16} color="#121212" />
                  </View>
                  <Text style={styles.recentText} numberOfLines={1}>
                    {r.title}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Filtros */}
          <View style={styles.chipsRow}>
            {["Todos", "Rutina", "Nutrición", "Constancia"].map((c) => (
              <Chip
                key={c}
                label={c}
                active={filtro === c}
                onPress={() => setFiltro(c)}
              />
            ))}
          </View>

          {/* Grid de logros */}
          <View style={{ marginTop: 8 }}>
            {filtrados.map((item) => (
              <AchievementCard
                key={item.id}
                item={item}
                onPress={() => {
                  // aquí podrías abrir un modal de detalle (UI)
                }}
              />
            ))}
          </View>

          {/* Bonus: “Misiones diarias” (UI) */}
          <View style={styles.missionsCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Misiones diarias</Text>
              <Text style={styles.timerText}>23:18:09</Text>
            </View>

            {[
              { t: "Registrar 1 comida", p: 0.0 },
              { t: "Completar 1 sesión", p: 0.6 },
              { t: "Beber 2L de agua", p: 0.3 },
            ].map((m, i) => (
              <View key={i} style={styles.missionRow}>
                <Text style={styles.missionText}>{m.t}</Text>
                <View style={{ width: 120 }}>
                  <ProgressBar value={m.p} />
                </View>
              </View>
            ))}

            <Pressable style={styles.missionBtn} onPress={() => {}}>
              <Text style={styles.missionBtnText}>Ver misiones</Text>
              <Ionicons name="arrow-forward" size={16} color="#121212" />
            </Pressable>
          </View>
        </View>

        {/* padding para que no se tape con tabbar */}
        <View style={{ height: 110 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
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
    flex: 1,
    textAlign: "center",
    color: "#F3F3F3",
    fontWeight: "bold",
    letterSpacing: 1.2,
    marginTop: 20,
    fontSize: 20,
  },

  scroll: { padding: 16 },

  profileCard: {
    backgroundColor: CARD,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: LINE,
  },
  profileTopRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatarRing: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(216,137,31,0.18)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(216,137,31,0.35)",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#202020",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: LINE,
  },
  name: { color: TEXT, fontSize: 18, fontWeight: "900", letterSpacing: 0.6 },
  metaRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  flagDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ACCENT,
    marginRight: 8,
  },
  metaText: { color: MUTED, fontSize: 12, fontWeight: "600" },
  metaSep: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.14)",
    marginHorizontal: 10,
  },

  bio: {
    color: "rgba(255,255,255,0.78)",
    marginTop: 12,
    lineHeight: 18,
    fontSize: 12,
  },

  statsCard: {
    marginTop: 14,
    backgroundColor: CARD2,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: LINE,
  },
  statItem: { flex: 1, alignItems: "center", justifyContent: "center" },
  statValue: { color: ACCENT2, fontWeight: "900", fontSize: 16 },
  statLabel: { color: MUTED, fontSize: 12, marginTop: 2, fontWeight: "600" },
  statDivider: {
    position: "absolute",
    right: -1,
    top: 6,
    bottom: 6,
    width: 1,
    backgroundColor: LINE,
  },

  editBtn: {
    marginTop: 14,
    backgroundColor: ACCENT2,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  editText: { color: "#121212", fontWeight: "900", letterSpacing: 0.4 },

  section: { marginTop: 16 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: { color: TEXT, fontSize: 16, fontWeight: "900" },
  smallLink: { flexDirection: "row", alignItems: "center", gap: 6 },
  smallLinkText: { color: ACCENT2, fontWeight: "800", fontSize: 12 },

  levelCard: {
    marginTop: 12,
    backgroundColor: CARD,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: LINE,
  },
  levelLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  levelBadge: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "rgba(242,168,59,0.18)",
    borderWidth: 1,
    borderColor: "rgba(242,168,59,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  levelBadgeText: {
    color: ACCENT2,
    fontWeight: "900",
    fontSize: 10,
    letterSpacing: 1,
  },
  levelNumber: { color: TEXT, fontWeight: "900", fontSize: 20, marginTop: 2 },
  levelTitle: { color: TEXT, fontWeight: "900", fontSize: 13 },
  levelSub: { color: MUTED, fontWeight: "700", fontSize: 12, marginTop: 3 },

  barTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: ACCENT2,
  },

  claimBtn: {
    marginTop: 12,
    height: 42,
    borderRadius: 14,
    backgroundColor: ACCENT2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  claimText: { color: "#121212", fontWeight: "900" },

  subTitle: { color: TEXT, fontWeight: "900", marginBottom: 10, marginTop: 2 },

  recentRow: { flexDirection: "row", gap: 10 },
  recentItem: {
    flex: 1,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: LINE,
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  recentIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: ACCENT2,
    alignItems: "center",
    justifyContent: "center",
  },
  recentText: { color: TEXT, fontWeight: "900", fontSize: 12, flex: 1 },

  chipsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
    flexWrap: "wrap",
  },
  chip: {
    paddingHorizontal: 12,
    height: 34,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: ACCENT2,
    borderColor: "rgba(242,168,59,0.65)",
  },
  chipInactive: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderColor: LINE,
  },
  chipText: { color: TEXT, fontWeight: "900", fontSize: 12 },

  achCard: {
    marginTop: 10,
    backgroundColor: CARD,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: LINE,
    flexDirection: "row",
    gap: 12,
  },
  achIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  achUnlocked: {
    backgroundColor: ACCENT2,
    borderColor: "rgba(242,168,59,0.65)",
  },
  achLocked: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderColor: LINE,
  },
  achTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  achTitle: {
    color: TEXT,
    fontWeight: "900",
    fontSize: 13,
    flex: 1,
    marginRight: 10,
  },
  achXp: { color: ACCENT2, fontWeight: "900", fontSize: 12 },
  achDesc: { color: MUTED, marginTop: 6, fontSize: 12, lineHeight: 16 },
  achBottomRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  achMeta: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: "700" },

  missionsCard: {
    marginTop: 16,
    backgroundColor: CARD,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: LINE,
  },
  timerText: {
    color: "rgba(255,255,255,0.55)",
    fontWeight: "800",
    fontSize: 12,
  },
  missionRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  missionText: { color: TEXT, fontWeight: "800", fontSize: 12, flex: 1 },
  missionBtn: {
    marginTop: 14,
    height: 44,
    borderRadius: 14,
    backgroundColor: ACCENT2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  missionBtnText: { color: "#121212", fontWeight: "900" },
});
