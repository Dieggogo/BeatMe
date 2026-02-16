import { Tabs } from "expo-router";
import TabBar from "../../components/TabBar";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="Nutricion/index" options={{ title: "Nutricion" }} />
      <Tabs.Screen
        name="Entrenamiento/index"
        options={{ title: "Entrenamiento" }}
      />
      <Tabs.Screen name="Progreso/index" options={{ title: "Progreso" }} />
      <Tabs.Screen name="Perfil/index" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
