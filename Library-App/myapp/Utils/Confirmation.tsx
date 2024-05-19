import { Alert } from "react-native";

const showConfirmation = (
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel: () => void
) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: "Cancel",
        onPress: onCancel,
        style: "cancel",
      },
      {
        text: "OK",
        onPress: onConfirm,
      },
    ],
    { cancelable: false }
  );
};

export default showConfirmation;
