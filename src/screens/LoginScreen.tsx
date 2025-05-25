import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  StyleSheet,
  Keyboard,
  BackHandler,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {colors} from '../common/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import GradientBackground from '../components/GradientBackground';
import Toast from 'react-native-simple-toast';
import {trigger} from 'react-native-haptic-feedback';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from 'react-native-reanimated';
import BigButton from '../components/BigButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import TextField2 from '../components/TextField2';
import LinearGradient from 'react-native-linear-gradient';

const options = {
  enableVibrateFallback: true,
};

// ZOD VALIDATION SCHEMA  ------------>
const loginSchema = z.object({
  phone_no: z
    .string()
    .length(10, 'Phone number must be exactly 10 digits')
    .regex(/^\d{10}$/, 'Phone number must be numeric'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      'Password must contain letters and numbers',
    ),
});

export default function LoginScreen(props: any) {
  // BACK TO EXIT --------------------------------------------------------------------------------
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Exit App', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Exit',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ]);
      return true; // Prevent default behavior (going back)
    };

    // Add hardware back press listener
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      // Cleanup both listeners
      backHandler.remove();
    };
  }, [navigation]);

  // FORM HOOKS ---------------->
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
  });

  const onSubmit = (data: any) => {
    trigger('impactLight', options), Keyboard.dismiss();
    //  ERROR CHECKS---------------------------------------------------------

    // login(data);

    console.log(data);

    // Toast.show('Login successful', Toast.SHORT);
    navigation.navigate('OtpVerification');
  };

  return (
    <GradientBackground>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {/* LOGO VIEW */}
        <View
          style={{
            height: hp(45),
          }}>
          <LinearGradient
            colors={[colors.white, colors.white]}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.imageContainer}>
            <Image
              source={require('../assets/images/Applogo.png')}
              style={styles.logo}
            />
          </LinearGradient>
          <View>
            <Text style={styles.subLoginText1}>Prasarnet</Text>
            <Animated.Text
              entering={FadeIn.delay(400)}
              style={styles.subLoginText}>
              Your trusted, results-driven digital marketing partner{' '}
            </Animated.Text>
            {/* <Text style={styles.subLoginText}>digital marketing partner </Text> */}
          </View>

          {/* <ImageBackgroundComponent
            uri={require('../../assets/images/teaImage_background.jpg')}
            imageStyle={{borderBottomLeftRadius: wp(25)}}>
            <Animated.View
              entering={FadeInDown.delay(400).springify()}
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../assets/images/tealink_logo.png')}
                style={{
                  // marginTop: hp(15),
                  // alignSelf: 'center',
                  height: isTab() ? 210 : 100,
                  width: isTab() ? 150 : 200,
                }}
              />
            </Animated.View>
          </ImageBackgroundComponent> */}
        </View>

        <View style={{flex: 1}}>
          {/* LoginId, Password, Button */}
          <View
            style={{
              // marginTop: hp(5),
              marginHorizontal: wp(10),
            }}>
            <Text style={styles.loginText}>Login</Text>
            {/* loginId Section */}
            <Controller
              control={control}
              name="phone_no"
              render={({field: {onChange, onBlur, value}}) => (
                <TextField2
                  // label="Login ID"
                  placeholder="Enter Phone Number"
                  isNumeric={true}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur} // Trigger validation onBlur
                  errorValue={errors.phone_no?.message}
                  customContainerStyle={{marginBottom: hp(-1.6)}}
                />
              )}
            />

            {/* <View style={{height: hp(1)}} /> */}

            <Controller
              control={control}
              name="password"
              render={({field: {onChange, onBlur, value}}) => (
                <TextField2
                  // label="Password"
                  placeholder="Enter Password"
                  value={value}
                  // isNumeric={true}
                  isPassword={true}
                  onChangeText={onChange}
                  onBlur={onBlur} // Trigger validation onBlur
                  errorValue={errors.password?.message}
                />
              )}
            />
            <View style={{marginTop: hp(2)}}>
              <BigButton
                onPress={handleSubmit(onSubmit)}
                title="Login"
                // loading={isLoading}
                customStyle={{marginHorizontal: wp(0), marginBottom: hp(2)}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  loginText: {
    fontSize: wp(8),
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginBottom: hp(-1.5),
    marginLeft: wp(1),
    // textAlign: 'center',
  },
  subLoginText1: {
    marginTop: hp(1),
    fontSize: wp(8),
    color: colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subLoginText: {
    marginHorizontal: wp(10),
    marginTop: hp(1),
    fontSize: wp(4.5),
    color: colors.darkGrey,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textInputContainer: {
    width: wp(80),
    alignSelf: 'center',
    flexDirection: 'row',
    borderWidth: wp(0.5),
    borderRadius: wp(2.2),
    borderColor: colors.darkGrey,
    padding: wp(1),
    alignItems: 'center',
    height: hp(7),
    backgroundColor: colors.white,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    // marginTop: hp(7),
  },
  imageContainer: {
    marginTop: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    height: wp(40),
    width: wp(40),
    alignSelf: 'center',
    borderRadius: wp(30),
    backgroundColor: colors.white,
    borderWidth: wp(0.5),
    borderColor: colors.primary,
  },
  textInput: {
    flex: 1,
    marginLeft: wp(2),
    paddingVertical: hp(1),
    color: colors.black,
    fontSize: wp(4),
  },

  loginButton: {
    backgroundColor: colors.darkGreen,
    width: wp(80),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2.2),
    alignSelf: 'center',
    marginTop: hp(4),
  },
  loginButtonText: {
    color: colors.white,
    fontSize: wp(4.5),
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: wp(4),
    color: colors.darkGreen,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: hp(1),
    // marginTop: hp(3),
  },
});
