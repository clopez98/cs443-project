import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import BetDisplay from '../components/BetDisplay';
import { auth, db } from '../firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home() {
  const userID = auth?.currentUser?.uid;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [wagerData, setWagerData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const totalProfit = useRef(0);
  const [profitState, setProfitState] = useState(totalProfit.current);
  const totalAmountWagered = useRef(0);
  const totalROI = useRef(0);

  const handleSignOut = () => {
    auth.signOut();
    navigation.navigate('Landing');
  };
  const unsubscribe = useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigation.navigate('Landing');
      }
    });

    return unsubscribe;
  }, [isFocused]);

  useEffect(() => {
    if (userID) {
      setWagerData([]);
      totalProfit.current = 0;
      totalAmountWagered.current = 0;
      totalROI.current = 0;
      setLoadingData(true);
      db.collection(userID)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            setWagerData((oldData) => [...oldData, doc.data()]);
          });
        })
        .then(() => {
          wagerData.forEach((wager) => {
            totalProfit.current += wager.profitLoss;
            totalAmountWagered.current += wager.amountWagered;
          });
          setProfitState(totalProfit.current);
          const calculatedROI = (
            (totalProfit.current / totalAmountWagered.current) *
            100
          ).toFixed(2);
          totalROI.current =
            isNaN(calculatedROI) || !isFinite(calculatedROI)
              ? 0
              : calculatedROI;
        })
        .then(() => {
          setLoadingData(false);
        });
    }
  }, [isFocused, userID]);

  return (
    <View style={styles.container}>
      {loadingData ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <>
          <View style={styles.statsContainer}>
            <Text style={styles.statsColor}>
              Total Money Wagered: ${totalAmountWagered.current}
            </Text>
            <Text style={styles.statsColor}>
              Total Profit / Loss:{' '}
              <Text style={{ color: profitState > 0 ? 'green' : 'red' }}>
                ${profitState}
              </Text>
            </Text>
            <Text style={styles.statsColor}>
              Total ROI:{' '}
              <Text style={{ color: totalROI.current > 0 ? 'green' : 'red' }}>
                {totalROI.current}%
              </Text>
            </Text>
          </View>
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={styles.navigationButton}
              onPress={() => navigation.navigate('CreateBet')}
            >
              <Text style={styles.navigationButtonText}> Create A Bet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navigationButton}>
              <Text style={styles.navigationButtonText} onPress={handleSignOut}>
                {' '}
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '95%',
            }}
            data={wagerData}
            keyExtractor={(item) => item.uid}
            renderItem={({ item }) => (
              <BetDisplay
                header={item.header}
                amountWagered={item.amountWagered}
                profitLoss={item.profitLoss}
                sport={item.sport}
                roi={item.ROI}
                uid={item.uid}
              />
            )}
          ></FlatList>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    height: 60,
  },
  navigationButtonText: {
    color: 'white',
  },
  navigationButton: {
    backgroundColor: '#17141d',
    marginTop: 10,
    padding: 10,
    borderRadius: 30,
    width: 120,
    height: 40,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: '#262626',
    alignItems: 'center',
  },
  statsContainer: {
    backgroundColor: '#17141d',
    width: '100%',
    height: 100,
    padding: 10,
    alignItems: 'center',
  },
  statsColor: {
    color: 'white',
    marginBottom: 10,
  },
});
