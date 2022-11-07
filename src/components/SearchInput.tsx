import React from 'react';
import {TextInput, StyleSheet, TextInputProps, View, Image} from 'react-native';
import {hp, wp} from '@utils/responsive-dimension';
import {colors} from '@theme/colors';

interface SearchInputProps extends TextInputProps {
  value?: string;
  placeholder?: string;
  onChangeText?: (arg: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  placeholder,
  onChangeText,
  ...rest
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('@assets/images/search.png')}
          style={{width: wp(24), height: hp(24)}}
        />
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        placeholderTextColor={colors.grey1}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(12),
    borderWidth: wp(2),
    paddingHorizontal: wp(16),
    paddingVertical: wp(16),
    borderColor: colors.border,
    backgroundColor: 'transparent',
  },
  input: {
    textAlign: 'left',
    fontSize: wp(14),
    color: colors.black,
    marginHorizontal: wp(8),
  },
});

export default SearchInput;
