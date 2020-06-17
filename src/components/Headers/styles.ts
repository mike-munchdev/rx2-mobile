import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    // borderColor: 'red',
    // borderWidth: 1,
    flexDirection: 'row',
    height: 100,
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
    marginLeft: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerCenter: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
