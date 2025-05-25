import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {colors} from '../../common/colors';

export default function FooterSection() {
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>App Version 0.3.3</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        marginTop: hp(2),
        alignSelf: 'center',
        marginBottom: hp(0.5),
    },
    footerText: {
        color: colors.darkGrey,
        fontSize: wp(3.5),
    },
});
