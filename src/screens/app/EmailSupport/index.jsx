import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Platform } from 'react-native';
import * as yup from 'yup';
import Button from '../../../components/Button';
import ApiContext from '../../../context/ApiContext';

const schema = yup.object().shape({
    subject: yup.string().required('Subject is required'),
    message: yup.string().required('Message is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
});

function EmailSupport({ navigation }) {

    const { supportMailSend } = useContext(ApiContext);
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            await supportMailSend(data);
            navigation.navigate('Support');
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View className="flex-1 bg-white space-y-5 w-full p-3" edges={['top']}>
                        <View className="w-full flex-1 h-full bg-[#F7F7FA] rounded-[10px] overflow-hidden">
                            <View className="w-full h-36 bg-[#E9EDF7] flex flex-row ">
                                <View className="basis-[35%] flex flex-row justify-center items-center">
                                    <Image
                                        source={require("../../../assets/send_email_bg.png")}
                                        className="w-[80px] h-[80px] object-cover"
                                    />
                                </View>
                                <View className="basis-[65%] flex flex-row justify-center items-center">
                                    <Text className="font-extrabold tracking-wider text-2xl text-rose-700 ">
                                        Get in touch with us via email. 👋
                                    </Text>
                                </View>
                            </View>
                            <View className="w-full mt-6 mb-3 flex flex-row justify-center">
                                <View className="w-[90%]">
                                    <Text className="font-extrabold tracking-wider mb-3 text-2xl text-neutral-700 text-center">Send us an email</Text>
                                    <Text className="tracking-wider text-lg text-neutral-700 text-center">Facing an issue? Our support team is here to help. Contact us via email.</Text>
                                </View>
                            </View>
                            <View className="w-full p-3">
                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700 mb-2">Email:</Text>
                                    </View>
                                    <View className="w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="email"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder="Please enter email"
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={onChange}
                                                />
                                            )}
                                        />
                                        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
                                    </View>
                                </View>
                                <View className="w-full">
                                    <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700 mb-2">Subject:</Text>
                                </View>
                                <Controller
                                    control={control}
                                    name="subject"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            placeholder="Please enter subject"
                                            placeholderTextColor="grey"
                                            style={{
                                                width: '100%',
                                                backgroundColor: 'white',
                                                color: '#333',
                                                borderRadius: 10,
                                                paddingLeft: 10,
                                                marginBottom: 15,
                                                shadowColor: '#000',
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowOpacity: 0.3,
                                                shadowRadius: 4,
                                                elevation: 5,
                                            }}
                                            value={value}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                        />
                                    )}
                                />
                                {errors.subject && <Text style={styles.error}>{errors.subject.message}</Text>}
                                <View className="w-full">
                                    <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700 mb-2">Message:</Text>
                                </View>
                                <Controller
                                    control={control}
                                    name="message"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            placeholder="Please enter message"
                                            placeholderTextColor="grey"
                                            multiline
                                            style={{
                                                width: '100%',
                                                backgroundColor: 'white',
                                                color: '#333',
                                                borderRadius: 10,
                                                paddingLeft: 10,
                                                height: 150,
                                                marginBottom: 15,
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowOpacity: 0.3,
                                                shadowRadius: 4,
                                                elevation: 5,
                                                textAlignVertical: 'top',
                                            }}
                                            value={value}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                        />
                                    )}
                                />
                                {errors.message && <Text style={styles.error}>{errors.message.message}</Text>}
                            </View>
                            <View className="w-full p-3">
                                <Button className="bg-blue-500 py-3 rounded-lg" title="Send Email" onPress={handleSubmit(onSubmit)} />
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputError: {
        borderColor: 'red',
    },
    error: {
        color: 'red',
        marginBottom: 16,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
        color: '#333',
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default EmailSupport;
