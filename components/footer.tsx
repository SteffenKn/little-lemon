import {ReactNode} from 'react';

import {StyleSheet, StyleProp, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  children: ReactNode | ReactNode[];
  style: StyleProp<ViewStyle>;
};

// TODO: Fix type
export function Footer({children, style}: Props) {
  const inset = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.contentContainer, {marginBottom: inset.bottom}, style]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#F1F4F7',
    justifyContent: 'center',
  },
  contentContainer: {
    flexShrink: 0,
  },
});
