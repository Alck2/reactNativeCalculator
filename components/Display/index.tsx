
import type { PropsWithoutRef } from 'react';

import {
  ScrollView,
  Text,
  View,
} from 'react-native';

import styles from './styles';

type DisplayProps = PropsWithoutRef<{
  input: string;
  value: string;
}>;

export default function Display({ input, value }: DisplayProps): React.JSX.Element {
  const isNeg = parseFloat(value) < 0;
  value = value.replace(/^-/, '');
  return (
    <View style={styles.displayCtn}>
      <View style={styles.op}>
        <Text style={styles.displayInput}>{input}</Text>
      </View>
      <View style={styles.fill} />
      <View style={styles.displayTextCtn}>
        {isNeg && <Text style={styles.displayText}>-</Text>}
        <View style={styles.fill} />
        <View style={styles.displayValCtn}>
          <ScrollView horizontal persistentScrollbar indicatorStyle='white' showsHorizontalScrollIndicator>
            <Text style={[styles.displayText, styles.displayVal]}>{value}</Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
