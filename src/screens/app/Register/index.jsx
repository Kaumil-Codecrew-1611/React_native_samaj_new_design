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
    password: yup.string().required('Password is required').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
    mobile_number: yup.string().required('Phone Number is required').matches(/^[0-9]{10}$/, 'Phone Number must be exactly 10 digits'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    pincode: yup.string().required('Pincode is required').matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
    education: yup.string().required('Education is required'),
    job: yup.string().required('Job is required'),
    gender: yup.string().required('Gender is required'),
});

const Register = ({ navigation }) => {
    const { state, getLocation } = useContext(ApiContext);
    const { setRegisterData } = useContext(GlobalContext);
    const [locations, setLocations] = useState('');
    const [options, setOptions] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            gender: '',
        }
    });

    const dob = watch('dob') || new Date();

    useEffect(() => {
        getLocation()
    }, []);

    useEffect(() => {
        try {
            setOptions(state.locationData, "state.locationData ")
        } catch (error) {
            console.log("Error", error)
        }
    }, [state.locationData])

    const getSelectedvalue = (locations) => {
        setLocations(locations);
        setValue('locations_id', locations);
    }

    const onSubmit = (data) => {
        setRegisterData(data);
        navigation.navigate('Payment');
    };

    const onDateChange = (event, selectedDate) => {
        // Check if the user canceled the date selection
        if (selectedDate !== undefined) {
            setShowPicker(false);
            // Ensure currentDate is a Date object
            const currentDate = new Date(selectedDate);
            setValue('dob', currentDate);
        }
    };

    return (
        <View className="bg-[#EFF6F9] w-full flex-1 px-3">
            <View className="w-full my-4 p-1 mt-2">
                <View className="w-full">
                    <Text className="font-extrabold text-lg tracking-wider text-neutral-700">Select Village :</Text>
                </View>
                <View className="bg-white w-full mt-2 rounded-md">
                    <Select
                        borderWidth={0}
                        accessibilityLabel={'Select Village'}
                        placeholder={'Select Village'}
                        size={'lg'}
                        _selectedItem={{
                            bg: "blue.300",
                            endIcon: <CheckIcon size="5" />,
                        }}
                        selectedValue={locations}
                        onValueChange={(value) => {
                            getSelectedvalue(value || "")
                        }}
                        boxSize={3}
                    >
                        {options?.village?.map((value, index) => (
                            <Select.Item
                                key={`value-key-${index}`}
                                label={value.villageE}
                                value={value._id}
                            />
                        ))}
                    </Select>
                </View>
            </View>
            {locations !== "" ? (
                <View className="w-full bg-white flex-1 rounded-md p-3">
                    <Text className="font-extrabold tracking-wider ml-1 text-2xl text-rose-700">
                        Fill the details
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
                                                        value={value}
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
                                                        value={value}
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
                                                        value={value}
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
                                                        value={value}
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
                                            <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">Password :</Text>
                                        </View>
                                        <View className=" w-full mt-2">
                                            <Controller
                                                control={control}
                                                name="password"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <TextInput
                                                        placeholder="Password"
                                                        placeholderTextColor="grey"
                                                        style={styles.input}
                                                        value={value}
                                                        onBlur={onBlur}
                                                        onChangeText={(text) => onChange(text)}
                                                    />
                                                )}
                                            />
                                            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
                                        </View>
                                    </View>

                                    <View className="my-1">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">Date of Birth:</Text>
                                        <Pressable onPress={() => setShowPicker(true)} className="w-full mt-2">
                                            <Controller
                                                control={control}
                                                render={({ field: { onChange, onBlur, value } }) => {
                                                    let dateValue;
                                                    if (value instanceof Date) {
                                                        dateValue = value;
                                                    } else if (typeof value === 'string' || value instanceof String) {
                                                        dateValue = new Date(value);
                                                    } else {
                                                        dateValue = new Date();
                                                    }

                                                    return (
                                                        <TextInput
                                                            style={[
                                                                styles.input,
                                                                { color: dateValue ? 'black' : 'grey' },
                                                            ]}
                                                            placeholder="Select Date of Birth"
                                                            placeholderTextColor="grey"
                                                            value={dateValue ? dateValue.toDateString() : ''}
                                                            onBlur={onBlur}
                                                            disableFullscreenUI={true}
                                                            editable={false}
                                                        />
                                                    );
                                                }}
                                                name="dob"
                                            />
                                        </Pressable>
                                        {showPicker && (
                                            <DateTimePicker
                                                value={dob ? new Date(dob) : new Date()}
                                                mode="date"
                                                display="default"
                                                onChange={onDateChange}
                                            />
                                        )}
                                        {errors.dob && <Text style={styles.error}>{errors.dob.message}</Text>}
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
                                                        value={value}
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
                                                        value={value}
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
                                                        value={value}
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
                                                        value={value}
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
                                                        value={value}
                                                        onBlur={onBlur}
                                                        onChangeText={(text) => onChange(text)}
                                                        keyboardType="numeric"
                                                    />
                                                )}
                                            />
                                            {errors.pincode && <Text style={styles.error}>{errors.pincode.message}</Text>}
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
                                                        value={value}
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
                                                        value={value}
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
                                                            onValueChange={(itemValue) => onChange(itemValue)}
                                                            _selectedItem={{
                                                                bg: "blue.300",
                                                                endIcon: <CheckIcon size="5" />,
                                                            }}

                                                        >
                                                            <Select.Item label="Marital Status" value="marital_status" />
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
                                                            value={value}
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

                                    <View className="mt-3 mb-6">
                                        <Button className="bg-blue-500 py-3 rounded-lg" title="Register" onPress={handleSubmit(onSubmit)} />
                                    </View>

                                </View>
                            </ScrollView>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </View>

            ) : null
            }

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

export default Register;