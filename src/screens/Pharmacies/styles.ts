import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,

    flexDirection: 'row',
  },
  leftItemContent: {
    flex: 1,
  },
  rightItemContent: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
