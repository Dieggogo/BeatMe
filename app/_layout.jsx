import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="pantallabienvenida" />
      <Stack.Screen name="crearrutina" />
      <Stack.Screen name="tabs" />
      <Stack.Screen name="auth/register" />
    </Stack>
  );
}
