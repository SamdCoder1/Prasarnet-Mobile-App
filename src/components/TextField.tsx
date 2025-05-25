import {
  StyleSheet,
  Text,
  TextInput,
  View,
  StyleProp,
  ViewStyle,
  Image,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../common/colors';
// import {useNavigation} from '../hooks/useNavigation';
import {useNavigation} from '@react-navigation/native';

interface TextFieldProps {
  customContainerStyle?: StyleProp<ViewStyle>;
  customTextInputContainerStyle?: StyleProp<ViewStyle>;
  customLabelStyle?: StyleProp<TextStyle>;
  customStyle?: StyleProp<ViewStyle>;
  editable?: boolean;
  label?: string;
  isLabelActive?: boolean;
  placeholder: string;
  value: string | undefined;
  isPassword?: boolean;
  isNumeric?: boolean;
  isEmail?: boolean;
  isNecessary?: boolean;
  errorValue?: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  isGooglePlacesEnabled?: boolean;
  navigationProps?: any;
  multiline?: boolean;
  numberOfLine?: number;
}

function TextField({
  customContainerStyle,
  customTextInputContainerStyle,
  customLabelStyle,
  customStyle,
  editable = true,
  label,
  isLabelActive = false,
  placeholder,
  value,
  errorValue,
  isPassword = false,
  isNumeric = false,
  isEmail = false,
  isNecessary = false,
  onChangeText,
  onBlur,
  isGooglePlacesEnabled = false,
  navigationProps,
  multiline = false,
  numberOfLine = 1,
}: TextFieldProps) {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(isPassword);

  // Synchronize isVisible with isPassword changes
  useEffect(() => {
    setIsVisible(isPassword);
  }, [isPassword]);

  console.log('isVisible', isVisible);

  return (
    <View style={customContainerStyle}>
      {isLabelActive && (
        <Text style={customLabelStyle || styles.label}>
          {label}
          {isNecessary && <Text style={{color: 'red'}}> *</Text>}
        </Text>
      )}

      <View
        style={[
          styles.textInputContainer,
          customTextInputContainerStyle,
          {
            borderColor: errorValue ? 'red' : colors.grey,
            opacity: editable ? 1 : 0.5,
          },
        ]}>
        <TextInput
          style={[customStyle || styles.textInput]}
          value={value}
          //   editable={editable}
          placeholder={`${placeholder} ${isNecessary ? '(Required)' : ''}`}
          placeholderTextColor={colors.darkGrey}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={isVisible}
          keyboardType={
            isNumeric ? 'numeric' : isEmail ? 'default' : 'email-address'
          }
          multiline={multiline}
          numberOfLines={numberOfLine}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => {
              setIsVisible(!isVisible);
            }}>
            {isVisible ? (
              <Image
                source={require('../assets/icons/hidden.png')}
                style={styles.passIcon}
              />
            ) : (
              <Image
                source={require('../assets/icons/eye.png')}
                style={[styles.passIcon, {tintColor: colors.black}]}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      {errorValue && (
        <Text style={{color: 'red', fontSize: wp(3), marginTop: 5}}>
          * {errorValue}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: wp(3),
    marginBottom: 5,
    color: colors.lightBlack,
    // fontWeight: '500',
  },
  textInputContainer: {
    height: hp(5),
    backgroundColor: colors.white,
    borderWidth: wp(0.2),
    borderRadius: 10,
    paddingHorizontal: 10,
    // elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    color: colors.black,
    fontSize: wp(3.7),
  },
  passIcon: {
    width: wp(6),
    height: wp(6),
    tintColor: colors.grey,
  },
  placeholderStyle: {
    fontSize: wp(3.5),
    color: colors.lightBlack,
  },
  googlePlaceValue: {
    fontSize: wp(3.5),
    color: colors.black,
  },
  googlePlaceContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
});

export default React.memo(TextField);
