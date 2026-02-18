import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const TABBAR_HEIGHT = 90;
const ORANGE = "#ff7a00";

const RANGE = [
  { key: "week", label: "Semanal" },
  { key: "month", label: "Mensual" },
  { key: "q", label: "3 meses" },
  { key: "h", label: "6 meses" },
  { key: "year", label: "Anual" },
];

// Mock: barras (0-100)
const MOCK = {
  week: {
    trainTitle: "4 horas esta semana",
    train: [
      { label: "dic 28", v: 45 },
      { label: "ene 4", v: 70 },
      { label: "ene 11", v: 35 },
      { label: "ene 18", v: 55 },
      { label: "ene 25", v: 15 },
      { label: "feb 1", v: 60 },
    ],
    nutTitle: "24,456 kcal esta semana",
    nut: [
      { label: "dic 28", v: 40 },
      { label: "ene 4", v: 55 },
      { label: "ene 11", v: 50 },
      { label: "ene 18", v: 38 },
      { label: "ene 25", v: 72 },
      { label: "feb 1", v: 88 },
    ],
  },
  month: {
    trainTitle: "18 horas este mes",
    train: [
      { label: "ene", v: 45 },
      { label: "feb", v: 65 },
      { label: "mar", v: 30 },
      { label: "abr", v: 55 },
      { label: "may", v: 45 },
      { label: "jun", v: 65 },
      { label: "jul", v: 30 },
      { label: "ago", v: 55 },
      { label: "sep", v: 45 },
      { label: "oct", v: 65 },
      { label: "nov", v: 30 },
      { label: "dic", v: 55 },
    ],
    nutTitle: "92,120 kcal este mes",
    nut: [
      { label: "ene", v: 45 },
      { label: "feb", v: 65 },
      { label: "mar", v: 30 },
      { label: "abr", v: 55 },
      { label: "may", v: 45 },
      { label: "jun", v: 65 },
      { label: "jul", v: 30 },
      { label: "ago", v: 55 },
      { label: "sep", v: 45 },
      { label: "oct", v: 65 },
      { label: "nov", v: 30 },
      { label: "dic", v: 55 },
    ],
  },
  q: {
    trainTitle: "62 horas (3 meses)",
    train: [
      { label: "ene-mar", v: 60 },
      { label: "abr-jun", v: 45 },
      { label: "jul-sep", v: 75 },
      { label: "oct-dic", v: 45 },
    ],
    nutTitle: "278,400 kcal (3 meses)",
    nut: [
      { label: "ene-mar", v: 55 },
      { label: "abr-jun", v: 48 },
      { label: "jul-sep", v: 82 },
      { label: "oct-dic", v: 75 },
    ],
  },
  h: {
    trainTitle: "128 horas (6 meses)",
    train: [
      { label: "M1", v: 55 },
      { label: "M2", v: 62 },
      { label: "M3", v: 40 },
      { label: "M4", v: 70 },
      { label: "M5", v: 58 },
      { label: "M6", v: 78 },
    ],
    nutTitle: "520,900 kcal (6 meses)",
    nut: [
      { label: "M1", v: 45 },
      { label: "M2", v: 62 },
      { label: "M3", v: 50 },
      { label: "M4", v: 70 },
      { label: "M5", v: 64 },
      { label: "M6", v: 86 },
    ],
  },
  year: {
    trainTitle: "280 horas este año",
    train: [
      { label: "Ene", v: 55 },
      { label: "Feb", v: 62 },
      { label: "Mar", v: 40 },
      { label: "Abr", v: 70 },
      { label: "May", v: 58 },
      { label: "Jun", v: 78 },
      { label: "Jul", v: 65 },
      { label: "Ago", v: 72 },
      { label: "Sep", v: 60 },
      { label: "Oct", v: 66 },
      { label: "Nov", v: 48 },
      { label: "Dic", v: 75 },
    ],
    nutTitle: "1,220,000 kcal este año",
    nut: [
      { label: "Ene", v: 40 },
      { label: "Feb", v: 52 },
      { label: "Mar", v: 46 },
      { label: "Abr", v: 70 },
      { label: "May", v: 62 },
      { label: "Jun", v: 88 },
      { label: "Jul", v: 64 },
      { label: "Ago", v: 80 },
      { label: "Sep", v: 58 },
      { label: "Oct", v: 72 },
      { label: "Nov", v: 50 },
      { label: "Dic", v: 82 },
    ],
  },
};

