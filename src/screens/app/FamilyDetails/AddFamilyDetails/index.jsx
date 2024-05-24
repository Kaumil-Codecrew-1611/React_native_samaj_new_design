
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View, Pressable, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Select, Radio, CheckIcon } from "native-base";
import * as yup from 'yup';
import Button from '../../../../components/Button';

const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    education: yup.string().required('Education is required'),
    address: yup.string().required('Address is required'),
    job: yup.string().required('Job is required'),
    relation: yup.string().required('Relation is required'),
    maritalStatus: yup.string().required('Marital Status is required'),
    gender: yup.string().required('Gender is required'),
});

export default function AddFamilyDetails({ route }) {
    const id = route.params;

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmit = (data) => {
        console.log(data);
    };


    return (
        <View className="bg-[#EFF6F9] w-full flex-1 px-3">
            {/*   <View className="w-full my-4 p-1 mt-2">
                <View className="w-full">
                    <Text className="font-extrabold text-2xl tracking-wider text-neutral-700">Registration form</Text>
                </View>
            </View> */}

            <View className="w-full bg-white flex-1 p-3 rounded-md mt-3 mb-4">
                <Text className="font-extrabold tracking-wider  text-2xl text-rose-700">
                    Fill the details
                </Text>
                <View className="w-full my-3 bg-neutral-700 h-[2px]"></View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                            <View>
                                <View >
                                    <View className="w-full">
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">First Name:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="firstName"
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
                                        {errors.firstName && <Text style={styles.error}>{errors.firstName.message}</Text>}
                                    </View>
                                </View>

                                <View >
                                    <View className="w-full">
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">Last Name:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="lastName"
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
                                        {errors.lastName && <Text style={styles.error}>{errors.lastName.message}</Text>}
                                    </View>
                                </View>

                                <View >
                                    <View className="w-full">
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">Education:</Text>
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

                                <View >
                                    <View className="w-full">
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">Address :</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="address"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder="Address"
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

                                <View >
                                    <View className="w-full">
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">Job :</Text>
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

                                <View >
                                    <View className="w-full">
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">Marital Status:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="maritalStatus"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Select
                                                    placeholder="Select Marital Status"
                                                    selectedValue={value}
                                                    onValueChange={(itemValue) => onChange(itemValue)}
                                                    _selectedItem={{
                                                        bg: "blue.300",
                                                        endIcon: <CheckIcon size="5" />,
                                                    }}
                                                    style={styles.select}
                                                >
                                                    <Select.Item label="Marital Status" value="maritalStatus" />
                                                    <Select.Item label="Married" value="married" />
                                                    <Select.Item label="Unmarried" value="unmarried" />
                                                    <Select.Item label="Widower" value="Widower" />
                                                    <Select.Item label="Widow" value="Widow" />
                                                    <Select.Item label="Divorcee" value="divorcee" />
                                                </Select>
                                            )}
                                        />
                                        {errors.maritalStatus && <Text style={styles.error}>{errors.maritalStatus.message}</Text>}
                                    </View>
                                </View>

                                <View >
                                    <View className="w-full">
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">Relation:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="relation"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Select
                                                    placeholder="Select Relation"
                                                    selectedValue={value}
                                                    onValueChange={(itemValue) => onChange(itemValue)}
                                                    _selectedItem={{
                                                        bg: "blue.300",
                                                        endIcon: <CheckIcon size="5" />,
                                                    }}
                                                    style={styles.select}
                                                >
                                                    <Select.Item label="Wife" value="wife" />
                                                    <Select.Item label="son" value="son" />

                                                </Select>
                                            )}
                                        />
                                        {errors.relation && <Text style={styles.error}>{errors.relation.message}</Text>}
                                    </View>
                                </View>


                                <View >
                                    <View className="w-full">
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">Gender:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="gender"
                                            render={({ field: { onChange, value } }) => (
                                                <Radio.Group
                                                    name="genderGroup"
                                                    value={value}
                                                    className="flex flex-row "
                                                    onChange={(nextValue) => onChange(nextValue)}
                                                >
                                                    <Radio value="male" my={1}>Male</Radio>
                                                    <Radio value="female" my={1} ml={2}>Female</Radio>
                                                    <Radio value="other" my={1} ml={2}>Other</Radio>
                                                </Radio.Group>
                                            )}
                                        />
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

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        width: '100%',
        backgroundColor: '#F3F5F7',
        color: '#333',
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 5,
        shadowColor: '#423f40',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        marginHorizontal: 2,
        elevation: 4,
    },
    inputError: {
        borderColor: 'red',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});