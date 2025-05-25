import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useBottomTabStore} from '../../store/bottomTabStore';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../common/colors';
import {useNavigation} from '../../hooks/useNavigation';

function CustomTabBar() {
    const navigation = useNavigation();

    // GLOBAL STATES --------------------------------->
    const {tabs, selectActiveTabs, selectedTabs, activeRoute} = useBottomTabStore();

    function handleNavigation(index: number, route: string) {
        selectActiveTabs(index);
        navigation.navigate(route);
    }

    return (
        <View style={styles.tabBar}>
            <TouchableOpacity onPress={() => handleNavigation(0, tabs[0].name)} style={styles.iconContainer}>
                <IconIon name="home" size={wp(6)} color={activeRoute === tabs[0].name ? colors.primary : colors.darkGrey} />
                <Text
                    style={[
                        styles.tabText,
                        {
                            color: activeRoute === tabs[0].name ? colors.primary : colors.darkGrey,
                        },
                    ]}>
                    Dashboard
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigation(5, tabs[5].name)} style={[styles.iconContainer]}>
                <Image
                    source={require('../../assets/icons/appointment.png')}
                    style={{width: wp(6), height: wp(6)}}
                    tintColor={activeRoute === tabs[5].name ? colors.primary : colors.darkGrey}
                />
                <Text
                    style={[
                        styles.tabText,
                        {
                            color: activeRoute === tabs[5].name ? colors.primary : colors.darkGrey,
                        },
                    ]}>
                    Appointments
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigation(4, tabs[4].name)} style={[styles.iconContainer]}>
                <IconMaterialIcons name="health-and-safety" size={wp(6)} color={activeRoute === tabs[4].name ? colors.primary : colors.darkGrey} />
                <Text
                    style={[
                        styles.tabText,
                        {
                            color: activeRoute === tabs[4].name ? colors.primary : colors.darkGrey,
                        },
                    ]}>
                    Health Vault
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigation(3, tabs[3].name)} style={[styles.iconContainer]}>
                <IconIon name="person-add" size={wp(6)} color={activeRoute === tabs[3].name ? colors.primary : colors.darkGrey} />
                <Text
                    style={[
                        styles.tabText,
                        {
                            color: activeRoute === tabs[3].name ? colors.primary : colors.darkGrey,
                        },
                    ]}>
                    Family
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    tabText: {
        fontSize: wp(3),
        fontWeight: '600',
    },
    iconContainer: {
        // gap: wp(1),
        alignItems: 'center',
        width: wp(96 / 4),
        // paddingVertical: wp(1.5),
        // borderRadius: wp(10),
    },
});

export default CustomTabBar;
