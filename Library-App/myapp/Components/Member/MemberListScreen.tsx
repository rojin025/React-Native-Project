import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";

import Styles from "../Styles";
import { useContext, useEffect, useState } from "react";

import GlobalContext from "../../Utils/Context";
import Member from "./Member";

function MemberListScreen({ navigation }: any) {
  const { members, setMembers } = useContext(GlobalContext);

  return (
    <SafeAreaView style={Styles.container}>
      <View>
        <Text style={Styles.headerText}>Members</Text>
      </View>
      <FlatList
        data={members}
        renderItem={({ item, index }) => (
          <Member memberData={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
      />
      <Pressable
        style={Styles.button}
        onPress={() => {
          navigation.navigate("add-member");
        }}
      >
        <Text style={Styles.buttonTextPrimary}>Add Member</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default MemberListScreen;
