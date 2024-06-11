import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Platform } from 'react-native';
import * as yup from 'yup';
import Button from '../../../components/Button';
import ApiContext from '../../../context/ApiContext';
import { useTranslation } from 'react-i18next';

function EmailSupport({ navigation }) {
    const { t } = useTranslation();

    const schema = yup.object().shape({
        subject: yup.string().required(t("Subjectisrequired")),
        message: yup.string().required(t("Messageisrequired")),
        email: yup.string().email(t("Invalidemailformat")).required(t("Emailisrequired")),
    });
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
                                        {t('gettouchmail')}
                                    </Text>
                                </View>
                            </View>
                            <View className="w-full mt-6 mb-3 flex flex-row justify-center">
                                <View className="w-[90%]">
                                    <Text className="font-extrabold tracking-wider mb-3 text-2xl text-neutral-700 text-center">{t('sendemail')}</Text>
                                    <Text className="tracking-wider text-lg text-neutral-700 text-center">{t('facinganissue')}</Text>
                                </View>
                            </View>
                            <View className="w-full p-3">
                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700"> {t('email')}:</Text>
                                    </View>
                                    <View className="w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="email"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('pleaseenteremail')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={onChange}
                                                />
                                            )}
                                        />
                                        {errors.email && <Text className="text-red-500 mb-[10px]">{errors.email.message}</Text>}
                                    </View>
                                </View>
                                <View className="w-full">
                                    <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('subject')}:</Text>
                                </View>
                                <Controller
                                    control={control}
                                    name="subject"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            placeholder={t('pleaseentersubject')}
                                            placeholderTextColor="grey"
                                            style={styles.input}
                                            value={value}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                        />
                                    )}
                                />
                                {errors.subject && <Text className="text-red-500 mb-[10px]">{errors.subject.message}</Text>}
                                <View className="w-full">
                                    <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('message')}:</Text>
                                </View>
                                <Controller
                                    control={control}
                                    name="message"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            placeholder={t('pleaseentermessage')}
                                            placeholderTextColor="grey"
                                            multiline
                                            style={styles.input}
                                            value={value}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                        />
                                    )}
                                />
                                {errors.message && <Text className="text-red-500">{errors.message.message}</Text>}
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
