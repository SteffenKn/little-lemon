import Checkbox, {CheckboxProps} from 'expo-checkbox';
import {StyleSheet, View, Text} from 'react-native';

type Props = CheckboxProps & {
  label: string;
  labelStyle?: any;
  containerStyle?: any;
};

export function LemonCheckbox(props: Props) {
  return (
    <View style={[styles.inputContainer, props.containerStyle]}>
      <Checkbox {...props} style={[styles.checkbox, props.style]} color='#495E57' />
      <Text style={[styles.inputLabel, props.labelStyle]}>{props.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 5,
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 0,
    marginLeft: 10,
    fontFamily: 'Karla',
  },
  checkbox: {},
});
