import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatList: {
    flex: 5,
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
    height: 50,
    flexDirection: 'row',
  },
  leftItemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: colors.blue.dark,
  },
  drugText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceText: {
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
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});
