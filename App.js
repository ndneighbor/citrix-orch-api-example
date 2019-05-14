import React from 'react';
import _ from 'lodash';
import { StyleSheet, Text, View, FlatList, Switch } from 'react-native';

class DeliveryGroup extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      switchValue: this.props.item.InMaintenanceMode,
      customerId: 'uh9wi6bswb26',
      siteId: 'c01ec8a0-229b-4b7e-9bb9-ea9a96ffeb78',
      
    };
   } 

   toggleSwitch = (value) => {
    const { customerId, siteId } = this.state;
    const url = `https://${customerId}.xendesktop.net/citrix/orchestration/api/techpreview/${customerId}/${siteId}/DeliveryGroups/${this.props.item.Id}`;
    const headers = new Headers();
    const patchPayload = this.state.switchValue ? false : true;
    console.log(patchPayload);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiN2I4NmQzYjQtY2FhYS00M2Q4LWE2ZWYtN2MxNmEwZjNkZDIyIiwicHJpbmNpcGFsIjoiYW5nZWxvLnNhcmFjZW5vQGNpdHJpeC5jb20iLCJhY2Nlc3NfdG9rZW5fc2NvcGUiOiIiLCJyZWZyZXNoX3Rva2VuIjoiIiwiYWNjZXNzX3Rva2VuIjoiIiwiZGlzcGxheU5hbWUiOiJBbmdlbG8gU2FyYWNlbm8iLCJyZWZyZXNoX2V4cGlyYXRpb24iOiIxNTU3OTEzMTY3MTM4IiwiY3VzdG9tZXJzIjoiW3tcIkN1c3RvbWVySWRcIjpcInVoOXdpNmJzd2IyNlwiLFwiR2VvXCI6XCJVU1wifV0iLCJlbWFpbF92ZXJpZmllZCI6IlRydWUiLCJjdHhfYXV0aF9hbGlhcyI6IjM3MDhmNTgxLTYwOTAtNDI1NS04ZTM1LTU0Y2JkY2M3NzQxMCIsIm5hbWUiOiJBbmdlbG8gU2FyYWNlbm8iLCJzdWIiOiI3Yjg2ZDNiNC1jYWFhLTQzZDgtYTZlZi03YzE2YTBmM2RkMjIiLCJlbWFpbCI6ImFuZ2Vsby5zYXJhY2Vub0BjaXRyaXguY29tIiwiYW1yIjoiW1wiY2xpZW50XCJdIiwiZGlzY292ZXJ5Ijoie1wiSXNzdWVyXCI6XCJodHRwczovL3RydXN0LXVzLmNpdHJpeHdvcmtzcGFjZXNhcGkubmV0XCJ9IiwiaXNzIjoiY3dzIiwiZXhwIjoxNTU3ODczNTY3LCJuYmYiOjE1NTc4Njk5Njd9.pBZEJzohoKON7YXtwOcqzOB0qQr1DvghdXBtjjJje1Izt3Kes1ORtgzGB8QiGa_IJYd7qmsAyV3PIZt7wZCSUT32b4B8yeS-WR4BaCpM9878EEx5oYM9e9Z2RowEl3BuYkw-4kQzCv9rrXLEbSX0MT9b19rTsUky9cqgbGjS9IQXG8oZCWGhCi3LVLXPV6zDe9Q1-B6JRFLb8cWnPfmsAcv_6Y1Y88kLW83gOvn-pm_ReLRvxwoP2GRarumCLmSUH3FjlN28MbITfoc1k7WZ2NNgkOJAdIX6hhxF5JsvHmr8PTIF_QYq2wfiTLUwdpzpdJEkyW_NN0euV23USPajcA');
    fetch(url, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({
        'InMaintenanceMode': patchPayload,
      }),
    })    
    .then(res => {
      if (res.status === 200) {
        this.setState({
          switchValue: patchPayload,
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
    //state changes according to switch
    //which will result in re-render the text
 }
 
   render() {
    return (
      <View>
      <Text style={styles.itemTitle}>{this.props.item.Name}</Text>
      <Text style={styles.itemSubTitle}>{`${this.props.item.SessionSupport} - Total Desktops ${this.props.item.TotalDesktops}`}</Text>
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
     customerId: 'uh9wi6bswb26',
     siteId: 'c01ec8a0-229b-4b7e-9bb9-ea9a96ffeb78',
     error: null,
     refreshing: false,
   };
  
  }

  componentDidMount() {
    this.makeDeliveryGroupGet();
    console.log("Sent request");
  }

  makeDeliveryGroupGet = () => {
    const { customerId, siteId } = this.state;
    const url = `https://${customerId}.xendesktop.net/citrix/orchestration/api/techpreview/${customerId}/${siteId}/DeliveryGroups`;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiN2I4NmQzYjQtY2FhYS00M2Q4LWE2ZWYtN2MxNmEwZjNkZDIyIiwicHJpbmNpcGFsIjoiYW5nZWxvLnNhcmFjZW5vQGNpdHJpeC5jb20iLCJhY2Nlc3NfdG9rZW5fc2NvcGUiOiIiLCJyZWZyZXNoX3Rva2VuIjoiIiwiYWNjZXNzX3Rva2VuIjoiIiwiZGlzcGxheU5hbWUiOiJBbmdlbG8gU2FyYWNlbm8iLCJyZWZyZXNoX2V4cGlyYXRpb24iOiIxNTU3OTEzMTY3MTM4IiwiY3VzdG9tZXJzIjoiW3tcIkN1c3RvbWVySWRcIjpcInVoOXdpNmJzd2IyNlwiLFwiR2VvXCI6XCJVU1wifV0iLCJlbWFpbF92ZXJpZmllZCI6IlRydWUiLCJjdHhfYXV0aF9hbGlhcyI6IjM3MDhmNTgxLTYwOTAtNDI1NS04ZTM1LTU0Y2JkY2M3NzQxMCIsIm5hbWUiOiJBbmdlbG8gU2FyYWNlbm8iLCJzdWIiOiI3Yjg2ZDNiNC1jYWFhLTQzZDgtYTZlZi03YzE2YTBmM2RkMjIiLCJlbWFpbCI6ImFuZ2Vsby5zYXJhY2Vub0BjaXRyaXguY29tIiwiYW1yIjoiW1wiY2xpZW50XCJdIiwiZGlzY292ZXJ5Ijoie1wiSXNzdWVyXCI6XCJodHRwczovL3RydXN0LXVzLmNpdHJpeHdvcmtzcGFjZXNhcGkubmV0XCJ9IiwiaXNzIjoiY3dzIiwiZXhwIjoxNTU3ODczNTY3LCJuYmYiOjE1NTc4Njk5Njd9.pBZEJzohoKON7YXtwOcqzOB0qQr1DvghdXBtjjJje1Izt3Kes1ORtgzGB8QiGa_IJYd7qmsAyV3PIZt7wZCSUT32b4B8yeS-WR4BaCpM9878EEx5oYM9e9Z2RowEl3BuYkw-4kQzCv9rrXLEbSX0MT9b19rTsUky9cqgbGjS9IQXG8oZCWGhCi3LVLXPV6zDe9Q1-B6JRFLb8cWnPfmsAcv_6Y1Y88kLW83gOvn-pm_ReLRvxwoP2GRarumCLmSUH3FjlN28MbITfoc1k7WZ2NNgkOJAdIX6hhxF5JsvHmr8PTIF_QYq2wfiTLUwdpzpdJEkyW_NN0euV23USPajcA')
    // this.setState({ loading: true });
    fetch(url, {
      method: 'GET',
      headers: headers,
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        data: res,
        loading: false
      });
    })
      .catch(error => {
        this.setState({ error, loading: false });
        console.log(error);
      });
  };



  render() {
    if (this.state.loading) return null;
    const newState = {...this.state};
    // console.log(items.Id);
    // console.log(typeof items);
    console.log(newState.data.Items);
    console.log(typeof newState.data.Items);
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Delivery Groups</Text>
        <FlatList
          data={newState.data.Items}
          renderItem={({item}) => 
          <DeliveryGroup item={item}/>
          }
          keyExtractor={item => item.Id}
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