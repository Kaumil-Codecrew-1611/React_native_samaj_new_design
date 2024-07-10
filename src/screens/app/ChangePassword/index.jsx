import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import * as yup from 'yup';
import Button from '../../../components/Button';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';

const ChangePassword = ({ navigation }) => {
    const { t } = useTranslation();
    const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);
    const { allUserInfo } = useContext(GlobalContext);
    const { userChangePassword } = useContext(ApiContext);
    const [isCurrentPasswordHidden, setCurrentPasswordHidden] = useState(true);
    const [isNewPasswordHidden, setNewPasswordHidden] = useState(true);
    const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
    const [loading, setLoading] = useState(false);
    const [userId] = useState(allUserInfo._id)

    const schema = yup.object().shape({
        old_password: yup.string().required('Current password is required'),
        password: yup.string()
            .required(t('newpasswordisrequired'))
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                t('passwordmusthaveatleastoneletteronenumberandonespecialcharacter')
            ),
        cpassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required(t('confirmpasswordisrequired')),
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const requestData = {
            old_password: data.old_password,
            password: data.password,
            cpassword: data.cpassword,
            id: userId,
        };
        try {
            setLoading(true);
            const reponse = await userChangePassword(requestData);
            if (reponse.changePassStatus) {
                navigateToUserProfile()
            }
        } catch (error) {
            console.error('Error changing password:', error);
        } finally {
            setLoading(false);
        }
    };

    const navigateToUserProfile = () => {
        navigation.navigate('Profile');
    };

    const onPressCurrentPassword = () => {
        setCurrentPasswordHidden(!isCurrentPasswordHidden);
    };

    const onPressNewPassword = () => {
        setNewPasswordHidden(!isNewPasswordHidden);
    };

    const onPressConfirmPassword = () => {
        setConfirmPasswordHidden(!isConfirmPasswordHidden);
    };

    return (
        <View className="flex-1 bg-[#E9EDF7] px-2 selection: relative">
            <View className="w-full bg-white mx-2 h-[83%] pt-24 rounded-t-[30px] absolute bottom-0">
                <View className="w-full absolute top-[-60px] z-10 h-32 flex-row justify-center">
                    <View className="w-72 rounded-xl bg-[#4e63ac] h-full flex-row justify-center items-center">
                        <Text className="text-white text-xl tracking-wider font-extrabold">{t('changePassword')}</Text>
                    </View>
                </View>
                <View className="flex-1 px-8">
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        className="flex flex-1"
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                                <View className="flex-1 px-1">
                                    <View>
                                        <View className="w-full">
                                            <Text className="font-extrabold text-base tracking-wider text-black">{t('changePassword')}:</Text>
                                        </View>
                                        <View className={`w-full my-2 px-4 flex-row justify-between bg-[#F3F5F7] rounded-[15px] items-center shadow-input mx-0.5 shadow-custom-elevation shadow-md ${Platform.OS == "android" ? "shadow-black" : "border border-gray-200 shadow-sm"} `}>
                                            <Controller
                                                control={control}
                                                name="old_password"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <TextInput
                                                        placeholderTextColor={"gray"}
                                                        className={`basis-[85%] text-black ${Platform.OS == "ios" ? "p-3" : ""} pl-[10px]`}
                                                        placeholder={t('currentpassword')}
                                                        onBlur={onBlur}
                                                        onChangeText={onChange}
                                                        value={value}
                                                        secureTextEntry={isCurrentPasswordHidden}
                                                    />
                                                )}
                                            />
                                            <View>
                                                <Pressable onPress={onPressCurrentPassword}>
                                                    <AnimatedFeatherIcon
                                                        name={isCurrentPasswordHidden ? "eye" : "eye-off"}
                                                        size={25}
                                                        color="black"
                                                    />
                                                </Pressable>
                                            </View>
                                        </View>
                                        {errors.old_password && <Text className="text-red-500">{errors.old_password.message}</Text>}
                                    </View>
                                    <View className="my-5">
                                        <View className="w-full">
                                            <Text className="font-extrabold text-base tracking-wider text-black">{t('newPassword')}:</Text>
                                        </View>
                                        <View className={`w-full my-2 px-4 flex-row justify-between bg-[#F3F5F7] rounded-[15px] items-center shadow-input mx-0.5 shadow-custom-elevation shadow-md ${Platform.OS == "android" ? "shadow-black" : "border border-gray-200 shadow-sm"} `}>
                                            <Controller
                                                control={control}
                                                name="password"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <TextInput
                                                        placeholderTextColor={"gray"}
                                                        className={`basis-[85%] text-black ${Platform.OS == "ios" ? "p-3" : ""} pl-[10px]`}
                                                        placeholder={t('newPassword')}
                                                        onBlur={onBlur}
                                                        onChangeText={onChange}
                                                        value={value}
                                                        secureTextEntry={isNewPasswordHidden}
                                                    />
                                                )}
                                            />
                                            <View>
                                                <Pressable onPress={onPressNewPassword}>
                                                    <AnimatedFeatherIcon
                                                        name={isNewPasswordHidden ? "eye" : "eye-off"}
                                                        size={25}
                                                        color="black"
                                                    />
                                                </Pressable>
                                            </View>
                                        </View>
                                        {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
                                    </View>
                                    <View>
                                        <View className="w-full">
                                            <Text className="font-extrabold text-base tracking-wider text-black">{t('confirmpassword')}:</Text>
                                        </View>
                                        <View className={`w-full my-2 px-4 flex-row justify-between bg-[#F3F5F7] rounded-[15px] items-center shadow-input mx-0.5 shadow-custom-elevation shadow-md ${Platform.OS == "android" ? "shadow-black" : "border border-gray-200 shadow-sm"} `}>
                                            <Controller
                                                control={control}
                                                name="cpassword"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <TextInput
                                                        placeholder={t('confirmpassword')}
                                                        onBlur={onBlur}
                                                        onChangeText={onChange}
                                                        value={value}
                                                        placeholderTextColor={"gray"}
                                                        className={`basis-[85%] text-black ${Platform.OS == "ios" ? "p-3" : ""} pl-[10px]`}
                                                        secureTextEntry={isConfirmPasswordHidden}
                                                    />
                                                )}
                                            />
                                            <View>
                                                <Pressable onPress={onPressConfirmPassword}>
                                                    <AnimatedFeatherIcon
                                                        name={isConfirmPasswordHidden ? "eye" : "eye-off"}
                                                        size={25}
                                                        color="black"
                                                    />
                                                </Pressable>
                                            </View>
                                        </View>
                                        {errors.cpassword && <Text className="text-red-500">{errors.cpassword.message}</Text>}
                                    </View>
                                </View>
                            </ScrollView>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                    <View className="mb-16">

                        {loading ? (
                            <View className="flex flex-row items-center justify-center bg-[#4e63ac] py-4 cursor-pointer p-4 rounded-lg">
                                <Text className="mr-4 text-lg font-bold text-white ">{t("Loading")}</Text>
                                <ActivityIndicator size="small" color="white" />
                            </View>
                        ) : (
                            <Button className="bg-[#4e63ac] py-4 rounded-lg" title={t('changePassword')} disabled={loading} onPress={handleSubmit(onSubmit)} />
                        )}

                    </View>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    backdrop: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,  // You can adjust these values as needed
            height: 0, // You can adjust these values as needed
        },
        shadowOpacity: 0.35,  // Increase the opacity for a more prominent shadow
        shadowRadius: 3.34,  // Adjust the radius for a more spread-out shadow
        elevation: 7,  // Elevation for Android shadow
    },

});
export default ChangePassword;