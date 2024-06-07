import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import * as yup from 'yup';
import Button from '../../../components/Button';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';

const schema = yup.object().shape({
    old_password: yup.string().required('Current password is required'),
    password: yup.string()
        .required('New password is required')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),
    cpassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm new password is required'),
});

const ChangePassword = ({ navigation }) => {
    const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);
    const { allUserInfo } = useContext(GlobalContext);
    const { userChangePassword } = useContext(ApiContext);
    const [isCurrentPasswordHidden, setCurrentPasswordHidden] = useState(true);
    const [isNewPasswordHidden, setNewPasswordHidden] = useState(true);
    const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
    const [userId] = useState(allUserInfo._id)
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
            await userChangePassword(requestData);
            navigateToUserProfile()
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    const navigateToUserProfile = () => {
        navigation.navigate('userProfilePage');
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
        <View className="flex-1 bg-green-200 px-2 selection: relative">
            <View className="w-full bg-white mx-2 h-[83%] pt-24 rounded-t-[30px] absolute bottom-0">
                <View className="w-full absolute top-[-60px] z-10 h-32 flex-row justify-center">
                    <View className="w-72 rounded-xl bg-green-600 h-full flex-row justify-center items-center">
                        <Text className="text-white text-xl tracking-wider font-extrabold">CHANGE PASSWORD</Text>
                    </View>
                </View>
                <View className="flex-1 px-8">
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.container}
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                                <View className="flex-1">
                                    <View>
                                        <View className="w-full">
                                            <Text className="font-extrabold text-base tracking-wider text-rose-700">Current Password:</Text>
                                        </View>
                                        <View className="w-full my-2 flex-row bg-[#F3F5F7] rounded-[15px] items-center" style={styles.inputView}>
                                            <Controller
                                                control={control}
                                                name="old_password"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholder="current password"
                                                        onBlur={onBlur}
                                                        onChangeText={onChange}
                                                        value={value}
                                                        className="basis-[85%]"
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
                                        {errors.old_password && <Text style={styles.error}>{errors.old_password.message}</Text>}
                                    </View>

                                    <View className="my-5">
                                        <View className="w-full">
                                            <Text className="font-extrabold text-base tracking-wider text-rose-700">New Password:</Text>
                                        </View>
                                        <View className="w-full my-2 flex-row bg-[#F3F5F7] rounded-[15px] items-center" style={styles.inputView}>
                                            <Controller
                                                control={control}
                                                name="password"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholder="New password"
                                                        onBlur={onBlur}
                                                        onChangeText={onChange}
                                                        value={value}
                                                        className="basis-[85%]"
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
                                        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
                                    </View>

                                    <View>
                                        <View className="w-full">
                                            <Text className="font-extrabold text-base tracking-wider text-rose-700">Confirm Password:</Text>
                                        </View>
                                        <View className="w-full my-2 flex-row bg-[#F3F5F7] rounded-[15px] items-center" style={styles.inputView}>
                                            <Controller
                                                control={control}
                                                name="cpassword"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholder="confirm password"
                                                        onBlur={onBlur}
                                                        onChangeText={onChange}
                                                        value={value}
                                                        className="basis-[85%]"
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
                                        {errors.cpassword && <Text style={styles.error}>{errors.cpassword.message}</Text>}
                                    </View>
                                </View>
                            </ScrollView>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                    <View className="mb-auto">
                        <Button className="bg-green-600 py-4 rounded-lg" title="Change Password" onPress={handleSubmit(onSubmit)} />
                    </View>
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
    inputError: {
        borderColor: 'red',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});

export default ChangePassword;
