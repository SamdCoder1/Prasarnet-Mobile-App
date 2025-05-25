import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {useBottomTabStore} from '../../store/bottomTabStore';
import {trigger} from 'react-native-haptic-feedback';
import {useNavigation} from '../../hooks/useNavigation';
import {DrawerParamList} from '../../types/routeTypes';
import {colors} from '../../common/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import EntypoIcons from 'react-native-vector-icons/Entypo';

interface MenuComponentProps {
    selectedMenu: keyof DrawerParamList; // Type the selectedMenu to match drawer param list keys
    menuName: string;
    activeTab: string;
    isCollapsible?: boolean;
    index?: number;
    menuIcon: React.ReactNode; // Adjust if you have a specific type for menu icons
}

function MenuComponent({selectedMenu, menuName, activeTab, menuIcon, isCollapsible = false, index}: MenuComponentProps) {
    const navigation = useNavigation();
    const options = {
        enableVibrateFallback: true,
    };

    const selectActiveTabs = useBottomTabStore(state => state.selectActiveTabs);
    // const tabs = useBottomTabStore(state => state.tabs);

    const navigateToPage = (page: keyof DrawerParamList, index: number | undefined) => {
        index !== undefined && selectActiveTabs(index);
        navigation.navigate('Home', {screen: page});
    };

    return (
        <View style={{marginLeft: wp(3), marginRight: wp(5)}}>
            <TouchableOpacity
                style={[
                    styles.dashboardSelectedView,
                    {
                        backgroundColor: activeTab === selectedMenu ? colors.transparentPrimary : colors.white,
                    },
                ]}
                onPress={() => {
                    navigateToPage(selectedMenu, index);
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {menuIcon}
                    <Text style={activeTab === selectedMenu ? styles.selectedDashboard : styles.dashbord}>{menuName}</Text>
                </View>
                <View>
                    <EntypoIcons name="chevron-right" size={wp(5)} color={activeTab === selectedMenu ? colors.primary : colors.darkGrey} />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    dashboardSelectedView: {
        flexDirection: 'row',
        marginVertical: 5,
        backgroundColor: colors.transparentPrimary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dashbord: {
        color: colors.darkGrey,
        fontSize: wp(4.5),
        alignSelf: 'center',
        paddingLeft: 10,
        // fontWeight: 'bold',
    },
    selectedDashboard: {
        color: colors.primary,
        fontSize: wp(4.5),
        alignSelf: 'center',
        paddingLeft: 10,
        // fontWeight: 'bold',
    },
});

export default memo(MenuComponent);
