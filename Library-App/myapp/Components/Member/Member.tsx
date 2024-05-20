import { useContext } from "react";
import { SafeAreaView, Text, TouchableHighlight, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import GlobalContext from "../../Utils/Context";
import showConfirmation from "../../Utils/Confirmation";

import Styles from "../Styles";
import { deleteEntitie } from "../../Services/service.api";
import { MemberI } from "../../Types/Types";

interface props {
  memberData: MemberI;
  index: number;
}

function Member({ memberData, index }: props) {
  const navigation = useNavigation();
  const { members, setMembers } = useContext(GlobalContext);

  const handleNavToMemberDetails = () => {
    navigation.navigate("member-details", memberData);
  };

  const askDeleteConfirmation = () => {
    showConfirmation(
      "Delete",
      "Are you sure?",
      () => handleDelete(),
      () => {
        console.log("cancelled");
      }
    );
    const handleDelete = async () => {
      try {
        const res = await deleteEntitie("member", memberData.id);
        if (res) {
          console.log("res", res);
          const updatedMember = members.filter(
            (member) => member.id !== memberData.id
          );
          setMembers(updatedMember);
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

  const handleEdit = () => {
    navigation.navigate("update-member", memberData);
  };

  return (
    <SafeAreaView>
      <View
        style={[
          Styles.container,
          { backgroundColor: index % 2 === 0 ? "white" : "lightgrey" },
        ]}
      >
        <View style={Styles.row}>
          <View style={Styles.course}>
            <Text style={Styles.title}>
              {memberData.firstname} {memberData.lastname}
            </Text>
            <Text style={Styles.faculty}>
              {memberData.id} - {memberData.phone}
            </Text>
            <Text style={Styles.faculty}>{memberData.email}</Text>
          </View>

          <View style={Styles.edges}>
            <TouchableHighlight
              onPress={handleNavToMemberDetails}
              style={Styles.infoButton}
              underlayColor="#5398DC"
            >
              <Text style={Styles.buttonText}>Details</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={askDeleteConfirmation}
              style={Styles.deleteButton}
              underlayColor="red"
            >
              <Text style={Styles.buttonText}>Delete</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={handleEdit}
              style={Styles.editButton}
              underlayColor="Green"
            >
              <Text style={Styles.buttonText}> Edit </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Member;
