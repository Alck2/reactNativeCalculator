
import type { PropsWithoutRef } from 'react';

import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


import styles from './styles';

type ButtonProps = PropsWithoutRef<{
  type: 'number' | 'operation',
  text: string;
  onPress: () => void;
}>;

export default function Button({ type, text, onPress }: ButtonProps): React.JSX.Element {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.cell, styles[`cell-${type}`]]}>
        <Text style={styles.cellText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}
