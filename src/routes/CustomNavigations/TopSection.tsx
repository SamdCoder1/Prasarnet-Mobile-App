import {Alert, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {colors} from '../../common/colors';
import {useAuthStore} from '../../store/authStore';
import {useNavigation} from '../../hooks/useNavigation';

export default function TopSection() {
    const updatedUserData = useAuthStore(state => state.updatedUserData);
    const navigation = useNavigation();
    const logout = useAuthStore(state => state.logout);

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 20,
            }}>
            <Image
                source={require('../../assets/images/logo.png')}
                style={{
                    width: wp(24),
                    height: hp(6.5),
                    marginLeft: wp(3),
                }}
            />

            <View
                style={{
                    flexDirection: 'row',
                    gap: wp(3),
                    alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('MY PROFILE')}>
                    <Image source={{uri: updatedUserData?.imgLink}} style={styles.personIcon} resizeMethod="scale" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => {
                        Alert.alert('Logout', 'Are you sure you want to logout?', [
                            {
                                text: 'Cancel',
                                onPress: () => {},
                                style: 'cancel',
                            },
                            {
                                text: 'Ok',
                                onPress: () => {
                                    logout();
                                    navigation.navigate('DASHBOARD');
                                },
                            },
                        ]);
                    }}>
                    <AntDesignIcon name="logout" size={wp(5)} color={colors.primary} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        height: wp(11),
        width: wp(11),
        borderRadius: wp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.6,
        borderColor: colors.grey,
        marginRight: wp(3),
    },
    personIcon: {
        width: wp(11),
        height: wp(11),
        borderRadius: wp(6), // Circular icon
        elevation: 2,
        borderWidth: wp(0.01),
    },
});
