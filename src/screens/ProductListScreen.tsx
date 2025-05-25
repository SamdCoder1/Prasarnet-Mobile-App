import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Card, Text, FAB} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../common/colors';

const initialProducts = [
  {
    id: '1',
    name: 'Nikon 600D Mirrorless',
    price: '28,999',
    image:
      'https://pixelsperfect.in/wp-content/uploads/2024/05/q1-1-768x768.jpg',
    description:
      'The Nikon 600D Mirrorless is designed for both enthusiasts and professionals. It features a 24.2MP APS-C CMOS sensor, lightning-fast autofocus, and full HD video recording. Perfect for capturing high-quality images in all lighting conditions with interchangeable lens support.',
    stock: 10,
    colors: ['#000000', '#888888'],
  },
  {
    id: '2',
    name: 'WJPILIS Smart Wrist Watch',
    price: '16,499',
    image:
      'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw66fe4c98/images/Titan/Catalog/90188AP06_1.jpg?sw=600&sh=600',
    description:
      'This sleek smart wristwatch by WJPILIS comes with a heart rate monitor, pedometer, sleep tracking, GPS, and a long-lasting battery. Its stylish design fits both fitness and formal use, making it a reliable companion for everyday life.',
    stock: 5,
    colors: ['#ffffff', '#222222', '#e91e63'],
  },
  {
    id: '3',
    name: 'Echo Dot Kids Edition',
    price: '24,999',
    image:
      'https://www.myg.in/images/thumbnails/300/300/detailed/45/269863_3_xundkk.jpeg.png',
    description:
      'The Echo Dot Kids Edition is a child-friendly smart speaker with Alexa, offering parental controls, bedtime stories, educational games, and kid-safe music streaming. It’s both fun and safe for young users with a durable design.',
    stock: 12,
    colors: ['#2196f3', '#4caf50'],
  },
  {
    id: '4',
    name: 'Sony WH-1000XM4 Headphones',
    price: '31,499',
    image: 'https://m.media-amazon.com/images/I/41JACWT-wWL.jpg',
    description:
      'Sony’s WH-1000XM4 headphones offer the best-in-class noise cancellation, touch controls, and superior sound quality. Enjoy crystal-clear audio, 30 hours of battery life, and unmatched comfort whether you’re working, commuting, or relaxing.',
    stock: 8,
    colors: ['#000000', '#f5f5f5'],
  },
  {
    id: '5',
    name: 'iPad Mini 6th Gen',
    price: '41,999',
    image:
      'https://s3.ap-south-1.amazonaws.com/shop.unicorn/full/e577efe969648b7539fa9abd18dc3d03.png',
    description:
      'The iPad Mini 6th Gen packs massive power in a compact form. With the A15 Bionic chip, Liquid Retina display, Apple Pencil support, and 5G connectivity, it’s perfect for reading, sketching, multitasking, and gaming on the go.',
    stock: 6,
    colors: ['#d1c4e9', '#90caf9'],
  },
  {
    id: '6',
    name: 'Logitech MX Master 3 Mouse',
    price: '7,999',
    image: 'https://m.media-amazon.com/images/I/61ni3t1ryQL.jpg',
    description:
      'Experience ultra-fast, precise, and silent scrolling with the Logitech MX Master 3. Ergonomically designed, this wireless mouse is ideal for creatives and professionals who need precision and comfort throughout long working hours.',
    stock: 14,
    colors: ['#424242', '#ff9800'],
  },
  {
    id: '7',
    name: 'Samsung Galaxy Watch 5',
    price: '23,999',
    image:
      'https://www.designinfo.in/wp-content/uploads/2024/08/Samsung-Galaxy-Watch-7-40mm-Cream-BTLTE-4.webp',
    description:
      'The Samsung Galaxy Watch 5 features a stunning AMOLED display, advanced health sensors, body composition analysis, and seamless connectivity with Android smartphones. It’s a stylish and functional fitness companion.',
    stock: 7,
    colors: ['#e91e63', '#03a9f4'],
  },
  {
    id: '8',
    name: 'Dell XPS 13 Laptop',
    price: '89,999',
    image:
      'https://d154tzc5g79pmr.cloudfront.net/media/catalog/product/cache/74ae05ef3745aec30d7f5a287debd7f5/x/s/xs9320nt-xnb-shot-5-1-sl.jpg',
    description:
      'The Dell XPS 13 is a powerhouse ultrabook featuring a 13.4-inch InfinityEdge display, Intel Core i7 processor, and sleek aluminum chassis. Ideal for professionals and students who need performance and portability without compromise.',
    stock: 3,
    colors: ['#ffffff', '#607d8b'],
  },
];

export default function ProductListScreen({navigation, route}: any) {
  const [products, setProducts] = useState(initialProducts);

  // Handle product added via Add/Edit screen
  useEffect(() => {
    if (route.params?.newProduct) {
      const newProduct = route.params.newProduct;

      setProducts(prev => {
        const index = prev.findIndex(p => p.id === newProduct.id);

        if (index !== -1) {
          // Update existing product
          const updated = [...prev];
          updated[index] = newProduct;
          return updated;
        } else {
          // Add new product
          return [...prev, newProduct];
        }
      });
    }
  }, [route.params?.newProduct]);

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductDetailsScreen', {product: item})
      }>
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <Image source={{uri: item.image}} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₹{item.price}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FAB
        icon="plus"
        customSize={wp(20)}
        color={colors.primary}
        style={styles.fab}
        onPress={() => navigation.navigate('EditProductScreen')}
      />

      <View style={{marginBottom: hp(0.5)}}>
        <Text
          style={{fontSize: wp(8), fontWeight: 'bold', color: colors.darkGrey}}>
          {' '}
          Product List{' '}
        </Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{padding: 16, paddingBottom: hp(2)}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fc',
    padding: wp(2),
  },
  fab: {
    zIndex: 100,
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 10,
  },
  card: {
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
});
