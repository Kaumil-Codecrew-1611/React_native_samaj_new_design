/* import { View, Text } from 'react-native'
import React from 'react'

const AddBusinessDetails = () => {
    return (
        <View>
            <Text>AddBusinessDetails</Text>
        </View>
    )
}

export default AddBusinessDetails */

/* import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, Keyboard } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as ImagePicker from 'react-native-image-picker';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    phoneNumber2: yup.string(),
    address: yup.string().required('Address is required'),
    location: yup.string().required('Location is required'),
    businessName: yup.string().required('Business name is required'),
    businessEmail: yup.string().email('Invalid business email'),
    businessContactNumber: yup.string(),
    businessLogo: yup.mixed().required('Business logo is required')
        .test('fileType', 'Only PNG files are allowed', value => {
            return value && value.type === 'image/png';
        }),
    businessShortDetail: yup.string().required('Business short detail is required'),
    businessLongDetail: yup.string().required('Business long detail is required'),
    businessWebsite: yup.string().url('Invalid URL'),
    facebook: yup.string().url('Invalid URL'),
    instagram: yup.string().url('Invalid URL'),
    linkedIn: yup.string().url('Invalid URL'),
    twitter: yup.string().url('Invalid URL'),
    businessType: yup.string().required('Business type is required')
});

const AddBusinessDetails = () => {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });
    const [logo, setLogo] = useState(null);

    const onSubmit = data => {
        data.businessLogo = logo;
        console.log(data);
    };

    const pickImage = () => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo' }, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = response.assets[0];
                if (source.type === 'image/png') {
                    setLogo(source);
                    setValue('businessLogo', source, { shouldValidate: true });
                } else {
                    alert('Only PNG files are allowed');
                }
            }
        });
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                        <Text>Business Form</Text>

                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Name"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

                        <Controller
                            control={control}
                            name="phoneNumber"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Phone Number"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>}

                        <Controller
                            control={control}
                            name="phoneNumber2"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Phone Number 2"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="address"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Address"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.address && <Text style={styles.errorText}>{errors.address.message}</Text>}

                        <Controller
                            control={control}
                            name="location"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Location"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.location && <Text style={styles.errorText}>{errors.location.message}</Text>}

                        <Controller
                            control={control}
                            name="businessName"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Business Name"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.businessName && <Text style={styles.errorText}>{errors.businessName.message}</Text>}

                        <Controller
                            control={control}
                            name="businessEmail"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Business Email"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.businessEmail && <Text style={styles.errorText}>{errors.businessEmail.message}</Text>}

                        <Controller
                            control={control}
                            name="businessContactNumber"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Business Contact Number"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />

                        <Button title="Upload Logo" onPress={pickImage} />
                        {logo && <Image source={{ uri: logo.uri }} style={styles.logo} />}
                        {errors.businessLogo && <Text style={styles.errorText}>{errors.businessLogo.message}</Text>}

                        <Controller
                            control={control}
                            name="businessShortDetail"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Business Short Detail"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.businessShortDetail && <Text style={styles.errorText}>{errors.businessShortDetail.message}</Text>}

                        <Controller
                            control={control}
                            name="businessLongDetail"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Business Long Detail"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.businessLongDetail && <Text style={styles.errorText}>{errors.businessLongDetail.message}</Text>}

                        <Controller
                            control={control}
                            name="businessWebsite"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Business Website"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.businessWebsite && <Text style={styles.errorText}>{errors.businessWebsite.message}</Text>}

                        <Controller
                            control={control}
                            name="facebook"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Facebook"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.facebook && <Text style={styles.errorText}>{errors.facebook.message}</Text>}

                        <Controller
                            control={control}
                            name="instagram"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Instagram"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.instagram && <Text style={styles.errorText}>{errors.instagram.message}</Text>}

                        <Controller
                            control={control}
                            name="linkedIn"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="LinkedIn"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.linkedIn && <Text style={styles.errorText}>{errors.linkedIn.message}</Text>}

                        <Controller
                            control={control}
                            name="twitter"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Twitter"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.twitter && <Text style={styles.errorText}>{errors.twitter.message}</Text>}

                        <Controller
                            control={control}
                            name="businessType"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Business Type"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.businessType && <Text style={styles.errorText}>{errors.businessType.message}</Text>}

                        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 5
    },
    logo: {
        width: 100,
        height: 100,
        marginVertical: 10
    },
    errorText: {
        color: 'red',
        marginBottom: 5
    }
});

export default AddBusinessDetails; */


