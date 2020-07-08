import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatList: {
    flex: 1,
  },
  item: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  itemContainer: {
    flex: 1,
    height: 150,
    flexDirection: 'row',
  },
  leftItemContent: {
    flex: 1,
  },
  text: {
    color: colors.white.normal,
  },
  drugText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },
  doseText: {
    fontSize: 16,
    marginBottom: 5,
  },
  rxNumberText: {
    fontSize: 16,
    marginBottom: 5,
  },
  lastFilledText: {
    fontSize: 16,
    marginBottom: 5,
  },
  nextFilledText: {
    fontSize: 16,
    marginBottom: 5,
  },
  rightItemContent: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: colors.white.normal,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
