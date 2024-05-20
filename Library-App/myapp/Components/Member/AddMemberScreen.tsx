import React, { useContext, useState } from "react";
import { Pressable, SafeAreaView, Text, TextInput, View } from "react-native";

import GlobalContext from "../../Utils/Context";

import Styles from "../Styles";
import { createEntitie } from "../../Services/service.api";

const initialMember = {
  id: "",
  residentID: "",
  firstname: "",
  lastname: "",
  address: "",
  phone: "",
  email: "",
};

function AddMemberScreen({ navigation }: any) {
  const { members, setMembers } = useContext(GlobalContext);
  const [member, setMember] = useState(initialMember);

  const handleAdd = async () => {
    const index = members.findIndex(
      (current) =>
        current.id.trim().toLowerCase() === member.id.trim().toLowerCase()
    );
    if (index === -1) {
      try {
        const res = await createEntitie("member", member);
        if (res) {
          setMembers([...members, res]);
          console.log("Added member:", res);
          navigation.goBack();
        }
      } catch (error) {}
    }
    console.log("Publisher unable to add:", member);
  };

  return (
    <SafeAreaView style={Styles.container}>
      <Text style={Styles.headerText}>Add members</Text>
      <TextInput
        placeholder="First Name:"
        style={Styles.input}
        value={member.firstname}
        onChangeText={(text) =>
          setMember((prev) => ({
            ...prev,
            firstname: text,
          }))
        }
      />
      <TextInput
        placeholder="Last Name:"
        style={Styles.input}
        value={member.lastname}
        onChangeText={(text) =>
          setMember((prev) => ({
            ...prev,
            lastname: text,
          }))
        }
      />
      <TextInput
        placeholder="ID:"
        style={Styles.input}
        value={member.id}
        onChangeText={(text) => setMember((prev) => ({ ...prev, id: text }))}
      />
      <TextInput
        placeholder="ResidentID:"
        style={Styles.input}
        value={member.residentID}
        onChangeText={(text) =>
          setMember((prev) => ({ ...prev, residentID: text }))
        }
      />

      <TextInput
        placeholder="Phone:"
        style={Styles.input}
        value={member.phone}
        onChangeText={(text) => setMember((prev) => ({ ...prev, phone: text }))}
      />
      <TextInput
        placeholder="Email:"
        style={Styles.input}
        value={member.email}
        onChangeText={(text) => setMember((prev) => ({ ...prev, email: text }))}
      />
      <TextInput
        placeholder="Full Address: street address, City, STATE"
        style={[Styles.input, { height: 100 }]}
        value={member.address}
        multiline
        onChangeText={(text) =>
          setMember((prev) => ({ ...prev, address: text }))
        }
      />
      <Pressable style={Styles.button} onPress={handleAdd}>
        <Text style={Styles.buttonText}>Add</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default AddMemberScreen;
