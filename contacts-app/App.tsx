import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import Home from "./Component/Home";
import Settings from "./Component/Setting";
import AddForm from "./Component/AddForm";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
            headerShown: true,
          }}
        />
        <Tab.Screen
          name="addContact"
          component={AddForm}
          options={{
            title: "Add Contact",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-plus"
                color={color}
                size={26}
              />
            ),
            headerShown: true,
          }}
        />

        <Tab.Screen
          name="settings"
          component={Settings}
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cog" color={color} size={26} />
            ),
            headerShown: true,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
