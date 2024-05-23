import React, { useState } from 'react';
import { Dimensions, ScrollView, Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset, useSharedValue } from 'react-native-reanimated';

const FamilyDetailsPage = ({navigation}) => {
 


    const scrollRef = useAnimatedRef();
    const scrolloffset = useScrollViewOffset(scrollRef);

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrolloffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
                    ),

                },
                {
                    scale: interpolate(
                        scrolloffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [2, 1, 1]
                    )
                }
            ]
        }
    })
    const scrollY = useSharedValue(0);

    const headerHeight = useSharedValue(0);
    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: -scrollY.value }],
            height: headerHeight.value,
            opacity: interpolate(scrollY.value, [0, IMG_HEIGHT / 2], [1, 0]),
        };
    });

    /*  const handleScroll = (event) => {
         scrollY.value = event.nativeEvent.contentOffset.y;
     }; */
    const handleScroll = (event) => {
        scrollY.value = event.nativeEvent.contentOffset.y;
    };
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header, headerAnimatedStyle]}>
                <Text className="font-bold text-3xl">Your Header</Text>
            </Animated.View>
            <Animated.ScrollView onScroll={handleScroll} ref={scrollRef} scrollEventThrottle={16}>
                <View>
                    <Animated.Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGsmGhSaJcQOzDWEwYB31PkUQZTsCsW4YZmQYh6B2c7Q&s' }}
                        style={[styles.image, imageAnimatedStyle]} />

            <View style={styles.row}>
              <Text style={styles.familylabel}>{t('name')} : </Text>
              <Text style={styles.familyDetails}>
                {parentsData?.lastname} {parentsData?.firstname} {parentsData?.middlename}{' '}

              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.familylabel}>{t('personalid')} : </Text>
              <Text style={styles.familyDetails}>
                {parentsData?.personal_id}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.familylabel}>{t('dateofbirth')} : </Text>
              <Text style={styles.familyDetails}>{formattedDate}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.familylabel}>{t('age')} : </Text>
              <Text style={styles.familyDetails}>{parentsAge} years</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.familylabel}>{t('gender')} :</Text>
              <Text style={styles.familyDetails}>{parentsData?.gender}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.familylabel}>{t('education')} : </Text>
              <Text style={styles.familyDetails}>{parentsData?.education}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.familylabel}>{t('profession')} :</Text>
              <Text style={styles.familyDetails}>{parentsData?.job}</Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  const renderChildDetails = () => {
    return childData.length !== 0 ? (
      childData.map((child, index) => {
        const childAge = AgeCount(child?.dob);
        const formattedDate = moment(child?.dob).format('DD/MM/YYYY');
        return (
          <View key={index} style={styles.MainContainer}>
            <View style={styles.familyItem}>
              <Pressable
                style={styles.EditIcon}
                onPress={() =>
                  navigation.navigate('EditFamilyDetails', {
                    childId: child && child?._id,
                  })
                }>
                <MaterialCommunityIcons
                  name="account-edit-outline"
                  size={30}
                  color="#00000090"
                />
              </Pressable>


              <View style={styles.dropdownContent}>
                <View style={styles.headingRelation}>
                  <Text style={styles.FamilyName}>
                    {child && child?.relationship}
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <Text style={styles.familylabel}>{t('name')} : </Text>
                <Text style={styles.familyDetails}>
                  {child &&
                    child?.lastname +
                    ' ' +
                    child?.firstname +
                    ' ' +
                    child?.middlename}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.familylabel}>{t('dateofbirth')} : </Text>
                <Text style={styles.familyDetails}>{formattedDate}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.familylabel}>{t('age')} : </Text>
                <Text style={styles.familyDetails}>{childAge} years</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.familylabel}>{t('gender')} :</Text>
                <Text style={styles.familyDetails}>
                  {child && child?.gender}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.familylabel}>{t('education')} : </Text>
                <Text style={styles.familyDetails}>
                  {child && child?.education}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.familylabel}>{t('profession')} :</Text>
                <Text style={styles.familyDetails}>{child && child?.job}</Text>
              </View>
              <View style={styles.DeleteIcon}>
                <Pressable
                  // onPress={() => DeleteFamilyMember(child && child?._id)}
                  onPress={() => setShowModal(true)}>
                  <MaterialCommunityIcons
                    name="delete"
                    size={30}
                    color="#ff0000"
                  />
                </Pressable>
              </View>
            </View>
            {showModal && (
              <CustomModal
                showModal={showModal}
                setShowModal={setShowModal}
                onConfirm={() => DeleteFamilyMember(child && child?._id)}
                Title={t('confirm')}
                Message={t('deleteconfirm')}
              />
            )}
          </View>

        );
      })
    ) : (
      <View style={styles.blankcontainer}>
        <Text style={styles.blank}>{t('familymembersarenotavailable')}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {renderParentDetails()}
        {renderChildDetails()}
        {childData.length < 7 && (
          <Pressable
            style={styles.button}
            onPress={() =>
              navigation.navigate('FamilyRegister', {
                userId: parentsData?._id,
              })
            }>
            <MaterialCommunityIcons name="plus" size={25} color="#fff" />
            <Text style={styles.btnText}> {t('addnewfamilymembers')}</Text>
          </Pressable>
        )}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    padding: 15,
  },

  familyItem: {
    backgroundColor: '#bbe2ec',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  dropdownContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },

  EditIcon: {
    position: 'absolute',
    right: 7,
    top: 7,
  },
  DeleteIcon: {
    position: 'absolute',
    right: 7,
    bottom: 7,
  },

  FamilyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'capitalize',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  familylabel: {
    alignItems: 'flex-start',
    flexBasis: '45%',
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },

  familyDetails: {
    flexBasis: '55%',
    fontSize: 14,
    color: '#444',
    textTransform: 'capitalize',
  },

  container: {
    backgroundColor: '#dae4f0',
    height: '100%',
    width: '100%',
    paddingVertical: 20,
  },

  blankcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  blank: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    width: '90%',
  },

  button: {
    height: 50,
    backgroundColor: '#00a9ff',
    borderRadius: 6,
    elevation: 5,
    display: 'flex',
    flexDirection: 'row',
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 15,
  },

  btnText: {
    color: 'white',
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  // btnText: {
  //   color: '#fff',
  //   fontSize: 20,
  //   textTransform: 'uppercase',
  //   fontWeight: 'bold',
  // },
});

export default FamilyDetailsPage;