// Calendario (Febrero 2026)
const YEAR = 2026;
const MONTH_INDEX = 1; // Feb
const MONTH_NAME = "FEBRERO 2026";
const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const TRAINED_DAYS = new Set([2, 3, 5, 6, 9, 10, 12, 16, 18, 20, 23, 24, 26]);

function buildMonthMatrix(year, monthIndex) {
  const first = new Date(year, monthIndex, 1);
  const last = new Date(year, monthIndex + 1, 0);
  const daysInMonth = last.getDate();
  const startDow = first.getDay();

  const weeks = [];
  let day = 1;

  let week = new Array(7).fill(null).map(() => ({ day: null, inMonth: false }));
  for (let i = 0; i < startDow; i++) week[i] = { day: null, inMonth: false };
  for (let i = startDow; i < 7; i++) {
    week[i] = { day, inMonth: true };
    day++;
  }
  weeks.push(week);

  while (day <= daysInMonth) {
    const w = new Array(7)
      .fill(null)
      .map(() => ({ day: null, inMonth: false }));
    for (let i = 0; i < 7 && day <= daysInMonth; i++) {
      w[i] = { day, inMonth: true };
      day++;
    }
    weeks.push(w);
  }

  while (weeks.length < 5) {
    weeks.push(
      new Array(7).fill(null).map(() => ({ day: null, inMonth: false })),
    );
  }

  return weeks;
}

