import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import FooterMenu from "../../components/Menus/FooterMenu";
import axios from "axios";
import { TodoContext } from "../../context/todo";

const Todo = ({ navigation }) => {
  // context
  const [todos, setTodos] = useContext(TodoContext);
  // states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const handleTodo = async () => {
    try {
      setLoading(true);
      if (!title || !description) {
        alert("Please fill all the fields");
      }
      const { data } = await axios.post("/todo/create-todo", {
        title,
        description,
      });
      setLoading(false);
      setTodos([...todos, data?.todos]);
      alert(data?.message);
      navigation.navigate("Home");
    } catch (error) {
      alert(error.response.data.message || error.message);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.heading}>Create a Todo</Text>
          <TextInput
            placeholder="Enter todo title"
            style={styles.inputBox}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            placeholder="Enter todo description"
            style={styles.inputBox}
            numberOfLines={5}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.todoBtn} onPress={handleTodo}>
            <Text style={styles.todoBtnText}>
              {loading ? "Loading.." : "Submit"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterMenu />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
    marginTop: 40,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  inputBox: {
    backgroundColor: "#dfe8e7",
    textAlignVertical: "top",
    paddingTop: 10,
    width: 300,
    marginTop: 30,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 10,
  },
  todoBtn: {
    backgroundColor: "orange",
    width: 300,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 10,
  },
  todoBtnText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
});
export default Todo;
