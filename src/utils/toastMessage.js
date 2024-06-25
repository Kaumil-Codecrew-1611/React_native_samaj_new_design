// import Toast from 'react-native-simple-toast';
import { Popup } from 'popup-ui'
function toastMessage(error, type = 'Danger') {
    try {
        // Toast.show(error);
        Popup.show({
            type,
            title: error,
            button: true,
            buttonText: 'Ok',
            callback: () => Popup.hide()
        })
    } catch (err) {
        console.log(err, "Error in Toast message")
    }
};

export default toastMessage;