const BarChart = ({ data }) => {
  const max = Math.max(...data.map((d) => d.v), 1);

  return (
    <View style={styles.chartWrap}>
      <View style={styles.grid}>
        {[1, 0.75, 0.5, 0.25].map((_, idx) => (
          <View key={idx} style={styles.gridLine} />
        ))}
      </View>

      <View style={styles.barsRow}>
        {data.map((d, idx) => {
          const h = (d.v / max) * 120;
          return (
            <View key={idx} style={styles.barItem}>
              <View style={[styles.bar, { height: h }]} />
              <Text style={styles.barLabel}>{d.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const RangeMenu = ({ open, onClose, onSelect, selectedKey, anchorLabel }) => {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <Pressable style={styles.menu} onPress={() => {}}>
          <Text style={styles.menuTitle}>Rango</Text>

          {RANGE.map((opt) => {
            const active = opt.key === selectedKey;
            return (
              <Pressable
                key={opt.key}
                onPress={() => {
                  onSelect(opt.key);
                  onClose();
                }}
                style={[styles.menuItem, active && styles.menuItemActive]}
              >
                <Text
                  style={[
                    styles.menuItemTxt,
                    active && styles.menuItemTxtActive,
                  ]}
                >
                  {opt.label}
                </Text>
                {active && (
                  <Ionicons name="checkmark" size={18} color="#141414" />
                )}
              </Pressable>
            );
          })}

          <View style={styles.menuHintRow}>
            <Text style={styles.menuHint}>Seleccionado:</Text>
            <Text style={styles.menuHintStrong}>{anchorLabel}</Text>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default function Progreso() {
  const weeks = useMemo(() => buildMonthMatrix(YEAR, MONTH_INDEX), []);

  // ✅ Rangos independientes por tarjeta
  const [rangeTrain, setRangeTrain] = useState("week");
  const [rangeNut, setRangeNut] = useState("week");

  // Menús
  const [menuTrain, setMenuTrain] = useState(false);
  const [menuNut, setMenuNut] = useState(false);

  const train = MOCK[rangeTrain];
  const nut = MOCK[rangeNut];

  const labelFromKey = (k) =>
    RANGE.find((x) => x.key === k)?.label ?? "Semanal";

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>PROGRESO</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: TABBAR_HEIGHT + 24 }}
        >
          {/* ================== CARD ENTRENAMIENTO ================== */}
          <View style={styles.card}>
            <View style={styles.cardTopRow}>
              <View>
                <Text style={styles.cardSectionTitle}>ENTRENAMIENTO</Text>
                <Text style={styles.cardTitle}>{train.trainTitle}</Text>
              </View>

              <Pressable
                onPress={() => setMenuTrain(true)}
                style={({ pressed }) => [
                  styles.rangeBtn,
                  pressed && { opacity: 0.9 },
                ]}
              >
                <Text style={styles.rangeBtnTxt}>
                  {labelFromKey(rangeTrain)}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={16}
                  color="rgba(255,255,255,0.85)"
                />
              </Pressable>
            </View>

            <BarChart data={train.train} />

            {/* Menú rango (entrenamiento) */}
            <RangeMenu
              open={menuTrain}
              onClose={() => setMenuTrain(false)}
              onSelect={setRangeTrain}
              selectedKey={rangeTrain}
              anchorLabel={labelFromKey(rangeTrain)}
            />
          </View>

          {/* ================== CARD NUTRICIÓN ================== */}
          <View style={styles.card}>
            <View style={styles.cardTopRow}>
              <View>
                <Text style={styles.cardSectionTitle}>NUTRICIÓN</Text>
                <Text style={styles.cardTitle}>{nut.nutTitle}</Text>
              </View>

              <Pressable
                onPress={() => setMenuNut(true)}
                style={({ pressed }) => [
                  styles.rangeBtn,
                  pressed && { opacity: 0.9 },
                ]}
              >
                <Text style={styles.rangeBtnTxt}>{labelFromKey(rangeNut)}</Text>
                <Ionicons
                  name="chevron-down"
                  size={16}
                  color="rgba(255,255,255,0.85)"
                />
              </Pressable>
            </View>

            <BarChart data={nut.nut} />

            {/* Menú rango (nutrición) */}
            <RangeMenu
              open={menuNut}
              onClose={() => setMenuNut(false)}
              onSelect={setRangeNut}
              selectedKey={rangeNut}
              anchorLabel={labelFromKey(rangeNut)}
            />
          </View>

          {/* ================== CALENDARIO ================== */}
          <View style={styles.calendarCard}>
            <View style={styles.calendarHeader}>
              <Text style={styles.calendarTitle}>CALENDARIO</Text>
              <Text style={styles.calendarMonth}>{MONTH_NAME}</Text>
            </View>

            <View style={styles.streakRow}>
              <View style={styles.streakPill}>
                <Text style={styles.streakIcon}>🔥</Text>
                <Text style={styles.streakTxt}>Racha de días 20 días</Text>
              </View>
              <View style={styles.streakPill}>
                <Text style={styles.streakIcon}>🌙</Text>
                <Text style={styles.streakTxt}>0 días de descanso</Text>
              </View>
            </View>

            <View style={styles.weekHeader}>
              {WEEKDAYS.map((d) => (
                <Text key={d} style={styles.weekDay}>
                  {d}
                </Text>
              ))}
            </View>

            <View style={styles.monthGrid}>
              {weeks.map((w, wi) => (
                <View key={wi} style={styles.weekRow}>
                  {w.map((cell, ci) => {
                    const inMonth = cell.inMonth && cell.day != null;
                    const trained = inMonth && TRAINED_DAYS.has(cell.day);

                    return (
                      <Pressable
                        key={`${wi}-${ci}`}
                        disabled={!inMonth}
                        onPress={() => {
                          const date = `${YEAR}-${String(
                            MONTH_INDEX + 1,
                          ).padStart(
                            2,
                            "0",
                          )}-${String(cell.day).padStart(2, "0")}`;

                          router.push({
                            pathname: "/tabs/Progreso/dia",
                            params: { date, trained: trained ? "1" : "0" },
                          });
                        }}
                        style={[
                          styles.dayCell,
                          !inMonth && styles.dayCellDisabled,
                          trained && styles.dayCellTrained,
                        ]}
                      >
                        <Text
                          style={[
                            styles.dayTxt,
                            !inMonth && styles.dayTxtDisabled,
                            trained && styles.dayTxtTrained,
                          ]}
                        >
                          {inMonth ? cell.day : ""}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              ))}
            </View>

            <Text style={styles.calendarHint}>
              Toca una fecha para ver el detalle del día.
            </Text>
          </View>
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
    flex: 1,
    textAlign: "center",
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

  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },
  cardSectionTitle: {
    color: "rgba(255,255,255,0.75)",
    fontWeight: "900",
    letterSpacing: 1.0,
    fontSize: 11,
  },
  cardTitle: { color: "#F3F3F3", fontWeight: "900", marginTop: 4 },

  rangeBtn: {
    height: 32,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  rangeBtnTxt: {
    color: "rgba(255,255,255,0.9)",
    fontWeight: "900",
    fontSize: 11,
  },

  chartWrap: {
    height: 160,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.15)",
    padding: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  grid: {
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: 12,
    paddingVertical: 16,
    justifyContent: "space-between",
  },
  gridLine: { height: 1, backgroundColor: "rgba(255,255,255,0.12)" },

  barsRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingTop: 8,
  },
  barItem: { alignItems: "center", justifyContent: "flex-end", width: 30 },
  bar: { width: 10, borderRadius: 10, backgroundColor: "#66e6ff" },
  barLabel: { marginTop: 6, fontSize: 10, color: "rgba(255,255,255,0.75)" },

  /* ===== Modal Menu ===== */
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    padding: 16,
    justifyContent: "center",
  },
  menu: {
    backgroundColor: "#1b1b1b",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  menuTitle: { color: "#F3F3F3", fontWeight: "900", marginBottom: 10 },
  menuItem: {
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  menuItemActive: {
    backgroundColor: ORANGE,
    borderColor: "rgba(255,255,255,0.0)",
  },
  menuItemTxt: { color: "#F3F3F3", fontWeight: "900" },
  menuItemTxtActive: { color: "#141414" },
  menuHintRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  menuHint: {
    color: "rgba(255,255,255,0.65)",
    fontWeight: "800",
    fontSize: 12,
  },
  menuHintStrong: { color: "#F3F3F3", fontWeight: "900", fontSize: 12 },

  /* ===== Calendar ===== */
  calendarCard: {
    marginTop: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "rgba(70,70,70,0.45)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 14,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 10,
  },
  calendarTitle: { color: "#F3F3F3", fontWeight: "900" },
  calendarMonth: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 12,
    fontWeight: "800",
  },

  streakRow: { flexDirection: "row", gap: 10, marginBottom: 12 },
  streakPill: {
    flex: 1,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  streakIcon: { fontSize: 14 },
  streakTxt: { color: "#F3F3F3", fontSize: 11, fontWeight: "900" },

  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  weekDay: {
    width: 36,
    textAlign: "center",
    color: "rgba(255,255,255,0.65)",
    fontSize: 11,
  },

  monthGrid: { gap: 8 },
  weekRow: { flexDirection: "row", justifyContent: "space-between" },

  dayCell: {
    width: 36,
    height: 32,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  dayCellDisabled: { backgroundColor: "transparent" },
  dayCellTrained: { backgroundColor: ORANGE },

  dayTxt: { color: "#FFF", fontSize: 12, fontWeight: "900" },
  dayTxtDisabled: { color: "transparent" },
  dayTxtTrained: { color: "#141414" },

  calendarHint: {
    marginTop: 12,
    color: "rgba(255,255,255,0.65)",
    fontSize: 12,
    textAlign: "center",
  },
});
