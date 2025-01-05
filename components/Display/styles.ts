import { StyleSheet } from "react-native";

export default StyleSheet.create({
  displayCtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10
  },
  op: {
    width: '100%',
    alignItems: 'flex-end',
  },
  displayInput: {
    marginTop: 40,
    marginRight: 20,
    color: 'gray',
    fontSize: 24,
  },
  displayTextCtn: {
    flexDirection: 'row',
  },
  fill: {
    flex: 1,
  },
  displayValCtn: {
    maxWidth: '80%',
  },
  displayText: {
    verticalAlign: 'bottom',
    fontSize: 72,
    color: 'white',
  },
  displayVal: {
    paddingLeft: 10,
    overflow: 'scroll',
  }
})