import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import React, { FC, useState } from 'react';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import { screenHeight } from '@utils/Scaling';
import { deliveryLogin } from '@service/authService';
import { resetAndNavigate } from '@utils/NavigationUtils';
import LottieView from 'lottie-react-native';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '@components/ui/CustomButton';

const DeliveryLogin: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    console.log(email, password);
    setLoading(true);
    try {
      await deliveryLogin(email, password);
      resetAndNavigate('DeliveryDashboard');
    } catch (error) {
      Alert.alert('Login Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomSafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView
              autoPlay
              loop
              style={styles.lottie}
              source={require('@assets/animations/delivery_man.json')}
              hardwareAccelerationAndroid
            />
          </View>
          <CustomText variant="h3" fontFamily={Fonts.Bold}>
            Delivery Partner Portal
          </CustomText>
          <CustomText variant="h6" fontFamily={Fonts.Bold} style={styles.text}>
            Faster than Flash
          </CustomText>
          <CustomInput
            value={email}
            onChangeText={setEmail}
            left={
              <Icon
                name="mail"
                color="#F8890E"
                style={{ marginLeft: 10 }}
                size={RFValue(18)}
              />
            }
            placeholder="Email"
            inputMode="email"
            right={false}
          />
          <CustomInput
            value={password}
            onChangeText={setPassword}
            left={
              <Icon
                name="key-sharp"
                color="#F8890E"
                style={{ marginLeft: 10 }}
                size={RFValue(18)}
              />
            }
            placeholder="Password"
            secureTextEntry
            right={false}
          />

          <CustomButton
            disabled={email.length === 0 || password.length < 8}
            title="Login"
            onPress={handleLogin}
            loading={loading}
          />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

export default DeliveryLogin;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  lottie: { height: '100%', width: '100%' },
  lottieContainer: { height: screenHeight * 0.12, width: '100%' },
  text: { marginTop: 2, marginBottom: 25, opacity: 0.8 },
});
