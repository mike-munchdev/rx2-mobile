import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';

const { height } = Dimensions.get('screen');
const logoHeight = height * 0.7 * 0.4;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 2,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  logo: {
    height: logoHeight,
    width: logoHeight,
  },
  title: {
    color: colors.blue.dark,
    fontWeight: 'bold',
    fontSize: 24,
  },
  subTitle: {
    color: colors.gray.normal,
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 0,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
  },
  textSign: {
    color: colors.white.normal,
    fontWeight: 'bold',
  },
});
