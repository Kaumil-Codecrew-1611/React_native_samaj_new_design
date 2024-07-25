import { yupResolver } from '@hookform/resolvers/yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import { t } from 'i18next';
import { TextArea } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    ActivityIndicator,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import * as yup from 'yup';
import Button from '../../../components/Button';
import ApiContext from '../../../context/ApiContext';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    businessName: yup.string().required('Business name is required'),
    role: yup.string(),
    address: yup.string().required('Address is required'),
    businessEmail: yup.string().email('Invalid business email'),
    businessContactNumber: yup.string(),
    businessShortDetail: yup.string().required('Business short detail is required'),
    businessType: yup.string().required('Business type is required'),
    // businessLogo: yup.mixed().required('Business logo is required'),
});

const EditBusinessDetails = ({ route, navigation }) => {

    const businessCardId = route.params.businessId;
    const userId = route.params.userId;
    const templateId = route.params?.templateId
    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: yupResolver(schema)
    });
    const { handleEditBusinessCard, updateCardBusinessData } = useContext(ApiContext);
    const [loading, setLoading] = useState(false);
    const [pngImage, setPngImage] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const dateOfOpeningJob = watch('dateOfOpeningJob') || new Date();

    const pickImage = () => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo' }, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = response.assets[0];
                console.log(source, ":::source");

                // Check if the image has a 1:1 aspect ratio and is at least 200x200 pixels
                const aspectRatio = source.width / source.height;
                if (aspectRatio === 1 && source.width >= 200 && source.height >= 200) {
                    setPngImage(source.uri);
                    setValue('businessLogo', source, { shouldValidate: true });
                } else {
                    alert('Invalid Image', 'Please upload an image with a 1:1 aspect ratio and a minimum size of 200x200 pixels.');
                }
            }
        });
    };

    /* 
    const pickImage = () => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo' }, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = response.assets[0];
                console.log(source, ":::source");

                // Check if the image has a 1:1 aspect ratio and is at least 200x200 pixels
                const aspectRatio = source.width / source.height;
                if (aspectRatio === 1 && source.width >= 200 && source.height >= 200) {
                    setPngImage(source.uri);
                    setValue('businessLogo', source, { shouldValidate: true });
                } else {
                    alert('Invalid Image', 'Please upload an image with a 1:1 aspect ratio and a minimum size of 200x200 pixels.');
                }
            }
        });
    };
    
    */

    const onDateChange = (event, selectedDate) => {
        if (selectedDate !== undefined) {
            setShowPicker(false);
            const currentDate = new Date(selectedDate);
            setValue('dateOfOpeningJob', currentDate);
        }
    };

    useEffect(() => {
        (async function () {
            try {
                const contentBusinessCard = await handleEditBusinessCard(businessCardId);
                if (contentBusinessCard.businessData) {
                    const data = contentBusinessCard.businessData;
                    setValue('name', data.name);
                    setValue('businessName', data.businessName);
                    setValue('address', data.address);
                    setValue('businessEmail', data.businessEmail);
                    setValue('businessContactNumber', data.businessContactNumber?.toString());
                    setValue('phoneNumber2', data.phoneNumber2);
                    setValue('businessShortDetail', data.businessShortDetail);
                    setValue('businessLongDetail', data.businessLongDetail);
                    setValue('businessWebsite', data.businessWebsite);
                    setValue('businessType', data.businessType);
                    setValue('role', data.role);
                    setValue('status', data.status);

                    setValue('businessLogo', process.env.IMAGE_URL + data.businessLogo)
                    setPngImage(process.env.IMAGE_URL + data.businessLogo)
                    if (data.dateOfOpeningJob) {
                        setValue('dateOfOpeningJob', new Date(data.dateOfOpeningJob));
                    }
                }

            } catch (error) {
                console.log("Error in getting details business edit", error)
            }
        })();
    }, []);

    const onSubmit = async (data) => {

        try {
            setLoading(true);
            const formData = new FormData();
            data?.address && formData.append('address', data.address);
            data?.businessContactNumber && formData.append('businessContactNumber', data.businessContactNumber);
            data?.businessEmail && formData.append('businessEmail', data.businessEmail);
            data?.businessLongDetail && formData.append('businessLongDetail', data.businessLongDetail);
            data?.businessName && formData.append('businessName', data.businessName);
            data?.businessShortDetail && formData.append('businessShortDetail', data.businessShortDetail);
            data?.businessType && formData.append('businessType', data.businessType);
            data?.businessWebsite && formData.append('businessWebsite', data.businessWebsite);
            data?.dateOfOpeningJob && formData.append('dateOfOpeningJob', String(data.dateOfOpeningJob));
            data?.facebook && formData.append('facebook', data.facebook);
            data?.instagram && formData.append('instagram', data.instagram);
            data?.linkedIn && formData.append('linkedIn', data.linkedIn);
            data?.name && formData.append('name', data.name);
            data?.phoneNumber2 && formData.append('phoneNumber2', data.phoneNumber2);
            data?.role && formData.append('role', data.role);
            data?.twitter && formData.append('twitter', data.twitter);
            userId && formData.append('user_id', userId);
            templateId && formData.append('template_id', templateId);
            const businessLogo = {
                uri: data?.businessLogo?.uri ?? null,
                name: data?.businessLogo?.fileName ?? '',
                type: data?.businessLogo?.type ?? ''
            };
            data?.businessLogo?.uri && data.businessLogo?.type && data.businessLogo?.fileName && formData.append('businessLogo', businessLogo);

            await updateCardBusinessData(formData, businessCardId);
            if (data.status === "payment_pending") {
                navigation.navigate('BusinessSubscription', { businessId: businessCardId, formData: data });
            } else {
                navigation.navigate('MyBusinessCardScreen');
            }

        } catch (error) {
            console.log("errorInSubmit", error)
        } finally {
            setLoading(false);
        }
    };

    return (

        <View className="bg-[#E9EDF7] w-full flex-1 px-3">
            <View className="w-full bg-white overflow-hidden flex-1 p-3 rounded-md mt-3 mb-4">

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
                                <View className="w-full flex flex-row mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Full Name: </Text>
                                    <Text className="text-red-600 text-[17px] h-3">*</Text>
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
                                    {errors.name && <Text className="text-red-600 mb-1">{errors.name.message}</Text>}
                                </View>
                            </View>

                            <View className="mt-1">
                                <View className="w-full flex flex-row mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Company Name:</Text>
                                    <Text className="text-red-600 text-[17px] h-3">*</Text>
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
                                    {errors.businessName && <Text className="text-red-600 mb-1">{errors.businessName.message}</Text>}
                                </View>
                            </View>

                            <View className="mt-1" >
                                <View className="w-full flex flex-row mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Company Address:</Text>
                                    <Text className="text-red-600 text-[17px] h-3">*</Text>
                                </View>

                                <View className="w-full mt-2">
                                    <Controller
                                        control={control}
                                        name="address"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextArea
                                                style={styles.textArea}
                                                placeholder="Address"
                                                placeholderTextColor="grey"
                                                className="py-6 border-none outline-none border-transparent"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                borderWidth={0}
                                                borderRadius={13}
                                                borderColor={'transparent'}
                                            />
                                        )}
                                    />
                                    {errors.address && <Text className="text-red-600 mb-1">{errors.address.message}</Text>}
                                </View>
                            </View>

                            <View className="mt-1">
                                <View className="w-full flex flex-row mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Business Email:</Text>
                                    <Text className="text-red-600 text-[17px] h-3">*</Text>
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
                                    {errors.businessEmail && <Text className="text-red-600 mb-1">{errors.businessEmail.message}</Text>}
                                </View>
                            </View>

                            <View className="mt-1">
                                <View className="w-full flex flex-row mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Business Contact Number:</Text>
                                    <Text className="text-red-600 text-[17px] h-3">*</Text>
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

                            <View className="mt-1">
                                <View className="w-full flex flex-row mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Business Logo</Text>
                                    <Text className="text-red-600 text-[17px] h-3">*</Text>
                                </View>
                                <TouchableOpacity onPress={pickImage} style={styles.logoContainer}>
                                    {pngImage ? (
                                        <Image source={{ uri: pngImage }} style={styles.logo} />
                                    ) : (
                                        <Feather name="image" style={styles.icon} />
                                    )}
                                </TouchableOpacity>
                                {/*  {errors.businessLogo && (
                                    <Text className="text-red-600 mb-1">{errors.businessLogo.message}</Text>
                                )} */}
                            </View>

                            <View className="mt-1">
                                <View className="w-full flex flex-row mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Business Short Description:</Text>
                                    <Text className="text-red-600 text-[17px] h-3">*</Text>
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
                                    {errors.businessShortDetail && <Text className="text-red-600 mb-1">{errors.businessShortDetail.message}</Text>}
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
                                            <TextArea
                                                style={styles.textArea}
                                                placeholder="Business Long Detail"
                                                placeholderTextColor="grey"
                                                className="py-6 border-none outline-none border-transparent"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                borderWidth={0}
                                                borderRadius={13}
                                                borderColor={'transparent'}
                                            />
                                        )}
                                    />
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
                                </View>
                            </View>

                            <View className="mt-1">
                                <View className="w-full flex flex-row mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Type Of Business:</Text>
                                    <Text className="text-red-600 text-[17px] h-3">*</Text>
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
                                    {errors.businessType && <Text className="text-red-600 mb-1">{errors.businessType.message}</Text>}
                                </View>
                            </View>

                            <View className="mt-1">
                                <View className="w-full flex flex-row mx-1">
                                    <Text className="font-extrabold text-base tracking-wider text-neutral-700">Business Role:</Text>
                                    <Text className="text-red-600 text-[17px] h-3">*</Text>
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
                                    {errors.role && <Text className="text-red-600 mb-1">{errors.role.message}</Text>}
                                </View>
                            </View>

                            <View style={styles.datePickerContainer}>
                                <View className="flex flex-row">
                                    <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">Date of Opening of Job:</Text>
                                    <Text className="text-red-600 text-[17px] h-3">*</Text>
                                </View>
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
                            </View>

                            <View className="mt-3 mb-6">
                                {loading ? (
                                    <View className="flex flex-row items-center justify-center bg-[#4e63ac] cursor-pointer p-2 rounded-lg">
                                        <Text className="mr-4 text-lg font-semibold text-white ">{t("Loading")}</Text>
                                        <ActivityIndicator size="large" color="white" />
                                    </View>
                                ) : (
                                    <Button
                                        className="bg-[#4e63ac] py-3 rounded-lg"
                                        title="Submit"
                                        onPress={handleSubmit(onSubmit)}
                                        disabled={loading}
                                    />
                                )}
                            </View>

                        </ScrollView>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
    textArea: {
        backgroundColor: '#eee',
        color: '#333',
        shadowColor: '#423f40',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 0.2,
        marginHorizontal: 0,
        elevation: 4,
    },
    datePickerContainer: {
        marginVertical: 10,
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

export default EditBusinessDetails;