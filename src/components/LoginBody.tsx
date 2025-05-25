import {
    ScrollView,
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';
import React from 'react';
import {colors} from '../common/colors';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

interface LoginBodyProps {
    children: React.ReactNode;
    customStyle?: StyleProp<ViewStyle>;
}

export default function LoginBody({children, customStyle}: LoginBodyProps) {
    return (
        <LinearGradient
            colors={[colors.white, colors.white, colors.backgroundColor]}
            style={[styles.bodyContainer, customStyle]}>
            <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                showsVerticalScrollIndicator={false}>
                {children}
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        // backgroundColor: colors.white,
        // marginTop: hp(5),
        // borderWidth: 1,
        borderColor: colors.primary,
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        paddingHorizontal: wp(12),
        // justifyContent: 'center',
        // alignItems: 'center',
    },
});
