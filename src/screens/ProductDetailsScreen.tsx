import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {colors} from '../common/colors';
import BigButton from '../components/BigButton';
import BackButton from '../components/BackButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ProductDetailsScreen = ({route, navigation}: any) => {
  const {product} = route.params;
  console.log(product);

  return (
    <ScrollView style={styles.container}>
      <BackButton />
      <View style={{marginBottom: hp(0.5), marginTop: hp(0.5)}}>
        <Text
          style={{
            fontSize: wp(6),
            fontWeight: 'bold',
            color: colors.darkGrey,
            textAlign: 'center',
          }}>
          {' '}
          Product Details{' '}
        </Text>
      </View>

      <Image source={{uri: product.image}} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{product.name}</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{product.price}</Text>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        <BigButton
          title="Edit Product"
          onPress={() => {
            navigation.navigate('EditProductScreen', {product});
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    // paddingTop: 16,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '70%',
    height: 260,
    borderRadius: 12,
    alignSelf: 'center',
    marginVertical: 16,
  },
  content: {
    paddingHorizontal: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#666',
    marginVertical: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  stock: {
    fontSize: 14,
    color: '#444',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 4,
  },
  description: {
    color: '#555',
    fontSize: 14,
    lineHeight: 20,
  },
  colorRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  colorBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  addToCartButton: {
    flex: 1,
    marginRight: 8,
    padding: 12,
    backgroundColor: '#fff',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: colors.primary,
    fontWeight: '600',
  },
  buyNowButton: {
    flex: 1,
    marginLeft: 8,
    padding: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyNowText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ProductDetailsScreen;
