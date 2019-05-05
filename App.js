/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View,FlatList } from 'react-native';
import { Scroll } from './components/common';
import axios from 'axios';
import { CachedImage } from 'react-native-cached-image';


export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      gridListItems: [
      ],
      responseData: [],
      currentWeatherData: [],
      forcastWeatherData: [],
    };
  }
  componentDidMount() {
    var axios = require('axios');
    axios.get('http://pragna.net/apiresult.php')
      .then(response => {
        this.setState({ currentWeatherData: response.data.data.current_condition, forcastWeatherData: response.data.data.weather });
      })
      .catch(error => {
        console.error(error);
      })
  }
  currentTempList(newArray) {
    return this.state.currentWeatherData.map(weatherdata => {
      const { temp_C, weatherIconUrl } = weatherdata;
      console.log(weatherIconUrl);
      var iconurl = [];
      iconurl = weatherIconUrl.map(valueurl => {
        const {value} = valueurl;
        return value.toString();
      })
      var todayTime = new Date();
      var day = todayTime.getDate();
      newArray.push({ date: day, temperature: temp_C + '°', icon: iconurl[0] });
    })
  }
  forcastTempList(newArray) {
    return this.state.forcastWeatherData.map(weatherdata => {
      const { maxtempC, date, hourly } = weatherdata;
      var valueArray = [];
      valueArray = hourly.map(hourlydata =>{
        const {weatherIconUrl} = hourlydata;
        var valueArray2 = [];
        valueArray2 = weatherIconUrl.map(weatherIcon => {
            const {value} = weatherIcon;
            console.log(value)
            if(value !=null){
              return value.toString();
            } else{
              return ('https://image.flaticon.com/icons/png/512/178/178342.png')
            }
        })
        return valueArray2[0];
      })
      var A = new Date(date);
      var B = A.getDate();
      newArray.push({ date: B, temperature: maxtempC + '°', icon: valueArray[3]});

    })
  }
  getCurrentMonth() {
    var d = new Date();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return (month[d.getMonth()])
  }
  render() {
    const { months, gridViewContainer,icon, day, temperature, alignTemperatureAndIcon } = styles;
    var newArray = this.state.gridListItems.slice();
    var n = this.getCurrentMonth();
    return (
      <View >
        <Text style={months}>{n}</Text>
        <Scroll>
            <FlatList
              data={newArray}
              renderItem={({ item }) =>
                <View style={gridViewContainer}>
                  <Text style={temperature}>{item.temperature}</Text>
                  <View style={alignTemperatureAndIcon}>
                    <Text style={day}>{item.date}</Text>
                    <CachedImage
                      style={icon}
                      source={{ uri: item.icon }}
                      onError={(e) => { this.props.source = { uri: 'https://image.flaticon.com/icons/png/512/178/178342.png' }}}
                    />
                  </View>
                </View>}
              numColumns={3}
            />
          </Scroll>
        {this.currentTempList(newArray)}
        {this.forcastTempList(newArray)}
      </View>
    );
  }
};
const styles = StyleSheet.create({
  temperature: {
    fontSize: 20,
    margin: 5,
    textAlign: 'right',
  },
  alignTemperatureAndIcon: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 5
  },
  day: {
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'space-between',
  },
  icon: {
    width: 30,
    height: 30,
    margin: 5,
  },
  months: {
    margin: 15,
    textAlign: 'right',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    fontSize: 20,
    paddingTop: 70,
    paddingBottom: 20,
    fontWeight: 'bold',
  },
  gridViewContainer: {
    height: 110,
    width: 110,
    margin: 3,
    backgroundColor: '#DCDCDC',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
});
