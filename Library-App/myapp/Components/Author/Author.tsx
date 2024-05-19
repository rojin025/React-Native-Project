import { SafeAreaView, Text, View } from "react-native";
import { AuthorI } from "../../Types/Types";
import Styles from "../Styles";

interface props {
  data: AuthorI;
  index: number;
}

function Author({ data, index }: props) {
  return (
    <SafeAreaView>
      <View style={Styles.container}>
        <Text style={Styles.title}>{data.id}</Text>
        <Text>{data.email}</Text>
        <Text>{data.name}</Text>
        <Text>{data.phone}</Text>
      </View>
    </SafeAreaView>
  );
}

export default Author;
