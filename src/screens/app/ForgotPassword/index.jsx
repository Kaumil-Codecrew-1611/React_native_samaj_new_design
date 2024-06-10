import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../../../components/Button';

const schema = yup.object().shape({

    emailOrPhone: yup.string().required('Email or Phone number is required').test(
        'is-email-or-phone',
        'Invalid email or phone number',
        function (value) {
            if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value)) {
                return true;
            } else if (/^\d{10}$/.test(value)) {
                return true;
            }
            return false;
        }
    ),

    otp: yup.string().when('isEmailOrPnoneValid', {
        is: true,
        then: yup.string().required('OTP is required')
    }),

});

const ForgotPassword = () => {

    const [isEmailOrPnoneValid, setEmailOrPhoneValid] = useState(false)

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            emailOrPhone: '',
            otp: '',
        }
    });

    const onSubmit = (data, key) => {
        if (key == 1) {
            setEmailOrPhoneValid(true)
            reset({ otp: '' });
        } else {
            console.log('otp check api')
            //otp check api
        }
    };


    return (
        <View className="flex-1 bg-green-200 px-2 selection: relative">

            <View className="w-full bg-white mx-2 h-[83%] pt-24 rounded-t-[30px]  absolute bottom-0">
                <View className="w-full absolute top-[-60px] z-10 h-32 flex-row justify-center">
                    <View className=" w-72 rounded-xl bg-green-600 h-full flex-row justify-center items-center">
                        <Text className="text-white text-2xl tracking-wider font-extrabold">FORGOT PASSWORD</Text>
                    </View>
                </View>
                <View className="flex-1 px-8">
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.container}
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View className="flex-1">
                                {!isEmailOrPnoneValid ? (
                                    <View className="my-9">
                                        <View className="w-full">
                                            <Text className="font-extrabold text-base tracking-wider text-rose-700">Email/Number </Text>
                                        </View>
                                        <View className=" w-full my-2 flex-row bg-[#F3F5F7] rounded-[15px] items-center" style={styles.inputView}>
                                            <Controller
                                                control={control}
                                                name="emailOrPhone"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholder="Enter mail or number"
                                                        onBlur={onBlur}
                                                        onChangeText={onChange}
                                                        value={value}
                                                        className="basis-[85%]"
                                                    />
                                                )}
                                            />

                                        </View>
                                        {errors.emailOrPhone && <Text style={styles.error}>{errors.emailOrPhone.message}</Text>}
                                    </View>
                                ) : (
                                    <View className="my-9">
                                        <View className="w-full">
                                            <Text className="font-extrabold text-base tracking-wider text-rose-700">OTP</Text>
                                        </View>
                                        <View className=" w-full my-2 flex-row bg-[#F3F5F7] rounded-[15px] items-center" style={styles.inputView}>
                                            <Controller
                                                control={control}
                                                name="otp"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholder="Enter otp"
                                                        onBlur={onBlur}
                                                        onChangeText={onChange}
                                                        value={value}
                                                        className="basis-[85%]"

                                                    />
                                                )}
                                            />
                                        </View>
                                    </View>
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                    <View className="mb-16">
                        <Button
                            className="bg-green-600 py-4 rounded-lg"
                            title={isEmailOrPnoneValid ? "Submit" : "Send OTP"}
                            onPress={handleSubmit(data => onSubmit(data, isEmailOrPnoneValid ? '2' : '1'))} />
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

export default ForgotPassword;
