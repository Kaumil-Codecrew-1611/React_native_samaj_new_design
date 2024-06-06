import { yupResolver } from '@hookform/resolvers/yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CheckIcon, Radio, Select } from "native-base";
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import * as yup from 'yup';
import Button from "../../../components/Button";
import ApiContext from "../../../context/ApiContext";
import { GlobalContext } from "../../../context/globalState";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const schema = yup.object().shape({
    firstname: yup.string().required('First Name is required'),
    lastname: yup.string().required('Last Name is required'),
    middlename: yup.string().required('Middle Name is required'),
    email: yup.string()
        .matches(emailRegex, 'Invalid email address')
        .required('Email is required'),
    mobile_number: yup.string().required('Phone Number is required').matches(/^[0-9]{10}$/, 'Phone Number must be exactly 10 digits'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    pincode: yup.string().required('Pincode is required').matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
    education: yup.string().required('Education is required'),
    job: yup.string().required('Job is required'),
    gender: yup.string().required('Gender is required'),
});

const EditUserProfile = ({ navigation }) => {
    const { getLocation, updateUserProfileUser, updateUserPostProfile } = useContext(ApiContext);
    const [showPicker, setShowPicker] = useState(false);
    const { allUserInfo, setuserDataInStorage, removeUserDataFromStorage } = useContext(GlobalContext);
    const [userData, setUserData] = useState({})
    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            dob: new Date(),
            gender: '',
            marital_status: '',
        }
    });
    const dob = watch('dob') || new Date();

    useEffect(() => {
        getLocation()
    }, []);

    const onSubmit = async (data) => {
        const payload = {
            id: allUserInfo._id,
            data: data
        }
        const response = await updateUserPostProfile(payload)
        if (response.status) {
            await setuserDataInStorage('user', response.newsave);
            navigation.navigate('userProfilePage');
        }
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || dob;
        setShowPicker(false);
        setValue('dob', currentDate);
    };

    useEffect(() => {
        (async function () {
            const editUserProfile = await updateUserProfileUser(allUserInfo._id);
            setUserData(editUserProfile);
            setValue('firstname', editUserProfile.firstname || '');
            setValue('lastname', editUserProfile.lastname || '');
            setValue('middlename', editUserProfile.middlename || '');
            setValue('email', editUserProfile.email || '');
            setValue('address', editUserProfile.address || '');
            setValue('dob', editUserProfile.dob ? new Date(editUserProfile.dob) : new Date());
            setValue('city', editUserProfile.city || '');
            setValue('state', editUserProfile.state || '');
            setValue('pincode', editUserProfile.pincode || '');
            setValue('education', editUserProfile.education || '');
            setValue('job', editUserProfile.job || '');
            setValue('marital_status', editUserProfile.marital_status || '');
            setValue('gender', editUserProfile.gender || '');
            setValue('mobile_number', editUserProfile?.mobile_number ? editUserProfile?.mobile_number?.toString() : "");
        })();
    }, [setValue, allUserInfo._id]);

    return (
        <View className="bg-[#EFF6F9] w-full flex-1 px-3">
            <View className="w-full bg-white flex-1 rounded-md p-3">
                <Text className="font-extrabold tracking-wider ml-1 text-2xl text-rose-700">
                    Edit Profile
                </Text>
                <View className="w-full ml-1 my-2 bg-neutral-700 h-[2px]"></View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                            <View>
                                <View className="my-1">
                                    <View className="w-full ml-1">
                                        <Text className="font-extrabold  text-base tracking-wider text-neutral-700">First Name:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="firstname"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder="First name here ...."
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.firstname && <Text style={styles.error}>{errors.firstname.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">Last Name:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="lastname"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder="Last name here ...."
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.lastname && <Text style={styles.error}>{errors.lastname.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">Middle Name:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="middlename"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder="Middle name here ...."
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.middlename && <Text style={styles.error}>{errors.middlename.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">Email:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="email"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder="Email here ...."
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">Phone Number:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="mobile_number"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder="Phone Number"
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                    keyboardType="numeric"
                                                />
                                            )}
                                        />
                                        {errors.mobile_number && <Text style={styles.error}>{errors.mobile_number.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">Gender:</Text>
                                    </View>
                                    <View className="w-full mt-2">
                                        <View className="mb-[10px] ml-1">
                                            <Controller
                                                control={control}

                                                name="gender"
                                                render={({ field: { onChange, value } }) => (
                                                    <Radio.Group
                                                        name="genderGroup"
                                                        value={value || userData.gender}
                                                        className="flex flex-row"

                                                        onChange={(nextValue) => onChange(nextValue)}
                                                    >
                                                        <Radio value="male" >Male</Radio>
                                                        <Radio value="female" ml={2}>Female</Radio>
                                                        <Radio value="other" ml={2}>Other</Radio>
                                                    </Radio.Group>
                                                )}
                                            />
                                        </View>
                                        {errors.gender && <Text style={styles.error}>{errors.gender.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">Marital Status:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <View className="mx-1">
                                            <Controller
                                                control={control}
                                                name="marital_status"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <Select
                                                        placeholder="Select Marital Status"
                                                        selectedValue={value}
                                                        onValueChange={onChange}
                                                        _selectedItem={{
                                                            bg: "blue.300",
                                                            endIcon: <CheckIcon size="5" />,
                                                        }}
                                                    >
                                                        <Select.Item label="Married" value="married" />
                                                        <Select.Item label="Unmarried" value="unmarried" />
                                                        <Select.Item label="Widower" value="Widower" />
                                                        <Select.Item label="Widow" value="Widow" />
                                                        <Select.Item label="Divorcee" value="divorcee" />
                                                    </Select>
                                                )}
                                            />
                                        </View>
                                        {errors.marital_status && <Text style={styles.error}>{errors.marital_status.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">Date of Birth:</Text>
                                    </View>
                                    <View className="w-full mt-2">
                                        <Pressable onPress={() => setShowPicker(true)}>
                                            <View
                                                pointerEvents="none"
                                                className="w-full"
                                            >
                                                <Controller
                                                    control={control}
                                                    name="dob"
                                                    render={({ field: { value } }) => (
                                                        <TextInput
                                                            placeholder="Enter Date of Birth"
                                                            placeholderTextColor="grey"
                                                            style={styles.input}
                                                            value={new Date(value).toDateString()}
                                                            editable={false}
                                                        />
                                                    )}
                                                />
                                            </View>
                                        </Pressable>
                                        {showPicker && (
                                            <DateTimePicker
                                                value={dob}
                                                mode="date"
                                                display="spinner"
                                                onChange={onDateChange}
                                            />
                                        )}
                                        {errors.dob && <Text style={styles.error}>{errors.dob.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">Education:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="education"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder="Education"
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.education && <Text style={styles.error}>{errors.education.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">job:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="job"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder="job"
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.job && <Text style={styles.error}>{errors.job.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">Current Address:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="address"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder="Current Address"
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.address && <Text style={styles.error}>{errors.address.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">City:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="city"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder="City"
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.city && <Text style={styles.error}>{errors.city.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">State:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="state"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder="State"
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.state && <Text style={styles.error}>{errors.state.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">Pincode:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="pincode"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder="Pincode"
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                    keyboardType="numeric"
                                                />
                                            )}
                                        />
                                        {errors.pincode && <Text style={styles.error}>{errors.pincode.message}</Text>}
                                    </View>
                                </View>

                                <View className="mt-3 mb-6">
                                    <Button className="bg-blue-500 py-3 rounded-lg" title="Update Profile" onPress={handleSubmit(onSubmit)} />
                                </View>

                            </View>
                        </ScrollView>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        backgroundColor: '#F3F5F7',
        color: '#333',
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 10,
        shadowColor: '#423f40',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 0.2,
        marginHorizontal: 4,
        elevation: 4,
    },
    inputError: {
        borderColor: 'red',
    },
    error: {
        color: 'red',
        marginBottom: 16,
        marginHorizontal: 4,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});

export default EditUserProfile;