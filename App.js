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
    headers.append('Authorization', 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiN2I4NmQzYjQtY2FhYS00M2Q4LWE2ZWYtN2MxNmEwZjNkZDIyIiwicHJpbmNpcGFsIjoiYW5nZWxvLnNhcmFjZW5vQGNpdHJpeC5jb20iLCJhY2Nlc3NfdG9rZW5fc2NvcGUiOiIiLCJyZWZyZXNoX3Rva2VuIjoiIiwiYWNjZXNzX3Rva2VuIjoiIiwiZGlzcGxheU5hbWUiOiJBbmdlbG8gU2FyYWNlbm8iLCJyZWZyZXNoX2V4cGlyYXRpb24iOiIxNTU5NzIyMTkxNTg5IiwiY3VzdG9tZXJzIjoiW3tcIkN1c3RvbWVySWRcIjpcInVoOXdpNmJzd2IyNlwiLFwiR2VvXCI6XCJVU1wifV0iLCJlbWFpbF92ZXJpZmllZCI6IlRydWUiLCJjdHhfYXV0aF9hbGlhcyI6IjM3MDhmNTgxLTYwOTAtNDI1NS04ZTM1LTU0Y2JkY2M3NzQxMCIsIm5hbWUiOiJBbmdlbG8gU2FyYWNlbm8iLCJzdWIiOiI3Yjg2ZDNiNC1jYWFhLTQzZDgtYTZlZi03YzE2YTBmM2RkMjIiLCJlbWFpbCI6ImFuZ2Vsby5zYXJhY2Vub0BjaXRyaXguY29tIiwiYW1yIjoiW1wiY2xpZW50XCJdIiwiZGlzY292ZXJ5Ijoie1wiSXNzdWVyXCI6XCJodHRwczovL3RydXN0LXVzLmNpdHJpeHdvcmtzcGFjZXNhcGkubmV0XCJ9IiwiaXNzIjoiY3dzIiwiZXhwIjoxNTU5NjgyNTkxLCJuYmYiOjE1NTk2Nzg5OTF9.oeqWRhyRti3OC4FOvQhRVQiY9nwEhjMXhvxWhm6sFgyMrxPMNdOAtcya7sgtq0bfdwDQK2yhaoE3EM5hm4NeUkgRZ5w0QIQgjfhgHOgnwh3cmNXq4NwzCSOFyPTUhK-lgNjyeEGu5asFaycqYD-vvKiqXDmJztlOkC0CnV060wbeBi0JrKsEBU_OmIv2DnI4CCYfBolkJKv8oeNqobVsAZ9k_OSfJ8kbAlz4FCTnaBRoxD2GiPW5NR1DQsD3I-A0FkDaZOFXdNHTktUUn8uY2D-ABIxPRf_Q_li1Ci-Q4YqUaX-_IXBDIiF1bIpYO26iSx5axw-BviC6OcPdLre3Ng');
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
    headers.append('Authorization', 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiN2I4NmQzYjQtY2FhYS00M2Q4LWE2ZWYtN2MxNmEwZjNkZDIyIiwicHJpbmNpcGFsIjoiYW5nZWxvLnNhcmFjZW5vQGNpdHJpeC5jb20iLCJhY2Nlc3NfdG9rZW5fc2NvcGUiOiIiLCJyZWZyZXNoX3Rva2VuIjoiIiwiYWNjZXNzX3Rva2VuIjoiIiwiZGlzcGxheU5hbWUiOiJBbmdlbG8gU2FyYWNlbm8iLCJyZWZyZXNoX2V4cGlyYXRpb24iOiIxNTU5NzIyMTkxNTg5IiwiY3VzdG9tZXJzIjoiW3tcIkN1c3RvbWVySWRcIjpcInVoOXdpNmJzd2IyNlwiLFwiR2VvXCI6XCJVU1wifV0iLCJlbWFpbF92ZXJpZmllZCI6IlRydWUiLCJjdHhfYXV0aF9hbGlhcyI6IjM3MDhmNTgxLTYwOTAtNDI1NS04ZTM1LTU0Y2JkY2M3NzQxMCIsIm5hbWUiOiJBbmdlbG8gU2FyYWNlbm8iLCJzdWIiOiI3Yjg2ZDNiNC1jYWFhLTQzZDgtYTZlZi03YzE2YTBmM2RkMjIiLCJlbWFpbCI6ImFuZ2Vsby5zYXJhY2Vub0BjaXRyaXguY29tIiwiYW1yIjoiW1wiY2xpZW50XCJdIiwiZGlzY292ZXJ5Ijoie1wiSXNzdWVyXCI6XCJodHRwczovL3RydXN0LXVzLmNpdHJpeHdvcmtzcGFjZXNhcGkubmV0XCJ9IiwiaXNzIjoiY3dzIiwiZXhwIjoxNTU5NjgyNTkxLCJuYmYiOjE1NTk2Nzg5OTF9.oeqWRhyRti3OC4FOvQhRVQiY9nwEhjMXhvxWhm6sFgyMrxPMNdOAtcya7sgtq0bfdwDQK2yhaoE3EM5hm4NeUkgRZ5w0QIQgjfhgHOgnwh3cmNXq4NwzCSOFyPTUhK-lgNjyeEGu5asFaycqYD-vvKiqXDmJztlOkC0CnV060wbeBi0JrKsEBU_OmIv2DnI4CCYfBolkJKv8oeNqobVsAZ9k_OSfJ8kbAlz4FCTnaBRoxD2GiPW5NR1DQsD3I-A0FkDaZOFXdNHTktUUn8uY2D-ABIxPRf_Q_li1Ci-Q4YqUaX-_IXBDIiF1bIpYO26iSx5axw-BviC6OcPdLre3Ng');
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