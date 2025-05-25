import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {OtpInput} from 'react-native-otp-entry';
import {colors} from '../common/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import BigButton from '../components/BigButton';
import Toast from 'react-native-simple-toast';
import {z} from 'zod';
import BackButton from '../components/BackButton';
import useCountdownTimer from '../hooks/useCountdownTimer';
import SignUpPrompt from '../components/SignUpPrompt';

// ZOD VALIDATION SCHEMA  ------------>
const otpVerificationSchema = z.object({
  phone_no: z
    .string()
    .length(10, 'Phone No. must be 10 digits')
    .regex(/^\d{10}$/, {message: 'Phone number must be numeric'}),
  otp: z.string().length(4, 'OTP must be 4 digits'),
});
export type OtpVerificationScreenProps = z.infer<typeof otpVerificationSchema>;

export default function OtpVerificationScreen() {
  // CONSTANTS -------------->
  const navigation = useNavigation();

  // LOCAL STATES -------------->
  const [otpText, setOtpText] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const {isTimerRunning, formattedTime, setSecondsLeft, setIsTimerRunning} =
    useCountdownTimer();

  // LOCAL FUNCTIONS ------------------------------------------------------------>
  // function handleVerify(text: string) {
  //   const result = otpVerificationSchema.safeParse({
  //     phone_no: phoneNumber,
  //     otp: text,
  //   });

  //   if (!result.success) {
  //     const errorMessage = result.error.errors[0].message;
  //     Toast.show(errorMessage, Toast.LONG);
  //     return;
  //   }
  // }

  async function handleSignUpOtp(text: string) {
    try {
      setLoading(true);

      navigation.replace('DashboardScreen');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleResendOtp() {
    // console.log();
    Toast.show('OTP sent successfully', Toast.SHORT);
    setSecondsLeft(30);
    setIsTimerRunning(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.greenBackground}>
        <Text style={styles.verificationText}>Verification</Text>
        <Text style={styles.descriptionText}>
          We have sent a code to your phone number
        </Text>
        <Text style={styles.emailText}>{phoneNumber}</Text>
      </View>

      <BackButton />

      <View style={styles.bodyContainer}>
        <OtpInput
          numberOfDigits={4}
          focusColor="green"
          focusStickBlinkingDuration={500}
          onTextChange={setOtpText}
          onFilled={text => handleSignUpOtp(text)}
          textInputProps={{
            accessibilityLabel: 'One-Time Password',
          }}
          theme={{
            containerStyle: styles.otpContainer,
            pinCodeContainerStyle: styles.pinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
            focusStickStyle: styles.focusStick,
            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
          }}
        />

        <Text style={styles.informationText}>
          It will be vaild for 5 minutes
        </Text>

        <SignUpPrompt
          primaryText="Have not got yet ? "
          linkText={isTimerRunning ? `${formattedTime}` : 'RESEND'}
          onPress={isTimerRunning ? () => {} : handleResendOtp}
        />

        <BigButton
          title="VERIFY"
          onPress={() => {
            if (!otpText) {
              Toast.show('Please enter OTP', Toast.LONG);
            } else {
              handleSignUpOtp(otpText);
            }
          }}
          // loading={type === 'signup' ? loading : mutation.status === 'pending'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greenBackground: {
    height: hp(30),
    width: wp(100),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verificationText: {
    color: colors.white,
    fontSize: wp(6),
    fontWeight: 'bold',
  },
  descriptionText: {
    color: colors.white,
    fontSize: wp(3.5),
    marginTop: hp(0.5),
  },
  emailText: {
    color: colors.white,
    fontSize: wp(4),
    fontWeight: 'bold',
    marginTop: hp(1),
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: hp(-5),
    borderWidth: 1,
    borderColor: colors.primary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: wp(5),
  },
  otpContainer: {
    marginTop: hp(5),
    paddingHorizontal: wp(5),
  },
  pinCodeContainer: {
    width: wp(13),
    backgroundColor: colors.blueWhite,
  },
  pinCodeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  focusStick: {
    borderColor: colors.primary,
  },
  activePinCodeContainer: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  informationText: {
    fontSize: wp(3.5),
    color: colors.grey,
    textAlign: 'center',
    marginTop: hp(3),
  },
});
