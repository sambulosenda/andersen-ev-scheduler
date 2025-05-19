import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';


export const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGrey,
    borderRadius: 5,
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    color: COLORS.text,
  },
});

