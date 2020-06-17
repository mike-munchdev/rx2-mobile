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
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 4,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  logo: {
    height: logoHeight,
    width: logoHeight,
  },
  textHeader: {
    color: colors.white.normal,
    fontWeight: 'bold',
    fontSize: 30,
  },
  textFooter: {
    color: colors.blue.dark,
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.white.off,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: colors.blue.dark,
  },
  buttons: {
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    width: '100%',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotText: {},
});
