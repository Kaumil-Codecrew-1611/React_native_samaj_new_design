import { CheckIcon, Select, Radio } from "native-base";
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from "../../../components/Button";

const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    middleName: yup.string().required('Middle Name is required'),
    password: yup.string().required('Password is required').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
    // dob: yup.date().nullable().required('Date of Birth is required'),
    village: yup.string().required('Village is required'),
    phoneNumber: yup.string().required('Phone Number is required').matches(/^[0-9]{10}$/, 'Phone Number must be exactly 10 digits'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    pincode: yup.string().required('Pincode is required').matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
    education: yup.string().required('Education is required'),
    profession: yup.string().required('Profession is required'),
    maritalStatus: yup.string().required('Marital Status is required'),
    gender: yup.string().required('Gender is required'),
});


const Register = () => {

    const navigation = useNavigation();
    const [locations, setLocations] = useState('');
    const [options, setOptions] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
    const [dob, setDob] = useState(new Date());

    // console.log(dob,'dob')
    useEffect(() => {
        fetchVillagesData();
    }, []);

    const fetchVillagesData = async () => {
        const response = [
            {
                "_id": "64956f9a074819de3e34ed24",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Aabvel / આબવેલ",
                "villageE": "Aabvel",
                "villageG": "આબવેલ"
            },
            {
                "_id": "64956f9a074819de3e34ed26",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Aambagam / આંબાગામ",
                "villageE": "Aambagam",
                "villageG": "આંબાગામ"
            },
            {
                "_id": "64956f9a074819de3e34ed54",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Aatsumba / આતસુંબા",
                "villageE": "Aatsumba",
                "villageG": "આતસુંબા"
            },
            {
                "_id": "64956f9a074819de3e34ed28",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Aboch / અબોચ",
                "villageE": "Aboch",
                "villageG": "અબોચ"
            },
            {
                "_id": "64956f9a074819de3e34ed27",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Alva / આલ્વા",
                "villageE": "Alva",
                "villageG": "આલ્વા"
            },
            {
                "_id": "64956f9a074819de3e34ed25",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Amiyapur / અમિયાપુર",
                "villageE": "Amiyapur",
                "villageG": "અમિયાપુર"
            },
            {
                "_id": "64956f9a074819de3e34ed29",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Atisar / આતિસર",
                "villageE": "Atisar",
                "villageG": "આતિસર"
            },
            {
                "_id": "64956f9a074819de3e34ed2a",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Bayad / બાયડ",
                "villageE": "Bayad",
                "villageG": "બાયડ"
            },
            {
                "_id": "64956f9a074819de3e34ed2d",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Bhukhel / ભુલેખ",
                "villageE": "Bhukhel",
                "villageG": "ભુલેખ"
            },
            {
                "_id": "64956f9a074819de3e34ed50",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Bhunglia / ભુંગલિયા",
                "villageE": "Bhunglia",
                "villageG": "ભુંગલિયા"
            },
            {
                "_id": "64956f9a074819de3e34ed2b",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Borol / બોરોલ",
                "villageE": "Borol",
                "villageG": "બોરોલ"
            },
            {
                "_id": "64956f9a074819de3e34ed2e",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "chaaran nikol / ચારણ નિકોલ",
                "villageE": "chaaran nikol",
                "villageG": "ચારણ નિકોલ"
            },
            {
                "_id": "64956f9a074819de3e34ed2f",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Chikhload / ચીખલોડ",
                "villageE": "Chikhload",
                "villageG": "ચીખલોડ"
            },
            {
                "_id": "64956f9a074819de3e34ed2c",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Choila / ચોઈલા",
                "villageE": "Choila",
                "villageG": "ચોઈલા"
            },
            {
                "_id": "64956f9a074819de3e34ed32",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Dantali / દંતાલી",
                "villageE": "Dantali",
                "villageG": "દંતાલી"
            },
            {
                "_id": "64956f9a074819de3e34ed30",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Demai / દેમાઈ",
                "villageE": "Demai",
                "villageG": "દેમાઈ"
            },
            {
                "_id": "64956f9a074819de3e34ed33",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Deroli /  દેરોલી",
                "villageE": "Deroli",
                "villageG": " દેરોલી"
            },
            {
                "_id": "64956f9a074819de3e34ed37",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Garod / ગરોડ",
                "villageE": "Garod",
                "villageG": "ગરોડ"
            },
            {
                "_id": "64956f9a074819de3e34ed35",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Ghdiya / ઘડીયા",
                "villageE": "Ghdiya",
                "villageG": "ઘડીયા"
            },
            {
                "_id": "64956f9a074819de3e34ed36",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Ghoua / ઘઉઆ",
                "villageE": "Ghoua",
                "villageG": "ઘઉઆ"
            },
            {
                "_id": "64956f9a074819de3e34ed38",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Hirapur / હીરાપુર",
                "villageE": "Hirapur",
                "villageG": "હીરાપુર"
            },
            {
                "_id": "64956f9a074819de3e34ed51",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Juna Muvada / જુના મુવાડા",
                "villageE": "Juna Muvada",
                "villageG": "જુના મુવાડા"
            },
            {
                "_id": "64956f9a074819de3e34ed3c",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "kaavath / કાવથ",
                "villageE": "kaavath",
                "villageG": "કાવથ"
            },
            {
                "_id": "64956f9a074819de3e34ed3a",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "kapadvanj / કપડવંજ",
                "villageE": "kapadvanj",
                "villageG": "કપડવંજ"
            },
            {
                "_id": "64956f9a074819de3e34ed3b",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "kathalal / કથલાલ",
                "villageE": "kathalal",
                "villageG": "કથલાલ"
            },
            {
                "_id": "64956f9a074819de3e34ed3e",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Laank / લાંક",
                "villageE": "Laank",
                "villageG": "લાંક"
            },
            {
                "_id": "64956f9a074819de3e34ed52",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Lal Pur / લાલ પુર",
                "villageE": "Lal Pur",
                "villageG": "લાલ પુર"
            },
            {
                "_id": "64956f9a074819de3e34ed3d",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Letar / લેટર",
                "villageE": "Letar",
                "villageG": "લેટર"
            },
            {
                "_id": "64956f9a074819de3e34ed3f",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Moti Zer / મોટી ઝેર",
                "villageE": "Moti Zer",
                "villageG": "મોટી ઝેર"
            },
            {
                "_id": "64956f9a074819de3e34ed40",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "nani zer / નાની ઝેર",
                "villageE": "nani zer",
                "villageG": "નાની ઝેર"
            },
            {
                "_id": "64956f9a074819de3e34ed41",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "narsangpur / નરસંગપુર",
                "villageE": "narsangpur",
                "villageG": "નરસંગપુર"
            },
            {
                "_id": "64956f9a074819de3e34ed43",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "pathoda / પથોડા",
                "villageE": "pathoda",
                "villageG": "પથોડા"
            },
            {
                "_id": "64956f9a074819de3e34ed31",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "penterpura / પેન્ટરપુરા",
                "villageE": "penterpura",
                "villageG": "પેન્ટરપુરા"
            },
            {
                "_id": "64956f9a074819de3e34ed34",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Phtepura / ફતેપુરા",
                "villageE": "Phtepura",
                "villageG": "ફતેપુરા"
            },
            {
                "_id": "64956f9a074819de3e34ed44",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "pirojpur / પિરોજપુર",
                "villageE": "pirojpur",
                "villageG": "પિરોજપુર"
            },
            {
                "_id": "64956f9a074819de3e34ed48",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Selgad / સેલગડ",
                "villageE": "Selgad",
                "villageG": "સેલગડ"
            },
            {
                "_id": "64956f9a074819de3e34ed45",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "shihora / શિહોરા",
                "villageE": "shihora",
                "villageG": "શિહોરા"
            },
            {
                "_id": "64956f9a074819de3e34ed49",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "sonipura / સોનીપુરા",
                "villageE": "sonipura",
                "villageG": "સોનીપુરા"
            },
            {
                "_id": "64956f9a074819de3e34ed47",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "suki / સુકી",
                "villageE": "suki",
                "villageG": "સુકી"
            },
            {
                "_id": "64956f9a074819de3e34ed46",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "sultanpur / સુલતાનપુર",
                "villageE": "sultanpur",
                "villageG": "સુલતાનપુર"
            },
            {
                "_id": "64956f9a074819de3e34ed4b",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Telnar / તેલનાર",
                "villageE": "Telnar",
                "villageG": "તેલનાર"
            },
            {
                "_id": "64956f9a074819de3e34ed4a",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "thvaad / થવાદ",
                "villageE": "thvaad",
                "villageG": "થવાદ"
            },
            {
                "_id": "64956f9a074819de3e34ed4d",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "vaantada / વાંટડા",
                "villageE": "vaantada",
                "villageG": "વાંટડા"
            },
            {
                "_id": "64956f9a074819de3e34ed4e",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "vadali / વડાલી",
                "villageE": "vadali",
                "villageG": "વડાલી"
            },
            {
                "_id": "64956f9a074819de3e34ed4c",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Vaghas / વાઘાસ",
                "villageE": "Vaghas",
                "villageG": "વાઘાસ"
            },
            {
                "_id": "64956f9a074819de3e34ed42",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Virmali / વિરમાલી",
                "villageE": "Virmali",
                "villageG": "વિરમાલી"
            },
            {
                "_id": "64956f9a074819de3e34ed4f",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "Vyas Vasana / વ્યાસ વાસણા",
                "villageE": "Vyas Vasana",
                "villageG": "વ્યાસ વાસણા"
            },
            {
                "_id": "64956f9a074819de3e34ed39",
                "city": "Ahmedabad / અમદાવાદ",
                "village": "zanda / ઝંડા",
                "villageE": "zanda",
                "villageG": "ઝંડા"
            }
        ]
        setOptions(response);
    };

    const getSelectedvalue = (locations) => {
        setLocations(locations);
    }

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    const onDateChange = (event, selectedDate) => {
        if (selectedDate !== undefined && selectedDate !== null) {
            console.log('s')
            const currentDate = selectedDate;
            setShowPicker(Platform.OS === 'ios');
            setDob(currentDate);
        } else {
            setShowPicker(Platform.OS === 'ios');
        }
    };

    // console.log(errors.dob, ';errors.dob ')

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
                        {options.map((value, index) => (
                            <Select.Item
                                key={`value-key-${index}`}
                                label={value.village}
                                value={value._id}
                            />
                        ))}
                    </Select>
                </View>
            </View>
            {locations !== "" ? (
                <View className="w-full bg-white flex-1 rounded-md p-3">
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
                                    <View className="my-1">
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

                                    <View className="my-1">
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

                                    <View className="my-1">
                                        <View className="w-full">
                                            <Text className="font-extrabold text-base tracking-wider text-neutral-700">Middle Name:</Text>
                                        </View>
                                        <View className=" w-full mt-2">
                                            <Controller
                                                control={control}
                                                name="middleName"
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
                                            {errors.middleName && <Text style={styles.error}>{errors.middleName.message}</Text>}
                                        </View>
                                    </View>

                                    <View className="my-1">
                                        <View className="w-full">
                                            <Text className="font-extrabold text-base tracking-wider text-neutral-700">Password :</Text>
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
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">Date of Birth:</Text>
                                        <Pressable onPress={() => setShowPicker(true)}>
                                            <TextInput
                                                style={[
                                                    styles.input,
                                                    { color: dob ? 'black' : 'grey' },
                                                ]}
                                                placeholder="Select Date of Birth"
                                                placeholderTextColor="grey"
                                                value={dob ? dob.toDateString() : ''}
                                                editable={false}
                                            />
                                        </Pressable>
                                        {showPicker && (
                                            <DateTimePicker
                                                value={dob}
                                                mode="date"
                                                display="default"
                                                onChange={onDateChange}
                                            />
                                        )}
                                        {errors.dob && <Text style={styles.error}>{errors.dob.message}</Text>}
                                    </View>

                                    <View className="my-1">
                                        <View className="w-full">
                                            <Text className="font-extrabold text-base tracking-wider text-neutral-700">Phone Number:</Text>
                                        </View>
                                        <View className=" w-full mt-2">
                                            <Controller
                                                control={control}
                                                name="phoneNumber"
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
                                            {errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber.message}</Text>}
                                        </View>
                                    </View>

                                    <View className="my-1">
                                        <View className="w-full">
                                            <Text className="font-extrabold text-base tracking-wider text-neutral-700">Current Address:</Text>
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
                                            <Text className="font-extrabold text-base tracking-wider text-neutral-700">City:</Text>
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
                                            <Text className="font-extrabold text-base tracking-wider text-neutral-700">State:</Text>
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
                                            <Text className="font-extrabold text-base tracking-wider text-neutral-700">Pincode:</Text>
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

                                    <View className="my-1">
                                        <View className="w-full">
                                            <Text className="font-extrabold text-base tracking-wider text-neutral-700">Profession:</Text>
                                        </View>
                                        <View className=" w-full mt-2">
                                            <Controller
                                                control={control}
                                                name="profession"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <TextInput
                                                        placeholder="Profession"
                                                        placeholderTextColor="grey"
                                                        style={styles.input}
                                                        value={value}
                                                        onBlur={onBlur}
                                                        onChangeText={(text) => onChange(text)}
                                                    />
                                                )}
                                            />
                                            {errors.profession && <Text style={styles.error}>{errors.profession.message}</Text>}
                                        </View>
                                    </View>

                                    <View className="my-1">
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

                                    <View className="my-1">
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

            ) : null}

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        // width: '100%',
        backgroundColor: '#F3F5F7',
        color: '#333',
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 15,
        shadowColor: '#423f40',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 0.2,
        marginHorizontal: 5,
        elevation: 4,
    },
    inputError: {
        borderColor: 'red',
    },
    error: {
        color: 'red',
        marginBottom: 16,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});

export default Register;


