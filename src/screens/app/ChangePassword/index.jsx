import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Define the validation schema using Yup
const schema = yup.object().shape({
    currentPassword: yup.string().required('Current password is required'),
    newPassword: yup.string()
        .required('New password is required')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),
    confirmNewPassword: yup.string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm new password is required'),
});

const ChangePassword = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
        // Handle form submission
    };

    return (
        <View style={styles.container} className=" bg-indigo-50">
            <Text style={styles.label} className="text-lg text-neutral-700 tracking-wider font-bold">Current Password</Text>
            <Controller
                control={control}
                name="currentPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                    />
                )}
            />
            {errors.currentPassword && <Text style={styles.error}>{errors.currentPassword.message}</Text>}

            <Text style={styles.label} className="text-lg text-neutral-700 tracking-wider font-bold">New Password</Text>
            <Controller
                control={control}
                name="newPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                    />
                )}
            />
            {errors.newPassword && <Text style={styles.error}>{errors.newPassword.message}</Text>}

            <Text style={styles.label} className="text-lg text-neutral-700 tracking-wider font-bold">Confirm New Password</Text>
            <Controller
                control={control}
                name="confirmNewPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                    />
                )}
            />
            {errors.confirmNewPassword && <Text style={styles.error}>{errors.confirmNewPassword.message}</Text>}

            <Button title="Change Password" onPress={handleSubmit(onSubmit)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        // backgroundColor: 'white',
    },
    label: {
        // fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 8,
        marginBottom: 16,
        borderRadius: 4,
    },
    error: {
        color: 'red',
        marginBottom: 16,
    },
});

export default ChangePassword;
