import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';

const { height } = Dimensions.get('screen');
const logoHeight = height * 0.7 * 0.4;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue.dark,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
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
    marginTop: 30,
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
