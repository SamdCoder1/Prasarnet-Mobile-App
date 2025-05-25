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
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../common/colors';

interface TextFieldProps {
  customContainerStyle?: StyleProp<ViewStyle>;
  customTextInputContainerStyle?: StyleProp<ViewStyle>;
  customLabelStyle?: StyleProp<TextStyle>;
  customStyle?: StyleProp<ViewStyle>;
  editable?: boolean;
  label?: string;
  placeholder: string;
  value: string | undefined;
  isNumeric?: boolean;
  isPassword?: boolean;
  isNecessary?: boolean;
  errorValue?: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
}

export default function TextField2({
  customContainerStyle,
  customTextInputContainerStyle,
  customLabelStyle,
  customStyle,
  editable = true,
  label,
  placeholder,
  value,
  errorValue,
  isNumeric = false,
  isPassword = false,
  isNecessary = false,
  onChangeText,
  onBlur,
}: TextFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(false);

  const onFocus = () => {
    setActive(true);
  };

  const blurFucntion = () => {
    onBlur && onBlur(), setActive(false);
  };

  return (
    <View style={customContainerStyle}>
      <Text
        style={[
          customLabelStyle || styles.label,
          {color: active ? colors.primary : colors.lightBlack},
        ]}>
        {label}
        {isNecessary && <Text style={{color: 'red'}}> *</Text>}
      </Text>
      <View
        style={[
          styles.textInputContainer,
          customTextInputContainerStyle,
          {
            borderColor: errorValue ? 'red' : colors.primary,
            opacity: editable ? 1 : 0.6,
            borderWidth: active ? wp(0.5) : wp(0.3),
          },
        ]}>
        <TextInput
          style={[customStyle || styles.textInput]}
          value={value}
          editable={editable}
          placeholder={placeholder}
          placeholderTextColor={colors.grey}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={blurFucntion}
          secureTextEntry={isVisible}
          keyboardType={isNumeric ? 'numeric' : 'default'}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            {isVisible ? (
              <Image
                source={require('../assets/icons/eye.png')}
                style={styles.passIcon}
              />
            ) : (
              <Image
                source={require('../assets/icons/hidden.png')}
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
    fontSize: wp(4),
    marginBottom: hp(1),
    fontWeight: 'bold',
    marginLeft: wp(2),
  },
  textInputContainer: {
    backgroundColor: colors.white,
    borderWidth: wp(0.3),
    paddingHorizontal: wp(2.6),
    flexDirection: 'row',
    paddingBottom: 0,
    borderRadius: wp(2.5),
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: wp(4),
    paddingVertical: hp(1.5),
    // marginLeft: wp(2),
  },
  passIcon: {
    width: wp(6),
    height: wp(6),
    tintColor: colors.lightBlack,
    marginRight: wp(2),
  },
});
