import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { withTiming } from 'react-native-reanimated';
import * as yup from 'yup';
import Button from '../../../components/Button';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';

const Login = ({ navigation }) => {

    const { t } = useTranslation();
    const [loginImage, setLoginImage] = useState();
    const [loading, setLoading] = useState(false);
    const imageUrl = `${process.env.IMAGE_URL}${loginImage}`;
    const { loginAPICall, contactUsPageDetails } = useContext(ApiContext);
    const { setuserDataInStorage, progress, setIsLoggedIn, getUserDataFromStorage, setAllUserInfo } = useContext(GlobalContext);

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

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await loginAPICall({
                email_or_mobile: data?.email_or_mobile,
                password: data?.password,
            });
            if (res?.status) {
                if (res.user) {
                    setIsLoggedIn(!!(res?.user?._id));
                    setAllUserInfo(res.user);
                    await setuserDataInStorage("user", res.user);
                    await getUserDataFromStorage("user");
                }
                progress.value = withTiming("1");
                navigation.navigate('Home');
            } else {
                throw new Error('Invalid login response');
            }
        } catch (error) {
            console.error('An error occurred while User Login', error);
            throw new Error('An error occurred while User Login');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        (async function () {
            const contentContactUs = await contactUsPageDetails();
            const desiredKeys = ["login"];
            contentContactUs.forEach((item) => {
                if (desiredKeys.includes(item.key)) {
                    switch (item.key) {
                        case 'login':
                            setLoginImage(item.value);
                            break;
                        default:
                            break;
                    }
                }
            });
        })();
    }, []);

    return (
        <View style={styles.container}>

            <View className="h-[100%] w-[100%]" style={styles.bannerContainer}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    onError={(error) => console.error('Image load error', error)}
                />
            </View>

            <View className="bg-white h-[60%] p-4 rounded-tr-3xl rounded-tl-3xl shadow-md">

                <View>
                    <Text className="mb-[8px] font-bold text-[16px] text-black mt-2">{t('emailOrMobileNumber')}</Text>
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
                    <Text className="mb-[8px] font-bold text-[16px] text-black mt-2">{t('password')}</Text>
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
                    {loading ? (
                        <View className="flex flex-row items-center justify-center bg-[#4e63ac] cursor-pointer p-4 rounded-lg">
                            <ActivityIndicator size="large" color="white" />
                            <Text className="ml-2 text-base text-white ">{t('loading')}</Text>
                        </View>
                    ) : (
                        <Button title={t('login')} onPress={handleSubmit(onSubmit)} disabled={loading} />
                    )}
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

                <View className="flex flex-row justify-center mt-3" style={styles.registerContainer}>
                    <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
                        <Text className="text-base text-black font-bold ml-2">Forgot Password</Text>
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
    image: {
        height: "100%",
        width: "100%"
    }
});

export default Login;
