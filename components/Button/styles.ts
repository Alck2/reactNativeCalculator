import { StyleSheet } from "react-native";

export default StyleSheet.create({
  cell: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  'cell-number': {
    backgroundColor: 'gray',
  },
  'cell-operation': {
    backgroundColor: 'orange',
  },
  cellText: {
    verticalAlign: 'middle',
    height: '100%',
    fontSize: 32,
    color: 'black',
  },
})