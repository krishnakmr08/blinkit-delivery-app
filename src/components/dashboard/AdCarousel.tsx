import { Image, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { screenWidth } from '@utils/Scaling';
import Carousel from 'react-native-reanimated-carousel';
import ScalePress from '@components/ui/ScalePress';
const AdCarousel: FC<{ adData: any }> = ({ adData }) => {
  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: screenWidth * 0.5,
  };
  return (
    <View style={{ left: -20, marginVertical: 20 }}>
      <Carousel
        {...baseOptions}
        loop
        autoPlay
        pagingEnabled
        snapEnabled
        autoPlayInterval={2500}
        mode="parallax"
        data={adData}
        modeConfig={{
          parallaxScrollingOffset: 0,
          parallaxScrollingScale: 0.94,
        }}
        renderItem={({ item }: any) => {
          return (
            <ScalePress style={styles.imageContainer}>
              <Image source={item} style={styles.img} />
            </ScalePress>
          );
        }}
      />
    </View>
  );
};

export default AdCarousel;

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
});
