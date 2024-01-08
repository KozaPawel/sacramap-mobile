import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import MapScreen from "./screens/MapScreen";
import SearchScreen from "./screens/SearchScreen";
import ProfileScreen from "./screens/ProfileScreen";
import VisitedPlacesScreen from "./screens/VisitedPlacesScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { Colors } from "./constants/colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.background },
        headerTintColor: Colors.text,
        contentStyle: { backgroundColor: Colors.background },
        animation: "fade",
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function MapStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.background },
        headerTintColor: Colors.text,
        contentStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.text,
      }}
      initialRouteName="MapTab"
    >
      <Tab.Screen
        name="MapTab"
        options={{
          title: "Map",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="map" solid color={color} size={size} />
          ),
        }}
        component={MapStack}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerRightContainerStyle: { paddingRight: 15 },
          headerRight: ({ tintColor }) => (
            <FontAwesome5
              name="sign-out-alt"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" solid color={color} size={size} />
          ),
          unmountOnBlur: true,
        }}
        component={ProfileScreen}
      />
      <Tab.Screen
        name="VisitedPlaces"
        options={{
          title: "Visited Places",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5
              name="map-marked-alt"
              solid
              color={color}
              size={size}
            />
          ),
          unmountOnBlur: true,
        }}
        component={VisitedPlacesScreen}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      await SplashScreen.preventAutoHideAsync();

      const storedToken = await AsyncStorage.getItem("token");
      const storedRefreshToken = await AsyncStorage.getItem("refreshToken");

      if (storedToken && storedRefreshToken) {
        authCtx.authenticate(storedToken, storedRefreshToken);
      }

      SplashScreen.hideAsync();
    }

    fetchToken();
  }, []);

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />

      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
