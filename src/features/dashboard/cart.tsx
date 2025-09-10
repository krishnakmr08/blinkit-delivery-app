import {
  View,
  Text,
  StyleSheet,
  Platform,
  Animated as RNAnimated,
  useAnimatedValue,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { NoticeHeight, screenHeight } from '@utils/Scaling';
import {
  CollapsibleContainer,
  CollapsibleScrollView,
  CollapsibleHeaderContainer,
  useCollapsibleContext,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import { useAuthStore } from '@state/authStore';
import NoticeAnimation from './NoticeAnimation';
import Visuals from '@features/dashboard/Visuals';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import AnimatedHeader from './AnimatedHeader';
import Content from '@components/dashboard/Content';
import StickySearchBar from './StickySearchBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import withCart from '@features/cart/withCart';
import withLiveStatus from '@features/map/withLiveStatus';

const NOTICE_HEIGHT = -(NoticeHeight + 12);
const ProductDashboard = () => {
  const noticePosition = useRef(useAnimatedValue(NOTICE_HEIGHT)).current;
  const { user, setUser } = useAuthStore();

  const insets = useSafeAreaInsets();
  const { scrollY, expand } = useCollapsibleContext();
  const previousScroll = useRef<number>(0);

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollY.value < previousScroll.current && scrollY.value > 180;

    const opacity = withTiming(isScrollingUp ? 1 : 0, { duration: 300 });
    const translateY = withTiming(isScrollingUp ? 0 : 10, { duration: 300 });
    return {
      opacity,
      transform: [{ translateY }],
    };
  });
  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    slideDown();
    const timeoutId = setTimeout(() => {
      slideUp();
    }, 3500);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView />

        <Animated.View style={[styles.backToTopbutton, backToTopStyle]}>
          <TouchableOpacity
            onPress={() => {
              scrollY.value = 0;
              expand();
            }}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
          >
            <Icon
              name="arrow-up-circle-outline"
              color="white"
              size={RFValue(12)}
            />
            <CustomText
              variant="h9"
              style={{ color: '#ffffff' }}
              fontFamily={Fonts.SemiBold}
            >
              Back to top
            </CustomText>
          </TouchableOpacity>
        </Animated.View>
        <CollapsibleContainer
          style={[styles.panelConatainer, { marginTop: insets.top || 20 }]}
        >
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader
              showNotice={() => {
                slideDown();

                const timeoutId = setTimeout(() => {
                  slideUp();
                }, 3500);

                return () => clearTimeout(timeoutId);
              }}
            />
            <StickySearchBar />
          </CollapsibleHeaderContainer>

          <CollapsibleScrollView
            nestedScrollEnabled
            style={styles.panelConatainer}
            showsVerticalScrollIndicator={false}
          >
            <Content />

            <View style={{ backgroundColor: '#F8F8F8', padding: 20 }}>
              <CustomText
                fontFamily={Fonts.Bold}
                fontSize={RFValue(32)}
                style={{ opacity: 0.2 }}
              >
                Blinkit 🛒
              </CustomText>
              <CustomText
                fontSize={RFValue(12)}
                fontFamily={Fonts.Bold}
                style={{ marginTop: 10, paddingBottom: 100, opacity: 0.2 }}
              >
                Developed By  Krishna Kumar
              </CustomText>
            </View>
          </CollapsibleScrollView>
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};

const styles = StyleSheet.create({
  panelConatainer: {
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  backToTopbutton: {
    position: 'absolute',
    alignSelf: 'center',
    top: Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 999,
  },
});
export default withLiveStatus(
  withCart(withCollapsibleContext(ProductDashboard)),
);