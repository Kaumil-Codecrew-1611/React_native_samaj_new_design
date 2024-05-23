import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Svg, { Image } from 'react-native-svg';
import * as yup from 'yup';
import Button from '../../../components/Button';
import { COLORS } from '../../../utils/colors';

// Define the validation schema using Yup
const schema = yup.object().shape({
    emailOrPhone: yup.string().required('Email or Phone number is required').test(
        'is-email-or-phone',
        'Invalid email or phone number',
        function (value) {
            // Check if value looks like an email
            if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value)) {
                return true; // Pass email validation
            }
            // Check if value starts with a number (assumed as phone number)
            else if (/^\d/.test(value)) {
                // Assuming phone number length should be at least 10 digits
                return /^\d{10,}$/.test(value);
            }
            return false; // Fail validation for other cases
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

    const onSubmit = (data) => {
        console.log(data);
        // Handle form submission
    };

    return (
        <>
            <View className="bg-[#d4f6db]" style={styles.container}>
                <View className="h-[40%]">
                    <Svg className="w-full h-full">
                        <Image href={require("../../../assets/login_banner_bg.png")} className="h-full" width="100%" height="100%" />

                    </Svg>
                </View>
                <View className="bg-white h-[60%] w-full p-8 rounded-t-3xl shadow-2xl" >
                    <View>
                        <Text style={styles.label}>Email or Phone Number</Text>
                        <Controller
                            control={control}
                            name="emailOrPhone"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className="rounded-lg"
                                    style={[styles.input, errors.emailOrPhone && styles.inputError]}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.emailOrPhone && <Text style={styles.error}>{errors.emailOrPhone.message}</Text>}
                    </View>
                    <View>
                        <Text style={styles.label}>Password</Text>
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className="rounded-lg"
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
                    <View className="mt-3">
                        <Button className="bg-blue-500 py-3 rounded-lg" title="Login" onPress={handleSubmit(onSubmit)} />
                    </View>
                    <View style={{
                        flexDirection: "row",
                        marginTop: 12,
                        justifyContent: "center"
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.black
                        }}>Don't have an account ?</Text>
                        <Pressable
                            onPress={() => navigation.navigate("Register")}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.black,
                                fontWeight: "bold",
                                marginLeft: 4
                            }}>Register</Text>
                        </Pressable>

                    </View>
                </View>
            </View>
        </>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    label: {
        height: 20,
        marginBottom: 8,
        fontWeight: 'bold',
        fontSize: 16,
    },
    input: {
        height: 40,
        marginBottom: 7,
        paddingHorizontal: 10,
        backgroundColor: '#e7e7e9',
    },
    inputError: {
        borderWidth: 1,
        borderColor: 'red',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});
export default Login;
