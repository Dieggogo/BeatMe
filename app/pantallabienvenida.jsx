import {
  HoltwoodOneSC_400Regular,
  useFonts,
} from "@expo-google-fonts/holtwood-one-sc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, SplashScreen } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

SplashScreen.preventAutoHideAsync();

const ONBOARDING_SEEN_KEY = "@beatme_onboarding_seen";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SLIDES = [
  {
    id: "1",
    image: require("../assets/images/food.png"),
    title: "Alimentate mejor\ny alcanza tus metas",
  },
  {
    id: "2",
    image: require("../assets/images/gym.png"),
    title: "Entrena, mejora\ny supera tu mejor version",
  },
];

export default function PantallaBienvenida() {
  const [fontsLoaded] = useFonts({
    HoltwoodOneSC_400Regular,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef(null);

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  const onStart = async () => {
    if (currentIndex < SLIDES.length - 1) {
      listRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      return;
    }

    await AsyncStorage.setItem(ONBOARDING_SEEN_KEY, "true");
    router.replace("/auth/login");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        decelerationRate="fast"
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
        onMomentumScrollEnd={(event) => {
          const { x } = event.nativeEvent.contentOffset;
          const { width } = event.nativeEvent.layoutMeasurement;
          setCurrentIndex(Math.round(x / width));
        }}
        renderItem={({ item }) => (
          <ImageBackground source={item.image} style={styles.slide}>
            <View style={styles.overlay} />

            <View style={styles.content}>
              <View style={styles.header}>
                <Image
                  source={require("../assets/images/logo.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <Text style={styles.tagline}>COMPITE CONTIGO MISMO</Text>
              </View>

              <Text style={styles.title}>{item.title}</Text>

              <View style={styles.footer}>
                <View style={styles.dots}>
                  {SLIDES.map((slide, index) => (
                    <View
                      key={slide.id}
                      style={[
                        styles.dot,
                        index === currentIndex && styles.dotActive,
                      ]}
                    />
                  ))}
                </View>

                <Pressable style={styles.button} onPress={onStart}>
                  <Text style={styles.buttonText}>Comenzar</Text>
                </Pressable>
              </View>
            </View>
          </ImageBackground>
        )}
      />
    </SafeAreaView>
  );
}

const ORANGE = "#ff7a00";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000" },
  slide: { width: SCREEN_WIDTH, flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 68,
    paddingBottom: 24,
  },
  header: { alignItems: "center" },
  logo: { width: 250, height: 62 },
  tagline: {
    marginTop: 6,
    color: "#fff",
    fontSize: 11,
    letterSpacing: 1.1,
    fontFamily: "HoltwoodOneSC_400Regular",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 33,
    marginTop: 90,
  },
  footer: { gap: 16 },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  dotActive: {
    backgroundColor: "#fff",
  },
  button: {
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ORANGE,
  },
  buttonText: {
    color: "#141414",
    fontSize: 17,
    fontWeight: "800",
  },
});
