import { StyleSheet, Platform } from 'react-native';
import colors from '../../constants/colors';
import { isIphoneX } from '../../utils/iPhone';

const getHeight = (): string | number => {
  const isPhoneX = isIphoneX();
  console.log('isPhoneX', isPhoneX);
  return isPhoneX ? 100 : 80;
};
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    // borderColor: 'red',
    // borderWidth: 1,
    flexDirection: 'row',
    height: getHeight(),
    paddingTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.blue.dark,
  },
  title: { color: colors.white.normal, fontWeight: 'bold', fontSize: 25 },
  rightIcon: {},
  leftIcon: {},
  headerLeft: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerCenter: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenterView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenterTitle: {
    color: colors.white.normal,
    fontSize: 18,
    fontWeight: 'bold',
  },
  pharmacyName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.white.normal,
  },
  pharmacyAddress: {
    fontSize: 14,
    fontWeight: 'bold',
    flexWrap: 'nowrap',
    textTransform: 'uppercase',
    color: colors.white.normal,
  },
});
