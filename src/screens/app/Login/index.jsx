import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { withTiming } from 'react-native-reanimated';
import Svg, { Image } from 'react-native-svg';
import * as yup from 'yup';
import Button from '../../../components/Button';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';
import { COLORS } from '../../../utils/colors';
import { useTranslation } from 'react-i18next';

const Login = ({ navigation }) => {
    const { t } = useTranslation();

    const schema = yup.object().shape({
        email_or_mobile: yup.string().required(t('emailOrMobileRequired')).test(
            'is-email-or-phone',
            t('invalidEmailOrPhone'),
            function (value) {
                if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value)) {
                    return true;
                }
                else if (/^\d/.test(value)) {
                    return /^\d{10,}$/.test(value);
                }
                return false;
            }
        ),
        password: yup.string().required(t('passwordisrequired')).matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            t('passwordmusthaveatleastoneletteronenumberandonespecialcharacter')
        ),
    });
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const { loginAPICall } = useContext(ApiContext);
    const { setuserDataInStorage, progress, setIsLoggedIn, getUserDataFromStorage, setAllUserInfo } = useContext(GlobalContext);

    const onSubmit = async (data) => {
        try {
            const res = await loginAPICall({
                email_or_mobile: data?.email_or_mobile,
                password: data?.password,
            });
            if (res?.status) {
                if (res.user) {
                    setIsLoggedIn(!!(res?.user?._id))
                    setAllUserInfo(res.user)
                    await setuserDataInStorage("user", res.user);
                    await getUserDataFromStorage("user")
                }
                progress.value = withTiming("1");
                navigation.navigate('Home');
            } else {
                throw new Error('Invalid login response');
            }
        } catch (error) {
            console.error('An error occurred while User Login:', error);
            throw new Error('An error occurred while User Login');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.bannerContainer}>
                <Svg className="h-[100%] w-[100%]">
                    <Image href={require("../../../assets/login_banner_bg.png")} width="100%" height="100%" />
                </Svg>
            </View>
            <View className="bg-white h-[60%] p-4 rounded-tr-3xl rounded-tl-3xl shadow-md">
                <View>
                    <Text className="h-[20px] mb-[8px] font-bold text-[16px] text-black mt-2">{t('emailOrMobileNumber')}</Text>
                    <Controller
                        control={control}
                        name="email_or_mobile"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="border rounded-lg p-2 text-black"
                                onBlur={onBlur}
                                placeholder={t("emailOrMobileNumber")}
                                onChangeText={onChange}
                                placeholderTextColor="grey"
                                value={value}
                            />
                        )}
                    />
                    {errors.email_or_mobile && <Text className="text-red-500 mb-[10px]">{errors.email_or_mobile.message}</Text>}
                </View>
                <View>
                    <Text className="h-[20px] mb-[8px] font-bold text-[16px] text-black mt-2">{t('password')}</Text>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="border text-black rounded-lg p-2"
                                onBlur={onBlur}
                                placeholder={t("password")}
                                placeholderTextColor="grey"
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry
                            />
                        )}
                    />
                    {errors.password && <Text className="text-red-500 mb-[10px]">{errors.password.message}</Text>}
                </View>
                <View className="mt-[24px]">
                    <Button title={t('login')} onPress={handleSubmit(onSubmit)} />
                </View>
                <View className="flex flex-row justify-center mt-3" style={styles.registerContainer}>
                    <Text className="text-[16px] text-black">{t('donthaveaccount')}</Text>
                    <Pressable onPress={() => navigation.navigate("Register")}>
                        <Text className="text-base text-black font-bold ml-2">{t('register')}</Text>
                    </Pressable>
                </View>
                <View className="flex flex-row justify-center mt-3" style={styles.registerContainer}>
                    <Text className="text-[16px] text-black">Go to</Text>
                    <Pressable onPress={() => navigation.navigate("Home")}>
                        <Text className="text-base text-black font-bold ml-2">Home Page</Text>
                    </Pressable>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    bannerContainer: {
        height: '40%',
    },
});

export default Login;
