import { useContext, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import GlobalContext from "../../Utils/Context";
import { updatePublisher } from "../../Services/publisher.api";

import Styles from "../Styles";

function UpdateMemberScreen({ navigation, route }: any) {
  const [publisher, setPublisher] = useState(route.params);
  const { publishers, setPublishers } = useContext(GlobalContext);

  const handleUpdate = async () => {
    console.log("Update:", publisher);
    try {
      const res = await updatePublisher(publisher.id, publisher);
      if (res) {
        const index = publishers.findIndex(
          (currAuth) => currAuth.id === publisher.id
        );
        if (index !== -1) {
          const updatedpublishers = [...publishers];
          updatedpublishers[index] = res;
          setPublishers([]);
          setPublishers(updatedpublishers);
          navigation.goBack();
        }
      }
    } catch (error) {
      console.error("Error updating Publisher:", error);
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.headerText}>Add Publishers</Text>
      <TextInput
        placeholder="Name:"
        style={Styles.input}
        value={publisher.name}
        onChangeText={(text) => setPublisher({ ...publisher, name: text })}
      />
      <TextInput
        placeholder="ID:"
        style={[Styles.input, { color: "lightgray" }]}
        editable={false}
        value={publisher.id}
        onChangeText={(text) => setPublisher({ ...publisher, id: text })}
      />
      <TextInput
        placeholder="Phone:"
        style={Styles.input}
        value={publisher.phone}
        onChangeText={(text) => setPublisher({ ...publisher, phone: text })}
      />
      <TextInput
        placeholder="Email:"
        style={Styles.input}
        value={publisher.email}
        onChangeText={(text) => setPublisher({ ...publisher, email: text })}
      />
      <Pressable style={Styles.button} onPress={handleUpdate}>
        <Text style={Styles.buttonTextPrimary}>Update</Text>
      </Pressable>
    </View>
  );
}

export default UpdateMemberScreen;
