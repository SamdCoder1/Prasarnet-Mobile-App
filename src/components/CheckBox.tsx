import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {colors} from '../common/colors';
import Octicons from 'react-native-vector-icons/Octicons';

interface CheckBoxProps {
    rememberMe: boolean;
    setRememberMe: any;
    title: string;
    value?: number;
    isDisable?: boolean;
}

export default function CheckBox({rememberMe, setRememberMe, title, value, isDisable}: CheckBoxProps) {
    return (
        <TouchableOpacity disabled={isDisable} style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => setRememberMe(value)}>
            {rememberMe ? (
                <Octicons name="check-circle-fill" size={wp(5.2)} color={colors.darkBlue} />
            ) : (
                <Image source={require('../assets/icons/circle.png')} style={[styles.rememberMeIcon, isDisable && {tintColor: colors.lightGrey}]} />
            )}
            <Text
                style={{
                    color: rememberMe ? colors.darkBlue : isDisable ? colors.lightGrey : colors.black,
                    marginLeft: 5,
                    fontSize: wp(3.5),
                    fontWeight: rememberMe ? '500' : 'normal',
                }}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    rememberMeIcon: {
        width: wp(5),
        height: wp(5),
    },
});
