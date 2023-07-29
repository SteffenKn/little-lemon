import {StyleSheet, TextInputProps, View, Text, TextInput} from 'react-native';

type Props = TextInputProps & {
  label: string;
  labelStyle?: any;
  containerStyle?: any;
};

export function LemonInput(props: Props) {
  return (
    <View style={[styles.inputContainer, props.containerStyle]}>
      <Text style={[styles.inputLabel, props.labelStyle]}>{props.label}</Text>
      <TextInput {...props} style={[styles.input, props.style]} placeholderTextColor={placeHolderTextColor} />
    </View>
  );
}

const placeHolderTextColor = '#505050';

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 10,
    fontFamily: 'Karla',
  },
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#495E57',
    fontSize: 16,
    fontFamily: 'Karla',
  },
});
