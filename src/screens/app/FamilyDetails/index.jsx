import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import AppIcon from '../../../components/AppIcon';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const FamilyTree = ({ data: person, navigation, paramsId, parent }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [userProfileDetail, setUserProfileDetail] = useState(null);
    const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);

    useFocusEffect(
        useCallback(() => {
            return () => {
                setIsProfilePopupVisible(false);
            };
        }, [])
    )

    const handlePress = () => {
        setIsExpanded(!isExpanded);
    };

    const openProfilePopup = (node) => {
        setUserProfileDetail(node)
        setIsProfilePopupVisible(true);
    };

    const handleNodePress = (node) => {
        if (node?.wife) {
            const nodeProfile = { _id: node._id, firstname: node.firstname, wife: node.wife }
            openProfilePopup(nodeProfile)
        } else {
            const userId = node._id
            navigation.navigate('NodeDetails', { userId, node, paramsId });
        }
    };

    const closeProfilePopup = () => {
        setUserProfileDetail(null)
        setIsProfilePopupVisible(false);
    };

    const viewUserProfile = () => {
        const userId = userProfileDetail._id
        navigation.navigate('NodeDetails', { userId, node: userProfileDetail, paramsId });
    };

    const viewUserWifeProfile = () => {
        const userId = userProfileDetail.wife._id
        navigation.navigate('NodeDetails', { userId, node: userProfileDetail, paramsId });
    };

    return (
        <>
            <TouchableOpacity
                style={styles.node}
                onPress={() => handleNodePress(person)}
                activeOpacity={0.9}
                className={`bg-white border rounded-lg p-2.5 mt-1.25 w-full max-w-lg shadow shadow-black dark:shadow-white`}
            >
                <View className="flex flex-row justify-between items-center">
                    <View className="flex flex-row items-center gap-3">
                        <AppIcon type="Feather" color={"black"} name="user" size={26} />
                        <View>
                            <View className="flex flex-row items-center gap-1 w-auto">
                                <Text className="text-base text-black font-bold capitalize basis-auto">{person.firstname}</Text>
                            </View>
                            <View>
                                {person.wife && (
                                    <Text className="italic text-black font-semibold mb-1.25 capitalize">
                                        Spouse: {person.wife.firstname}
                                    </Text>
                                )}
                                {person.relationship && <Text className="italic text-black font-semibold mb-1.25 capitalize">
                                    Father: {parent.firstname}
                                </Text>}
                            </View>
                        </View>
                    </View>
                    <View className="flex flex-row items-center gap-1.25">
                        {person.children && person.children.length > 0 && (
                            <TouchableOpacity onPress={handlePress} activeOpacity={0.8} className="p-1">
                                <AppIcon type="Feather" size={30} color={"black"} name={isExpanded ? 'chevron-up' : 'chevron-down'} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
            {isExpanded &&
                person.children &&
                person.children.map((child) => (
                    <View
                        key={child._id}
                        className="pl-5 mt-2.5 w-full"
                    >
                        <FamilyTree data={child} navigation={navigation} paramsId={paramsId} parent={person} />
                    </View>
                ))}
            <Modal
                transparent={true}
                visible={isProfilePopupVisible}
                onRequestClose={closeProfilePopup}
            >
                <View className="flex flex-1 flex-row justify-center items-center bg-[#00000080]">
                    <View className="bg-white w-auto px-10 py-2 rounded-lg items-center">
                        <TouchableOpacity onPress={viewUserProfile}>
                            <Text className="text-black text-lg p-1">View {userProfileDetail && userProfileDetail?.firstname}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={viewUserWifeProfile}>
                            <Text className="text-black text-lg p-1">View {userProfileDetail && userProfileDetail?.wife?.firstname}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={closeProfilePopup}>
                            <Text className="text-black text-lg p-1">Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )
};

const ViewFamilyTree = ({ navigation, route }) => {

    const paramsData = route.params;
    const [userData, setUserData] = useState("");
    const { allUserInfo } = useContext(GlobalContext);
    const { allDataOfFamilyById, state } = useContext(ApiContext);

    useEffect(() => {
        (async function () {
            try {
                if (paramsData?.id) {
                    const contentOfAllFamilyMembers = await allDataOfFamilyById(paramsData?.id);
                    setUserData(contentOfAllFamilyMembers);
                } else {
                    const contentOfAllFamilyMembers = await allDataOfFamilyById(allUserInfo._id);
                    setUserData(contentOfAllFamilyMembers);
                }

            } catch (error) {
                console.log("error", error);
            }
        })();
    }, [state.addFamilyMemberDetails, state.handleDeleteProfileUser, state.updateFamilyDetailsUser, paramsData]);

    return (

        <>
            <View style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>
                <FamilyTree data={userData} paramsId={paramsData?.id} navigation={navigation} />
            </View>
        </>
    );

};

const styles = {
    parentScrollViewStyle: {
        flex: 1,
    },
    childScrollViewStyle: {
        flex: 1,
    },
};

export default ViewFamilyTree;