import { useContext, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import GlobalContext from "../../Utils/Context";

import Styles from "../Styles";
import { updateEntitie } from "../../Services/service.api";
import { MemberI } from "../../Types/Types";

function UpdateMemberScreen({ navigation, route }: any) {
  const [member, setMember] = useState<MemberI>(route.params);
  const { members, setMembers } = useContext(GlobalContext);

  const handleUpdate = async () => {
    console.log("Update:", member);
    try {
      const res = await updateEntitie("member", member.id, member);
      if (res) {
        const index = members.findIndex(
          (currAuth) => currAuth.id === member.id
        );
        if (index !== -1) {
          const updatedMembers = [...members];
          updatedMembers[index] = res;
          setMembers([]);
          setMembers(updatedMembers);
          navigation.goBack();
        }
      }
    } catch (error) {
      console.error("Error updating Publisher:", error);
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.headerText}>Update Publishers</Text>
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
      <Pressable style={Styles.button} onPress={handleUpdate}>
        <Text style={Styles.buttonTextPrimary}>Update</Text>
      </Pressable>
    </View>
  );
}

export default UpdateMemberScreen;
