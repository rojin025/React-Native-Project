import { useContext } from "react";
import { SafeAreaView, Text, TouchableHighlight, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import GlobalContext from "../../Utils/Context";
import showConfirmation from "../../Utils/Confirmation";
import { PublisherI } from "../../Types/Types";

import Styles from "../Styles";
import { deletePublisher } from "../../Services/publisher.api";

interface props {
  publisherData: PublisherI;
  index: number;
}

function Publisher({ publisherData, index }: props) {
  const navigation = useNavigation();
  const { publishers, setPublishers } = useContext(GlobalContext);

  const handleNavToPublisherDetails = () => {
    navigation.navigate("publisher-details", publisherData);
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
        const res = await deletePublisher(publisherData.id);
        if (res) {
          console.log("res", res);
          const updatedPublishers = publishers.filter(
            (publisher) => publisher.id !== publisherData.id
          );
          setPublishers(updatedPublishers);
        }
      } catch (error) {}
    };
  };

  const handleEdit = () => {
    navigation.navigate("update-publisher", publisherData);
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
            <Text style={Styles.title}>{publisherData.name}</Text>
            <Text style={Styles.faculty}>
              {publisherData.id} - {publisherData.phone}
            </Text>
            <Text style={Styles.faculty}>{publisherData.email}</Text>
          </View>

          <View style={Styles.edges}>
            <TouchableHighlight
              onPress={handleNavToPublisherDetails}
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

export default Publisher;
