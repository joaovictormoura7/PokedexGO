import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokedexScreen from "../Telas/Pokedex";
import PokemonScreen from "../Telas/Pokemon";

const Stack = createNativeStackNavigator();

export default function NavigationPokedex() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Pokedex"
        component={PokedexScreen}

        options={{
          title: "Pokedex",
          headerStyle: {
            backgroundColor: "#1ff2d6",
            
          },

          headerTitleStyle: {
            fontWeight: "bold",
            color: "#fff",
          },
        }}
      />
      <Stack.Screen
        name="Pokemon"
        component={PokemonScreen}
        options={{ title: "", headerTransparent: true }}
      />
    </Stack.Navigator>
  );
}

