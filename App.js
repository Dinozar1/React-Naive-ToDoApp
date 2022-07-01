import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Button, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {
  const [list, setList] = useState([])
  const [input,setInput] = useState('')

  const addNewTask= () => 
  {
    if(input.length > 3)
    {
      if(list.length > 0)
      {
        const lastKey = list[list.length-1].key
        setList(list => [...list, {text: input, key: lastKey+1}])
      }
      else
      {
        setList(list => [...list, {text: input, key: 1}])
      }
    }
    else
    {
        Alert.alert('Oops!', 'ToDos must be over 3 chars long', [
          {text: 'Understood'}
        ])
    }
    
    
  }

  const deleteItem = (k) => 
  {
    const newArr = list.filter((element) => element.key !== k)
    setList(newArr)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.header}>To do List</Text>
        <View style={styles.inputDiv}>
          <Text>Insert Task:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={(value) => setInput(value)}
            value={input}
          />
          <Button 
            onPress={() => addNewTask()}
            style={styles.button}
            title="Add task"
            color="#841584"
          />
        </View>
        <View style={styles.listDiv}>
          <FlatList
            data={list}
            renderItem={({item}) => 
            <TouchableOpacity onPress={() => deleteItem(item.key)}>
              <View style={styles.element}>
                <View style={styles.icon}>
                  <MaterialIcons name="delete" size={24} color="#333" />
                  <Text style={styles.itemText}>{item.text}</Text>
                </View>
              </View>
            </TouchableOpacity>
            }
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container:
  {
    backgroundColor: 'pink',
    paddingVertical: 30,
    paddingHorizontal: 20,
    flex: 1
  },
  header:
  {
    fontSize: 40,
    textAlign: 'center'
  },
  input:
  {
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
  },
  button:
  {
    marginTop: 20,
  },
  element:
  {
    padding: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'grey',
    margin: 10,
    width: 300,
    borderRadius: 5
  },
  listDiv:
  {
    flex:1
  },
  icon:
  {
    flexDirection: 'row',
  },
  itemText:
  {
    paddingHorizontal: 10,
  }
});
