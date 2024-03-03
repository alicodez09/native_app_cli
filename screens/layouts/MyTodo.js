import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import FooterMenu from "../../components/Menus/FooterMenu";
import axios from "axios";
import TodoCard from "./TodoCard";

const MyTodo = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get User Todos
  const GetUserTodos = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/todo/get-user-todo`);
      setLoading(false);
      setTodos(data?.userTodos);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    GetUserTodos();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <TodoCard todos={todos} myTodoScreen={true} />
        {/* <Text>{JSON.stringify(todos, null, 4)}</Text> */}
      </ScrollView>
      <View style={{ backgroundColor: "#ffffff" }}>
        <FooterMenu />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: 10,
  },
});
export default MyTodo;
