import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Picker,
} from 'react-native';
import { db, auth } from '../firebase';
import uuid from 'react-native-uuid';

export default function CreateBet({ route, navigation }) {
  const userID = auth.currentUser.uid;
  const [title, setTitle] = useState('');
  const [wagered, setWagered] = useState('');
  const [winnings, setWinnings] = useState('');
  const [selectedValue, setSelectedValue] = useState('football');
  const calculatedROI = ((winnings / wagered) * 100).toFixed(2);
  const uid = uuid.v1();
  const ROI =
    isNaN(calculatedROI) || !isFinite(calculatedROI) ? 0 : calculatedROI;

  const handleSubmit = () => {
    db.collection(userID).doc(uid).set({
      uid: uid,
      header: title,
      amountWagered: wagered,
      profitLoss: winnings,
      sport: selectedValue,
      ROI: ROI,
    });
    navigation.navigate('Home');
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter the name of your wager..."
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={styles.input}
          placeholderTextColor={'#57595D'}
          selectionColor={'white'}
        />
        <TextInput
          placeholder="Enter the amount wagered..."
          value={wagered.toString()}
          style={styles.input}
          keyboardType="numeric"
          placeholderTextColor={'#57595D'}
          selectionColor={'white'}
          onChangeText={(text) => {
            if (isNaN(text) || text === '') {
              setWagered(0);
            } else {
              text.replace(/[^0-9]/g, ''), setWagered(parseFloat(text));
            }
          }}
        />
        <TextInput
          placeholder="Enter your total winnings or losses..."
          value={winnings.toString()}
          style={styles.input}
          placeholderTextColor={'#57595D'}
          selectionColor={'white'}
          onChangeText={(text) => {
            if (isNaN(text) || text === '') {
              setWinnings(0);
            } else {
              text.replace(/[^0-9]/g, ''), setWinnings(parseFloat(text));
            }
          }}
        />
        <Text style={styles.input}>{`ROI: ${ROI}%`}</Text>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          style={styles.picker}
          mode={'dropdown'}
        >
          <Picker.Item label="Football" value="football" />
          <Picker.Item label="Baseball" value="baseball" />
          <Picker.Item label="Basketball" value="basketball" />
          <Picker.Item label="Soccer" value="soccer" />
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={(styles.button, styles.buttonText)}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  ROIText: {
    color: 'white',
  },
  picker: {
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#17141d',
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: 'white',
    borderRadius: 20,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#17141d',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
