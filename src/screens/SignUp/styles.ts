import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';

const { height } = Dimensions.get('screen');
const logoHeight = height * 0.2 * 0.4;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue.dark,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 5,
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
  forgotText: { color: colors.blue.light, marginTop: 15 },
  buttons: {
    alignItems: 'center',
    marginTop: 25,
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
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  textPrivateColor: {
    color: colors.gray.normal,
  },
});
