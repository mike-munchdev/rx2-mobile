import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    height: 150,
    flexDirection: 'row',
  },
  flatList: {
    flex: 1,

    marginTop: 15,
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
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: colors.blue.dark,
  },
  imagePicker: {
    alignItems: 'center',
  },

  image: {
    height: 350,
    width: '100%',
    flex: 1,

    resizeMode: 'contain',
  },
  leftItemContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightItemContent: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
