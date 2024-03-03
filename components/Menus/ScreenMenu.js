import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import Home from "../../screens/layouts/Home";
import { AuthContext } from "../../context/auth";
import HeaderMenu from "./HeaderMenu";
import About from "../../screens/layouts/About";
import Todo from "../../screens/layouts/Todo";
import Account from "../../screens/layouts/Account";
import MyTodo from "../../screens/layouts/MyTodo";

const ScreenMenu = () => {
  const Stack = createNativeStackNavigator();
  // global state
  const [state] = useContext(AuthContext);
  const autheticateUser = state?.user && state?.token;
  return (
    <Stack.Navigator initialRouteName="Login">
      {autheticateUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "React Native Application",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Todo"
            component={Todo}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="MyTodo"
            component={MyTodo}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenu />,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