import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, Keyboard, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../../../components/Button';
import Feather from 'react-native-vector-icons/Feather';
import { t } from 'i18next';
const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    phoneNumber2: yup.string(),
    address: yup.string().required('Address is required'),
    businessName: yup.string().required('Business name is required'),
    businessEmail: yup.string().email('Invalid business email'),
    businessContactNumber: yup.string(),
    businessLogo: yup.mixed().required('Business logo is required')
        .test('fileType', 'Only PNG files are allowed', value => {
            return value && value.type === 'image/png';
        }),
    businessShortDetail: yup.string().required('Business short detail is required'),
    businessLongDetail: yup.string().required('Business long detail is required'),
    businessWebsite: yup.string().url('Invalid URL'),
    facebook: yup.string().url('Invalid URL'),
    instagram: yup.string().url('Invalid URL'),
    linkedIn: yup.string().url('Invalid URL'),
    twitter: yup.string().url('Invalid URL'),
    businessType: yup.string().required('Business type is required'),
    role: yup.string(),
    // dateOfOpeningJob: yup.date().required('Date of opening job is required'),
});

const AddBusinessDetails = () => {
    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: yupResolver(schema)
    });

    const [loading, setLoading] = useState(false);
    const [logo, setLogo] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const dateOfOpeningJob = watch('dateOfOpeningJob') || new Date();

    const onSubmit = (data) => {
        setLoading(true);
        data.businessLogo = logo; // Ensure logo data is included in form data
        console.log(data); // Check the logged data in console before submission
        // Additional logic to submit data to backend or perform further actions
        setLoading(false);
    };

    const pickImage = () => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo' }, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = response.assets[0];
                if (source.type === 'image/png') {
                    setLogo(source);
                    setValue('businessLogo', source, { shouldValidate: true });
                } else {
                    alert('Only PNG files are allowed');
                }
            }
        });
    };

    const onDateChange = (event, selectedDate) => {
        if (selectedDate !== undefined) {
            setShowPicker(false);
            const currentDate = new Date(selectedDate);
            setValue('dateOfOpeningJob', currentDate);
        }
    };

    return (
        <View className="bg-[#EFF6F9] w-full flex-1 px-3">
            <View className="w-full bg-white flex-1 p-3 rounded-md mt-3 mb-4">
                <Text className="font-extrabold tracking-wider mx-1 text-2xl text-rose-700">
                    Fill the Business details
                </Text>
                <View className="w-full mx-0 my-3 bg-neutral-700 h-[2px]"></View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>

                            <View>
                                <View className="w-full mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Full Name:</Text>
                                </View>
                                <View className="w-full mt-2">
                                    <Controller
                                        control={control}
                                        name="name"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={styles.input}
                                                placeholderTextColor="grey"
                                                className="py-3"
                                                placeholder="Please enter your full name"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                    {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
                                </View>
                            </View>
                            <View className="mt-1">
                                <View className="w-full mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Business Contact Number:</Text>
                                </View>
                                <View className="w-full mt-2">
                                    <Controller
                                        control={control}
                                        name="businessContactNumber"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Business Contact Number"
                                                onBlur={onBlur}
                                                placeholderTextColor="grey"
                                                className="py-3"
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                            <View className="mt-1">
                                <View className="w-full mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Phone Number 2:</Text>
                                </View>
                                <View className="w-full mt-2">
                                    <Controller
                                        control={control}
                                        name="phoneNumber2"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Phone Number 2"
                                                placeholderTextColor="grey"
                                                className="py-3"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                            <View className="mt-1" >
                                <View className="w-full mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Company Address:</Text>
                                </View>
                                <View className="w-full mt-2">
                                    <Controller
                                        control={control}
                                        name="address"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Address"
                                                placeholderTextColor="grey"
                                                className="py-3"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                    {errors.address && <Text style={styles.errorText}>{errors.address.message}</Text>}
                                </View>
                            </View>
                            <View className="mt-1">
                                <View className="w-full mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Company Name:</Text>
                                </View>
                                <View className="w-full mt-2">
                                    <Controller
                                        control={control}
                                        name="businessName"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Business Name"
                                                onBlur={onBlur}
                                                placeholderTextColor="grey"
                                                className="py-3"
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                    {errors.businessName && <Text style={styles.errorText}>{errors.businessName.message}</Text>}
                                </View>
                            </View>
                            <View className="mt-1">
                                <View className="w-full mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Business Email:</Text>
                                </View>
                                <View className="w-full mt-2">
                                    <Controller
                                        control={control}
                                        name="businessEmail"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Business Email"
                                                onBlur={onBlur}
                                                placeholderTextColor="grey"
                                                className="py-3"
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                    {errors.businessEmail && <Text style={styles.errorText}>{errors.businessEmail.message}</Text>}
                                </View>
                            </View>
                            <View >
                                <TouchableOpacity onPress={pickImage} style={styles.logoContainer}>
                                    {logo ? (
                                        <Image source={{ uri: logo.uri }} style={styles.logo} />
                                    ) : (
                                        <Feather name="image" style={styles.icon} />
                                    )}
                                </TouchableOpacity>
                                {errors.businessLogo && <Text style={styles.errorText}>{errors.businessLogo.message}</Text>}
                            </View>
                            {/*  <Button title="Upload Logo" onPress={pickImage} />
                            {logo && <Image source={{ uri: logo.uri }} style={styles.logo} />}
                            {errors.businessLogo && <Text style={styles.errorText}>{errors.businessLogo.message}</Text>} */}

                            <View className="mt-1">
                                <View className="w-full mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Business Short Description:</Text>
                                </View>
                                <View className="w-full mt-2">
                                    <Controller
                                        control={control}
                                        name="businessShortDetail"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Business Short Detail"
                                                placeholderTextColor="grey"
                                                className="py-3"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                    {errors.businessShortDetail && <Text style={styles.errorText}>{errors.businessShortDetail.message}</Text>}
                                </View>
                            </View>


                            <View className="mt-1">
                                <View className="w-full mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Business Long Description:</Text>
                                </View>
                                <View className="w-full mt-2">
                                    <Controller
                                        control={control}
                                        name="businessLongDetail"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Business Long Detail"
                                                placeholderTextColor="grey"
                                                className="py-3"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                    {errors.businessLongDetail && <Text style={styles.errorText}>{errors.businessLongDetail.message}</Text>}
                                </View>
                            </View>

                            <View className="mt-1">
                                <View className="w-full mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Business Website Link:</Text>
                                </View>
                                <View className="w-full mt-2">
                                    <Controller
                                        control={control}
                                        name="businessWebsite"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Business Website"
                                                placeholderTextColor="grey"
                                                className="py-3"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                    {errors.businessWebsite && <Text style={styles.errorText}>{errors.businessWebsite.message}</Text>}
                                </View>
                            </View>
                            <View className="mt-1">
                                <View className="w-full mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Business Facebook Link:</Text>
                                </View>
                                <View className="w-full mt-2">
                                    <Controller
                                        control={control}
                                        name="facebook"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Facebook"
                                                onBlur={onBlur}
                                                placeholderTextColor="grey"
                                                className="py-3"
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                    {errors.facebook && <Text style={styles.errorText}>{errors.facebook.message}</Text>}
                                </View>
                            </View>
                            <View className="mt-1">
                                <View className="w-full mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Business Instagram Link:</Text>
                                </View>
                                <View className="w-full mt-2">
                                    <Controller
                                        control={control}
                                        name="instagram"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Instagram"
                                                onBlur={onBlur}
                                                placeholderTextColor="grey"
                                                className="py-3"
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                    {errors.instagram && <Text style={styles.errorText}>{errors.instagram.message}</Text>}
                                </View>
                            </View>
                            <View className="mt-1">
                                <View className="w-full mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Business LinkedIn Link:</Text>
                                </View>
                                <View className="w-full mt-2">
                                    <Controller
                                        control={control}
                                        name="linkedIn"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={styles.input}
                                                placeholder="LinkedIn"
                                                onBlur={onBlur}
                                                placeholderTextColor="grey"
                                                className="py-3"
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                    {errors.linkedIn && <Text style={styles.errorText}>{errors.linkedIn.message}</Text>}
                                </View>
                            </View>
                            <View className="mt-1">
                                <View className="w-full mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Business Twitter Link:</Text>
                                </View>
                                <View className="w-full mt-2">
                                    <Controller
                                        control={control}
                                        name="twitter"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Twitter"
                                                onBlur={onBlur}
                                                placeholderTextColor="grey"
                                                className="py-3"
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                    {errors.twitter && <Text style={styles.errorText}>{errors.twitter.message}</Text>}
                                </View>
                            </View>
                            <View className="mt-1">
                                <View className="w-full mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Type Of Business:</Text>
                                </View>
                                <View className="w-full mt-2">
                                    <Controller
                                        control={control}
                                        name="businessType"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Business Type"
                                                onBlur={onBlur}
                                                placeholderTextColor="grey"
                                                className="py-3"
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                    {errors.businessType && <Text style={styles.errorText}>{errors.businessType.message}</Text>}
                                </View>
                            </View>

                            <View className="mt-1">
                                <View className="w-full mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Business Role:</Text>
                                </View>
                                <View className="w-full mt-2">
                                    <Controller
                                        control={control}
                                        name="role"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Role"
                                                onBlur={onBlur}
                                                placeholderTextColor="grey"
                                                className="py-3"
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                    {errors.role && <Text style={styles.errorText}>{errors.role.message}</Text>}
                                </View>
                            </View>
                            <View style={styles.datePickerContainer}>
                                <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">Date of Opening of Job:</Text>
                                <TouchableWithoutFeedback onPress={() => setShowPicker(true)}>
                                    <View style={styles.input} className="p-3">
                                        <Text >{dateOfOpeningJob.toDateString()}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                {showPicker && (
                                    <DateTimePicker
                                        value={dateOfOpeningJob}
                                        mode="date"
                                        display="default"
                                        onChange={onDateChange}
                                    />
                                )}
                                {errors.dateOfOpeningJob && <Text style={styles.errorText}>{errors.dateOfOpeningJob.message}</Text>}
                            </View>


                            <View className="mt-3 mb-6">
                                {loading ? (
                                    <View className="flex flex-row items-center justify-center bg-blue-500 cursor-pointer p-2 rounded-lg">
                                        <Text className="mr-4 text-lg font-semibold text-white ">{t("Loading")}</Text>
                                        <ActivityIndicator size="large" color="white" />
                                    </View>
                                ) : (
                                    <Button className="bg-blue-500 py-3 rounded-lg" title="Submit" disabled={loading} onPress={handleSubmit(onSubmit)} />
                                )}
                            </View>



                            {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}
                        </ScrollView>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // padding: 20,
        flex: 1
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    input: {
        backgroundColor: '#eee',
        color: '#333',
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 7,
        shadowColor: '#423f40',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 0.2,
        marginHorizontal: 4,
        elevation: 4,
    },
    logo: {
        width: 100,
        height: 100,
        marginVertical: 10
    },
    errorText: {
        color: 'red',
        marginBottom: 5
    },
    datePickerContainer: {
        marginVertical: 10,
    },
    datePicker: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 5,
    },
    logoContainer: {
        width: 200,
        height: 200,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 9,
    },
    icon: {
        fontSize: 40,
        color: 'blue',
    },
});

export default AddBusinessDetails;




