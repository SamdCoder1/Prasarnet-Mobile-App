import React from 'react';
import {View, Dimensions, StyleSheet, ScrollView} from 'react-native';
import {Text, Button, Card, useTheme} from 'react-native-paper';
import {PieChart} from 'react-native-chart-kit';
import {colors} from '../common/colors';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BigButton from '../components/BigButton';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const theme = useTheme();

  const data = [
    {
      name: 'Electronics',
      value: 5000,
      color: '#4e73df',
      legendFontColor: '#4e73df',
      legendFontSize: 14,
    },
    {
      name: 'Clothing',
      value: 3000,
      color: '#1cc88a',
      legendFontColor: '#1cc88a',
      legendFontSize: 14,
    },
    {
      name: 'Accessories',
      value: 2000,
      color: '#36b9cc',
      legendFontColor: '#36b9cc',
      legendFontSize: 14,
    },
    {
      name: 'Food',
      value: 2000,
      color: '#d9a704',
      legendFontColor: '#d9a704',
      legendFontSize: 14,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text
          style={{fontSize: wp(8), fontWeight: 'bold', color: colors.darkGrey}}>
          {' '}
          Dashboard{' '}
        </Text>
      </View>

      <View style={{flex: 1, justifyContent: 'center'}}>
        <Card style={styles.card} mode="elevated">
          <Card.Title title="Sales Projection" titleStyle={styles.title} />
          <Card.Content>
            <PieChart
              data={data}
              width={Dimensions.get('window').width - 50}
              height={240}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                strokeWidth: 2,
                barPercentage: 0.5,
              }}
              accessor="value"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </Card.Content>
        </Card>

        <BigButton
          onPress={() => navigation.navigate('ProductListScreen')}
          title="Manage Products"
          customStyle={{marginTop: hp(2), marginHorizontal: wp(5)}}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: wp(3),
    backgroundColor: '#f8f9fc',
    flexGrow: 1,
    // justifyContent: 'center',
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 8,
    marginTop: 16,
    paddingVertical: 8,
  },
});
