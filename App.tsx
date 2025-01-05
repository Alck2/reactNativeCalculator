import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Button from './components/Button';
import Display from './components/Display';
import Decimal from 'decimal.js-light';

const styles = StyleSheet.create({
  full: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  appCtn: {
    backgroundColor: 'black',
    flexDirection: 'column',
  },
  display: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  cell: {
    height: '100%',
  },
});

const MAX_DIGITS = 7;

const ops: {[op: string]: (a: number, b: number) => string } = {
  '+': (a, b) => parseFloat((new Decimal(a).plus(new Decimal(b))).toPrecision(MAX_DIGITS)).toString(),
  '-': (a, b) => parseFloat((new Decimal(a).minus(new Decimal(b))).toPrecision(MAX_DIGITS)).toString(),
  '×': (a, b) => parseFloat((new Decimal(a).times(new Decimal(b))).toPrecision(MAX_DIGITS)).toString(),
  '÷': (a, b) => parseFloat((new Decimal(a).div(new Decimal(b))).toPrecision(MAX_DIGITS)).toString(),
}

let prevVal = 0;
let nextReset = false;

export default function App(): React.JSX.Element {
  let [input, setInput] = useState('');
  let [value, setValue] = useState('0');
  function cbAc() {
    prevVal = 0;
    setInput('');
    setValue('0');
  }
  function cbC() {
    setValue('0');
  }
  function cbInput(ch: string) {
    if (value === 'ERR') return;
    let tempValue = value;
    if (nextReset) {
      tempValue = '0';
      nextReset = false;
    }
    if (ch === '.' && tempValue.includes('.')) return;
    if (ch === '.' && parseFloat(tempValue) === 0) {
      ch = '0.'; 
    }
    if (tempValue[0] === '0' && ch !== '.' && !tempValue.includes('.')) {
      tempValue = tempValue.slice(1);
    }
    const str = tempValue + ch;
    setValue(str);
  }
  function cbOp(ch: string) {
    if (!value) return;
    if (value === 'ERR') return;
    if (/^[\+\-×÷]$/.test(input[input.length - 1])) {
      input = input.slice(0, input.length - 1);
    }
    setInput(input + ch);
    prevVal = parseFloat(value);
    setValue('0');
  }
  function cbEq() {
    if (!input) return;
    if (value === 'ERR') return;
    if (input === '÷' && value === '0') {
      setInput('');
      setValue('ERR');
    } else {
      const func = ops[input];
      if (value[value.length - 1] === '.') value = value.slice(0, value.length);
      const result = func(prevVal, parseFloat(value));
      setInput('');
      setValue(result);
    }
    nextReset = true;
  }
  function cbNeg() {
    if (!value) return;
    if (value === 'ERR') return;
    const valueNum = parseFloat(value);
    setValue((-valueNum).toString());
  }
  const calLayout: Array<Array<{ text: string; onPress: () => void; flex: number; }>> = [
    [{ text: 'AC', onPress: cbAc, flex: 1 }, { text: 'C', onPress: cbC, flex: 1 }, { text: '±', onPress: cbNeg, flex: 1 }, { text: '÷', onPress: () => { cbOp('÷') }, flex: 1 }],
    [{ text: '7', onPress: () => { cbInput('7') }, flex: 1 }, { text: '8', onPress: () => { cbInput('8') }, flex: 1 }, { text: '9', onPress: () => { cbInput('9') }, flex: 1 }, { text: '×', onPress: () => { cbOp('×'); }, flex: 1 }],
    [{ text: '4', onPress: () => { cbInput('4') }, flex: 1 }, { text: '5', onPress: () => { cbInput('5') }, flex: 1 }, { text: '6', onPress: () => { cbInput('6') }, flex: 1 }, { text: '-', onPress: () => { cbOp('-'); }, flex: 1 }],
    [{ text: '1', onPress: () => { cbInput('1') }, flex: 1 }, { text: '2', onPress: () => { cbInput('2') }, flex: 1 }, { text: '3', onPress: () => { cbInput('3') }, flex: 1 }, { text: '+', onPress: () => { cbOp('+'); }, flex: 1 }],
    [{ text: '0', onPress: () => { cbInput('0') }, flex: 2 }, { text: '.', onPress: () => { cbInput('.') }, flex: 1 }, { text: '=', onPress: cbEq, flex: 1 }],
  ];
  return (
    <SafeAreaView style={[styles.full, styles.appCtn]}>
      <View style={styles.display}>
        <Display input={input} value={value}/>
      </View>
      <View>
        {calLayout.map((row, index) => <View key={index} style={styles.row}>
          {row.map(({ flex, text, onPress }) => <View key={text} style={[styles.cell, { aspectRatio: flex, flex }]}>
            <Button text={text} onPress={onPress} type={/^[0-9.]$/.test(text) ? 'number' : 'operation' } />
          </View>)}
        </View>)}
      </View>
    </SafeAreaView>
  );
}
