import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';


export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGrey,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
  dayButtonSelected: {
    backgroundColor: COLORS.primary,
  },
  weekendButton: {
    backgroundColor: COLORS.lightGrey,
  },
  dayText: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.text,
  },
  dayTextSelected: {
    color: COLORS.white,
  },
});

