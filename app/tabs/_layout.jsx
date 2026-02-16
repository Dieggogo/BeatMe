import { Tabs } from "expo-router";
import TabBar from "../../components/TabBar";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // ✅ quita la barra blanca de arriba
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="Nutricion" options={{ title: "Nutricion" }} />
      <Tabs.Screen name="Entrenamiento" options={{ title: "Entrenamiento" }} />
      <Tabs.Screen name="Progreso" options={{ title: "Progreso" }} />
      <Tabs.Screen name="Perfil" options={{ title: "Perfil" }} />
    </Tabs>
  );
};

export default _layout;
