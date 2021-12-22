import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function BetDisplay({
  uid,
  header,
  amountWagered,
  profitLoss,
  sport,
  roi,
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={() =>
        navigation.navigate('EditBet', {
          uid: uid,
          header: header,
          amountWagered: amountWagered,
          profitLoss: profitLoss,
          sport: sport,
        })
      }
    >
      <Text style={styles.header}>{header}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Amount Wagered:{' '}
          <Text style={{ fontWeight: '0' }}>
            ${amountWagered}
            {'\n'}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          Amount Won / Lost:{' '}
          <Text
            style={{ color: profitLoss > 0 ? 'green' : 'red', fontWeight: '0' }}
          >
            ${profitLoss}
            {'\n'}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          ROI:{' '}
          <Text style={{ color: roi > 0 ? 'green' : 'red', fontWeight: '0' }}>
            {roi}%
          </Text>
        </Text>
        <Text style={styles.infoText}>
          Sport: <Text style={{ fontWeight: '0' }}>{sport}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  cardWrapper: {
    marginTop: 10,
    width: '100%',
    height: 125,
    backgroundColor: '#17141d',
    alignItems: 'center',
    borderRadius: 30,
    paddingTop: 15,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
    alignItems: 'center',
  },
  infoText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
