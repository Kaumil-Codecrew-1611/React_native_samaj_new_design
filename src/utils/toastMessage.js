import { Popup } from 'popup-ui'
function toastMessage(error, type = 'Danger') {
    try {
        Popup.show({
            type,
            title: error,
            button: true,
            buttonText: 'Ok',
            callback: () => Popup.hide()
        })
    } catch (error) {
        console.log(error, "Error in Toast message")
    }
};

export default toastMessage;