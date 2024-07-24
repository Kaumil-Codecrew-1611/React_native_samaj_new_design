import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import * as yup from 'yup';
import Button from '../../../components/Button';
import ApiContext from '../../../context/ApiContext';

const ForgotPassword = ({ navigation }) => {

    const { t } = useTranslation();
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [isEmailValid, setEmailValid] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isNewPasswordValid, setNewPasswordValid] = useState(false);
    const [emailForgotPassword, setEmailForgotPassword] = useState('');
    const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);
    const [isCurrentPasswordHidden, setCurrentPasswordHidden] = useState(true);
    const [isConfirmPasswordHidden, setCOnfirmPasswordHidden] = useState(true);
    const { sendOTPForgotPassword, checkOtpForForgotPassword, forgotPasswordApi } = useContext(ApiContext);

    const schema = yup.object().shape({

        EnterEmail: yup.string().required(t('EmailIsRequired')).email(t('Invalidemailaddress')),

        otp: yup.string().when('isEmailValid', {
            is: true,
            then: yup.string().required(t('OTPisrequired')),
        }),

        newPassword: yup.string().when('isNewPasswordValid', {
            is: true,
            then: yup.string()
                .required(t('NewPasswordIsRequired'))
                .min(8, t('PasswordMinLength'))
                .matches(/[a-zA-Z]/, t('PasswordContainsLetter'))
                .matches(/[0-9]/, t('PasswordContainsNumber')),
        }),

        confirmPassword: yup.string().when('isNewPasswordValid', {
            is: true,
            then: yup.string()
                .required(t('ConfirmPasswordIsRequired'))
                .oneOf([yup.ref('newPassword')], t('PasswordsMustMatch')),
        }),
    });

    const { control, getValues, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            EnterEmail: '',
            otp: '',
            newPassword: '',
            confirmPassword: '',
        }
    });

    const onSubmit = async (data, key) => {

        if (key === '1') {
            try {
                const payload = { email: data.EnterEmail.toLowerCase() };
                setEmailForgotPassword(data.EnterEmail);
                setLoading(true)
                await sendOTPForgotPassword(payload);
                setLoading(false)
                setEmailValid(true)
                reset({ otp: '', newPassword: '', confirmPassword: '' });
            } catch (error) {
                console.error('Error sending OTP', error);
            }
        }

        if (key === '2') {
            try {
                const payload = {
                    email: emailForgotPassword,
                    otp: data.otp
                };
                setLoading(true)
                const response = await checkOtpForForgotPassword(payload);
                setLoading(false)
                setUserId(response.user_id);
                setNewPasswordValid(response.status);
            } catch (error) {
                console.error('Error verifying OTP', error);
            }
        }

        if (key === '3') {
            try {
                const payload = {
                    userId: userId,
                    newPassword: data.newPassword,
                    confirmPassword: data.confirmPassword
                };
                setLoading(true)
                console.log(payload, ":::payload")
                const response = await forgotPasswordApi(payload)
                console.log(response, "response")
                setLoading(false)
                if (response.status) {
                    navigation.navigate('Login');
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error of new password api', error);
            }
        }
    };

    const onPressCurrentPassword = () => {
        setCurrentPasswordHidden(!isCurrentPasswordHidden);
    };

    const onPressConfirmPassword = () => {
        setCOnfirmPasswordHidden(!isConfirmPasswordHidden);
    };


    return (

        <View className="flex-1 bg-[#E9EDF7] px-2 relative">
            <View className="w-full bg-white mx-2 h-[83%] pt-24 rounded-t-[30px] absolute bottom-0">

                <View className="w-full absolute top-[-60px] z-10 h-28 flex-row justify-center">
                    <View className="w-72 rounded-xl bg-[#4e63ac] h-full flex-row justify-center items-center">
                        <Text className="text-white text-2xl tracking-wider font-extrabold">Create New Password</Text>
                    </View>
                </View>

                <View className="flex-1 px-8">
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.container}
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View className="flex-1">

                                {!isEmailValid && (
                                    <View className="my-9 relative flex-1">
                                        <View className="w-full flex flex-row gap-1">
                                            <Text className="font-bold text-base text-rose-500">
                                                {t('PleaseEnterEmail')}
                                            </Text>
                                            <Text style={{ color: 'red', fontSize: 17, height: 13 }}>*</Text>
                                        </View>
                                        <View className={`w-full my-2 px-4 flex-row justify-between bg-[#F3F5F7] rounded-[15px] items-center shadow-input mx-0.5   ${Platform.OS == "android" ? "shadow-black shadow-custom-elevation" : "border border-gray-200 shadow"} `}>
                                            <Controller
                                                control={control}
                                                name="EnterEmail"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholder={t('PleaseEnterEmail')}
                                                        onBlur={onBlur}
                                                        placeholderTextColor="grey"
                                                        onChangeText={onChange}
                                                        value={value}
                                                        className={`basis-[85%] text-black ${Platform.OS == "ios" ? "p-3" : ""} pl-[10px] lowercase`}
                                                    />
                                                )}
                                            />
                                        </View>
                                        {errors.EnterEmail && <Text style={styles.error}>{errors.EnterEmail.message}</Text>}
                                        {loading ? (
                                            <View className="flex flex-row items-center justify-center absolute bottom-0 w-full bg-[#4e63ac] py-4 rounded-lg">
                                                <Text className="mr-4 text-lg text-white ">{t("Loading")}</Text>
                                                <ActivityIndicator size="small" color="white" />
                                            </View>
                                        ) : (
                                            <View className="absolute bottom-0 w-full">
                                                <Button
                                                    className="bg-[#4e63ac] py-4 rounded-lg"
                                                    title={"Send OTP"}
                                                    onPress={handleSubmit(data => onSubmit(data, '1'))}
                                                />
                                            </View>
                                        )}
                                    </View>
                                )}

                                {isEmailValid && !isNewPasswordValid && (
                                    <View className="my-9 relative flex-1">
                                        <View className="w-full flex flex-row gap-1">
                                            <Text className="font-BOLD text-base text-rose-500">OTP</Text>
                                            <Text style={{ color: 'red', fontSize: 17, height: 13 }}>*</Text>
                                        </View>
                                        <View className={`w-full my-2 px-4 flex-row justify-between bg-[#F3F5F7] rounded-[15px] items-center shadow-input mx-0.5   ${Platform.OS == "android" ? "shadow-black shadow-custom-elevation" : "border border-gray-200 shadow"} `}>
                                            <Controller
                                                control={control}
                                                name="otp"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholder="Enter OTP"
                                                        onBlur={onBlur}
                                                        onChangeText={onChange}
                                                        value={value}
                                                        placeholderTextColor="grey"
                                                        className={`basis-[85%] text-black ${Platform.OS == "ios" ? "p-3" : ""} pl-[10px]`}
                                                    />
                                                )}
                                            />
                                        </View>
                                        {errors.otp && <Text style={styles.error}>{errors.otp.message}</Text>}
                                        {loading ? (
                                            <View className="flex flex-row items-center justify-center absolute bottom-0 w-full bg-[#4e63ac] py-4 rounded-lg">
                                                <Text className="mr-4 text-lg text-white">{t("Loading")}</Text>
                                                <ActivityIndicator size="small" color="white" />
                                            </View>
                                        ) : (
                                            <View className="absolute bottom-0 w-full">
                                                <Button
                                                    className="bg-[#4e63ac] py-4 rounded-lg"
                                                    title={t('Submit')}
                                                    onPress={() => onSubmit(getValues(), '2')}
                                                />
                                            </View>
                                        )}
                                    </View>
                                )}

                                {isNewPasswordValid && (
                                    <View className="my-9 relative flex-1">
                                        <View className="w-full">
                                            <Text className="font-extrabold text-base tracking-wider text-rose-700">New Password</Text>
                                        </View>
                                        <View className={`w-full my-2 px-4 flex-row justify-between bg-[#F3F5F7] rounded-[15px] items-center shadow-input mx-0.5   ${Platform.OS == "android" ? "shadow-black shadow-custom-elevation" : "border border-gray-200 shadow"} `}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder={t('EnterNewPassword')}
                                                onChangeText={(text) => setNewPassword(text)}
                                                value={newPassword}
                                                placeholderTextColor="grey"
                                                className={`basis-[85%] text-black ${Platform.OS == "ios" ? "p-3" : ""} pl-[10px]`}
                                                secureTextEntry={isCurrentPasswordHidden}
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
                                        {errors.newPassword && <Text style={styles.error}>{errors.newPassword.message}</Text>}

                                        <View className="w-full">
                                            <Text className="font-extrabold text-base tracking-wider text-rose-700 mt-5">Confirm Password</Text>
                                        </View>
                                        {/*  <View className="w-full my-2 flex-row bg-[#F3F5F7] rounded-[15px] items-center" style={styles.inputView}> */}
                                        <View className={`w-full my-2 px-4 flex-row justify-between bg-[#F3F5F7] rounded-[15px] items-center shadow-input mx-0.5   ${Platform.OS == "android" ? "shadow-black shadow-custom-elevation" : "border border-gray-200 shadow"} `}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder={t('ConfirmNewPassword')}
                                                onChangeText={(text) => setConfirmPassword(text)}
                                                value={confirmPassword}
                                                placeholderTextColor="grey"
                                                className={`basis-[85%] text-black ${Platform.OS == "ios" ? "p-3" : ""} pl-[10px]`}
                                                secureTextEntry={isConfirmPasswordHidden}
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
                                        {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}
                                        {loading ? (
                                            <View className="flex flex-row items-center justify-center absolute bottom-0 w-full bg-[#4e63ac] py-4 rounded-lg">
                                                <ActivityIndicator size="small" color="white" />
                                                <Text className="ml-4 text-lg text-white font-semibold">{t("Loading")}</Text>
                                            </View>
                                        ) : (
                                            <View className="absolute bottom-0 w-full">
                                                <Button
                                                    className="bg-[#4e63ac] py-4 rounded-lg mt-4"
                                                    title="Set New Password"
                                                    onPress={() => onSubmit({ newPassword, confirmPassword }, '3')}
                                                />
                                            </View>
                                        )}
                                    </View>
                                )}

                            </View>

                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        color: '#333',
        paddingLeft: 10,
    },
    inputView: {
        shadowColor: '#423f40',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        marginHorizontal: 2,
        elevation: 4,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default ForgotPassword;
