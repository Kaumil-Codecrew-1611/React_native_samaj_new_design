import { yupResolver } from '@hookform/resolvers/yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CheckIcon, Radio, Select } from "native-base";
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import * as yup from 'yup';
import Button from "../../../components/Button";
import ApiContext from "../../../context/ApiContext";
import { GlobalContext } from "../../../context/globalState";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EditUserProfile = ({ navigation }) => {
    const { t } = useTranslation();
    const { getLocation, updateUserProfileUser, updateUserPostProfile } = useContext(ApiContext);
    const { allUserInfo, setuserDataInStorage } = useContext(GlobalContext);
    const [userData, setUserData] = useState({});
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        getLocation();
    }, []);

    const schema = yup.object().shape({
        firstname: yup.string().required(t('pleaseenterfirstname')),
        lastname: yup.string().required(t('pleaseenterlastname')),
        middlename: yup.string().required(t('pleaseentermiddlename')),
        email: yup.string()
            .matches(emailRegex, t('Invalidemailaddress'))
            .required(t('pleaseenteremail')),
        mobile_number: yup.string().required(t('pleaseentermobilenumber')).matches(/^[0-9]{10}$/, t('pleaseenteravalidmobilenumber')),
        address: yup.string().required(t('pleaseenteraddress')),
        city: yup.string().required(t('pleaseentercity')),
        state: yup.string().required(t('pleaseenterstate')),
        pincode: yup.string().required(t('pleaseenterpincode')).matches(/^[0-9]{6}$/, t('pleaseenteravalidpincodenumber')),
        education: yup.string().required(t('pleaseentereducation')),
        job: yup.string().required(t('pleaseenterjob')),
        gender: yup.string().required(t('pleaseentergender')),
    });

    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            dob: new Date(),
            gender: '',
            marital_status: '',
        }
    });

    const dob = watch('dob') || new Date();

    const onSubmit = async (data) => {
        const payload = {
            id: allUserInfo._id,
            data: data
        }
        const response = await updateUserPostProfile(payload)
        if (response.status) {
            await setuserDataInStorage('user', response.newsave);
            navigation.navigate('Profile');
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
                    {t("EditProfile")}
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
                                        <Text className="font-extrabold  text-base tracking-wider text-neutral-700">{t('firstname')}:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="firstname"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('firstname')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.firstname && <Text className="text-red-500 mb-[16px] mx-[4px]">{errors.firstname.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('lastname')}</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="lastname"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('lastname')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.lastname && <Text className="text-red-500 mb-[16px] mx-[4px]">{errors.lastname.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('middlename')}:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="middlename"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('middlename')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.middlename && <Text className="text-red-500 mb-[16px] mx-[4px]">{errors.middlename.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('email')}:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="email"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('email')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.email && <Text className="text-red-500 mb-[16px] mx-[4px]">{errors.email.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('mobile')}:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="mobile_number"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('mobile')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                    keyboardType="numeric"
                                                />
                                            )}
                                        />
                                        {errors.mobile_number && <Text className="text-red-500 mb-[16px] mx-[4px]">{errors.mobile_number.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('gender')}:</Text>
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
                                                        <Radio value="male" >{t('male')}</Radio>
                                                        <Radio value="female" ml={2}>{t('famale')}</Radio>
                                                        <Radio value="other" ml={2}>{t('other')}</Radio>
                                                    </Radio.Group>
                                                )}
                                            />
                                        </View>
                                        {errors.gender && <Text className="text-red-500 mb-[16px] mx-[4px]">{errors.gender.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('maritalstatus')}:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <View className="mx-1">
                                            <Controller
                                                control={control}
                                                name="marital_status"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <Select
                                                        placeholder={t('maritalstatus')}
                                                        selectedValue={value}
                                                        onValueChange={onChange}
                                                        _selectedItem={{
                                                            bg: "blue.300",
                                                            endIcon: <CheckIcon size="5" />,
                                                        }}
                                                    >
                                                        <Select.Item label={t('married')} value="married" />
                                                        <Select.Item label={t('unmarried')} value="unmarried" />
                                                        <Select.Item label={t('widower')} value="Widower" />
                                                        <Select.Item label={t('widow')} value="Widow" />
                                                        <Select.Item label={t('divorcee')} value="divorcee" />
                                                    </Select>
                                                )}
                                            />
                                        </View>
                                        {errors.marital_status && <Text className="text-red-500 mb-[16px] mx-[4px]">{errors.marital_status.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('dateofbirth')}:</Text>
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
                                                            placeholder={t('pleaseenterdob')}
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
                                        {errors.dob && <Text className="text-red-500 mb-[16px] mx-[4px]">{errors.dob.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('education')}:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="education"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('education')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.education && <Text className="text-red-500 mb-[16px] mx-[4px]">{errors.education.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('job')}:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="job"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('job')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.job && <Text className="text-red-500 mb-[16px] mx-[4px]">{errors.job.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('address')}</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="address"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('address')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.address && <Text className="text-red-500 mb-[16px] mx-[4px]">{errors.address.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('city')}:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="city"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('address')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.city && <Text className="text-red-500 mb-[16px] mx-[4px]">{errors.city.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('state')}:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="state"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('state')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.state && <Text className="text-red-500 mb-[16px] mx-[4px]">{errors.state.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('pincode')}:</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="pincode"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('pincode')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                    keyboardType="numeric"
                                                />
                                            )}
                                        />
                                        {errors.pincode && <Text className="text-red-500 mb-[16px] mx-[4px]">{errors.pincode.message}</Text>}
                                    </View>
                                </View>

                                <View className="mt-3 mb-6">
                                    <Button className="bg-blue-500 py-3 rounded-lg" title={t('update')} onPress={handleSubmit(onSubmit)} />
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
    scrollViewContent: {
        flexGrow: 1,
    },
});

export default EditUserProfile;