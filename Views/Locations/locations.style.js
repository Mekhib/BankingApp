import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  bankDiv: {
    marginRight: 11,
    marginLeft: 11,
    borderRadius: 6,
    marginTop: 5,
    marginBottom: 10,
    padding: 10,
    alignContent: 'space-between',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  bankName: {
    fontSize: 15,
    fontWeight: '500',
    width: 350,
    // alignSelf: "center",
    flexDirection: 'row',
  },
  locationImage: {
    width: 50,
    height: 50,
   marginRight: 10,
    flexDirection: 'row',
    marginLeft: 69,
  },
  bankTitle: {
    // flexDirection: "row",
    width: 100,
  },
  formattedAddress: {
    width: 250,
    fontSize: 10,
  },
  button: {
    width: 100,
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  bankDiv2: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  title: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    fontSize: 20,
    // padding: 10,
    marginLeft: 10,
  },
  backgroundDiv: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default styles