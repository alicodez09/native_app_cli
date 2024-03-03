import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
const TodoEdit = ({ modalVisible, setModalVisible, isTodo }) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const handleUpdate = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/todo/update-user-todo/${id}`, {
        title,
        description,
      });
      alert(data?.message);
      setLoading(false);
      navigation.push("MyTodo");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    setTitle(isTodo?.title);
    setDescription(isTodo?.description);
  }, [isTodo]);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update Todo</Text>
            <TextInput
              placeholder="Title"
              style={styles.inputBox}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              placeholder="Description"
              style={styles.inputBox}
              multiline={true}
              numberOfLines={4}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            <View style={styles.btnContainer}>
              <Pressable
                style={[styles.button, styles.btnUpdate]}
                onPress={() => {
                  handleUpdate(isTodo?._id), setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>
                  {loading ? "loading.." : "Update"}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.btnCancel]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 600,
  },
  button: {
    borderRadius: 10,
    backgroundColor: "blue",
    padding: 10,
    elevation: 2,
    width: 100,
    margin: 10,
  },
  buttonOpen: {
    // backgroundColor: "#F194FF",
  },
  btnUpdate: {
    backgroundColor: "green",
  },
  btnCancel: {
    backgroundColor: "crimson",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 2,
    margin: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputBox: {
    backgroundColor: "#dfe8e7",
    textAlignVertical: "top",
    paddingTop: 10,
    width: 250,
    marginTop: 30,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 10,
  },
});

export default TodoEdit;
