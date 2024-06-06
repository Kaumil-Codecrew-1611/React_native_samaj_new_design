import { yupResolver } from '@hookform/resolvers/yup';
import { CheckIcon, Radio, Select } from "native-base";
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import * as yup from 'yup';
import Button from '../../../../components/Button';
import ApiContext from '../../../../context/ApiContext';
import { GlobalContext } from '../../../../context/globalState';

const schema = yup.object().shape({
    firstname: yup.string().required('First Name is required'),
    lastname: yup.string().required('Last Name is required'),
    education: yup.string().required('Education is required'),
    address: yup.string().required('Address is required'),
    job: yup.string().required('Job is required'),
    relationship: yup.string().required('Relation is required'),
    marital_status: yup.string().required('Marital Status is required'),
    gender: yup.string().required('Gender is required'),
    parent_id: yup.string().required('Parent ID is required'),
    payment_id: yup.string().required('Payment ID is required'),
});

export default function AddFamilyDetails({ navigation, route }) {
    const { addFamilyMemberDetails, allRelationshipDataList } = useContext(ApiContext);
    const { allUserInfo } = useContext(GlobalContext);
    const [relationData, setRelationData] = useState([]);
    const { parent_id } = route.params;
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            gender: "",
            parent_id: parent_id,
            payment_id: allUserInfo?.payment_id,
        }
    });

    const onSubmit = async (data) => {
        addFamilyMemberDetails(data);
        navigation.navigate('ViewFamilyDetails');
    };

    useEffect(() => {
        (async function () {
            try {
                const allRelationData = await allRelationshipDataList();
                setRelationData(allRelationData.relationship || []);
            } catch (error) {
                console.error("Error fetching relation data:", error);
            }
        })();
    }, []);

    return (
        <View className="bg-[#EFF6F9] w-full flex-1 px-3">
            <View className="w-full bg-white flex-1 p-3 rounded-md mt-3 mb-4">
                <Text className="font-extrabold tracking-wider mx-1 text-2xl text-rose-700">
                    Fill the details
                </Text>
                <View className="w-full mx-1 my-3 bg-neutral-700 h-[2px]"></View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                            <View>
                                <View>
                                    <View className="w-full mx-1">
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">First Name:</Text>
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

                                <View>
                                    <View className="w-full mx-1">
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">Last Name:</Text>
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

                                <View>
                                    <View className="w-full mx-1">
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

                                <View>
                                    <View className="w-full mx-1">
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">Address:</Text>
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
                                <View>
                                    <View className="w-full mx-1">
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">Job:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="job"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder="Job"
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
                                <View>
                                    <View className="w-full mx-1">
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">Marital Status:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <View className="mx-1 mb-2">
                                            <Controller
                                                control={control}
                                                name="marital_status"
                                                render={({ field: { onChange, value } }) => (
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
                                                        <Select.Item label="Married" value="married" />
                                                        <Select.Item label="Unmarried" value="unmarried" />
                                                        <Select.Item label="Widower" value="widower" />
                                                        <Select.Item label="Widow" value="widow" />
                                                        <Select.Item label="Divorcee" value="divorcee" />
                                                    </Select>
                                                )}
                                            />
                                        </View>
                                        {errors.marital_status && <Text style={styles.error}>{errors.marital_status.message}</Text>}
                                    </View>
                                </View>
                                <View className=" w-full mt-2">
                                    <View className="mx-1 mb-2">
                                        <Controller
                                            control={control}
                                            name="relationship"
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    placeholder="Select Relationship"
                                                    selectedValue={value}
                                                    onValueChange={(itemValue) => onChange(itemValue)}
                                                    _selectedItem={{
                                                        bg: "blue.300",
                                                        endIcon: <CheckIcon size="5" />,
                                                    }}
                                                    style={styles.select}
                                                >
                                                    {relationData.length > 0 ? (
                                                        relationData.map((relation) => (
                                                            <Select.Item key={relation.value} label={relation.keyE} value={relation.value} />
                                                        ))
                                                    ) : (
                                                        <Select.Item label="Loading..." value="" isDisabled />
                                                    )}
                                                </Select>
                                            )}
                                        />
                                    </View>
                                    {errors.relationship && <Text style={styles.error}>{errors.relationship.message}</Text>}
                                </View>
                                <View>
                                    <Controller
                                        control={control}
                                        name="parent_id"
                                        render={({ field: { value } }) => (
                                            <TextInput
                                                style={{ display: 'none' }}
                                                value={value}
                                            />
                                        )}
                                    />
                                </View>
                                <View>
                                    <Controller
                                        control={control}
                                        name="payment_id"
                                        render={({ field: { value } }) => (
                                            <TextInput
                                                style={{ display: 'none' }}
                                                value={value}
                                            />
                                        )}
                                    />
                                </View>
                                <View>
                                    <View className="w-full mx-1">
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">Gender:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <View className="mx-1 mb-2">
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
                                                        <Radio value="male" my={1}>Male</Radio>
                                                        <Radio value="female" my={1} ml={2}>Female</Radio>
                                                        <Radio value="other" my={1} ml={2}>Other</Radio>
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
        </View>
    );
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
        marginBottom: 7,
        shadowColor: '#423f40',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 0.2,
        marginHorizontal: 4,
        elevation: 4,
    },
    error: {
        color: 'red',
        marginBottom: 12,
        marginHorizontal: 4,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    select: {
        marginBottom: 7,
    },
});
