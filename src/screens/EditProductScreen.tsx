import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import {Text} from 'react-native-paper';
import {colors} from '../common/colors';
import BackButton from '../components/BackButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BigButton from '../components/BigButton';
import Toast from 'react-native-simple-toast';

export default function EditProductScreen({route, navigation}: any) {
  const {product} = route.params || {};
  console.log(product);

  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price || '');
  const [description, setDescription] = useState(product?.description || '');
  const [image, setImage] = useState(product?.image || null);

  const handleSave = () => {
    if (!name || !price || !image || !description) {
      Toast.show('All fields are required', Toast.LONG);
      return;
    }

    const newProduct = {
      id: product?.id || Date.now().toString(),
      name,
      price,
      description,
      image, // local image reference or URL
    };

    console.log(newProduct);

    navigation.navigate('ProductListScreen', {newProduct});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackButton />
      <Text style={styles.title}>
        {product ? 'Edit Product' : 'Add Product'}
      </Text>

      {image && <Image source={{uri: image}} style={styles.image} />}
      <TextInput
        placeholder="Product Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Price (e.g., ₹1000)"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      {!product && (
        <TextInput
          placeholder="Image URL"
          style={styles.input}
          value={image}
          onChangeText={setImage}
        />
      )}

      <BigButton
        title={product ? 'Update Product' : 'Add Product'}
        onPress={handleSave}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: wp(5),
    paddingTop: hp(0.8),
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.darkGrey,
  },
  image: {
    width: '70%',
    height: 260,
    borderRadius: 12,
    alignSelf: 'center',
    marginVertical: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
});
