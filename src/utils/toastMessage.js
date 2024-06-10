import Toast from 'react-native-simple-toast';

function toastMessage(error) {
    try {
        Toast.show(error);
    } catch (err) {
        console.log(err, "Error in Toast message")
    }
};

export default toastMessage;