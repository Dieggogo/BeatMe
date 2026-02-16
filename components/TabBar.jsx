import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TabBar = ({ state, descriptors, navigation }) => {
  const primaryColor = "orange";
  const greyColor = "#9A9A9A";
  const bgColor = "#2B2B2B";

  const icons = {
    Nutricion: (color) => (
      <MaterialCommunityIcons name="food-apple" size={24} color={color} />
    ),
    Entrenamiento: (color) => (
      <MaterialCommunityIcons name="weight-lifter" size={24} color={color} />
    ),
    Progreso: (color) => (
      <MaterialCommunityIcons name="chart-line" size={24} color={color} />
    ),
    Perfil: (color) => (
      <MaterialCommunityIcons name="account" size={24} color={color} />
    ),
  };

  return (
    <View style={[styles.tabbar, { backgroundColor: bgColor }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label = options.tabBarLabel ?? options.title ?? route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;
        const color = isFocused ? primaryColor : greyColor;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            style={styles.tabbarItem}
            onPress={onPress}
            onLongPress={onLongPress}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
          >
            {icons[route.name]?.(color)}
            <Text style={[styles.label, { color }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    paddingTop: 20,
    paddingBottom: 30,
  },
  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: "bold",
  },
});

export default TabBar;
