import React from 'react';
import { StyleSheet, Text, View, FlatList, Switch } from 'react-native';

class Catalog extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      switchValue: false,
    };
   } 

   toggleSwitch = (value) => {
    //onValueChange of the switch this function will be called
    this.setState({switchValue: value})
    //state changes according to switch
    //which will result in re-render the text
 }
 
   render() {
    return (
      <View>
      <Text style={styles.itemTitle}>{this.props.item.title}</Text>
      <Text style={styles.itemSubTitle}>{`${this.props.item.method} - ${this.props.item.number}`}</Text>
       <Switch
        style={{margin:20}}
        onValueChange = {this.toggleSwitch}
        value = {this.state.switchValue}/>
      
    </View>
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     loading: false,
     data: [],
     page: 1,
     seed: 1,
     error: null,
     refreshing: false,
   };
  
  }

  componentDidMount() {
    console.log("Component loaded.");
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Catalog Toggles</Text>
        <FlatList
          data={[
            {title: 'Machine Catalog 1', method: 'Manual', number: 99},
            {title: 'Machine Catalog 2', method: 'Manual', number: 99},
          ]}
          renderItem={({item}) => 
          <Catalog item={item}/>
          }
          keyExtractor={item => item.title}
        />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',

  },
  listings: {
    backgroundColor: '#fff',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 75,
    marginStart: 25
  },
  itemTitle: {
    padding: 25,
    fontSize: 18,
    height: 44,
  },
  itemSubTitle: {
    padding: 25,
    fontSize: 12,
    height: 40,
  },

});