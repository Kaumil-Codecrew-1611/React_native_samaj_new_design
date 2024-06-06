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

const schema = yup.object().shape({
    email_or_mobile: yup.string().required('Email or Phone number is required').test(
        'is-email-or-phone',
        'Invalid email or phone number',
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
    password: yup.string().required('Password is required').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

const Login = ({ navigation }) => {
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
            throw new Error('An error occurred!');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.bannerContainer}>
                <Svg style={styles.banner}>
                    <Image href={require("../../../assets/login_banner_bg.png")} width="100%" height="100%" />
                </Svg>
            </View>
            <View style={styles.formContainer}>
                <View>
                    <Text style={styles.label}>Email or Phone Number</Text>
                    <Controller
                        control={control}
                        name="email_or_mobile"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={[styles.input, errors.email_or_mobile && styles.inputError]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.email_or_mobile && <Text style={styles.error}>{errors.email_or_mobile.message}</Text>}
                </View>
                <View>
                    <Text style={styles.label}>Password</Text>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={[styles.input, errors.password && styles.inputError]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry
                            />
                        )}
                    />
                    {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Login" onPress={handleSubmit(onSubmit)} />
                </View>
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Don't have an account?</Text>
                    <Pressable onPress={() => navigation.navigate("Register")}>
                        <Text style={styles.registerLink}>Register</Text>
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
    banner: {
        width: '100%',
        height: '100%',
    },
    formContainer: {
        backgroundColor: 'white',
        height: '60%',
        width: '100%',
        padding: 16,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    label: {
        height: 20,
        marginBottom: 8,
        fontWeight: 'bold',
        fontSize: 16,
        color: "black"
    },
    input: {
        height: 40,
        marginBottom: 7,
        paddingHorizontal: 10,
        backgroundColor: '#e7e7e9',
        color: "black"
    },
    inputError: {
        borderWidth: 1,
        borderColor: 'red',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 24,
    },
    registerContainer: {
        flexDirection: 'row',
        marginTop: 12,
        justifyContent: 'center',
    },
    registerText: {
        fontSize: 16,
        color: COLORS.black,
    },
    registerLink: {
        fontSize: 16,
        color: COLORS.black,
        fontWeight: 'bold',
        marginLeft: 4,
    },
});

export default Login;
