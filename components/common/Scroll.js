import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';


const Scroll = (props) => {
   const {calendarViewContainer} = styles;
    return(
        <View style={calendarViewContainer}>
          <ScrollView>
          {props.children}
          </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    calendarViewContainer: {
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        alignItems: 'center',
        height: 340
      }
  });
export {Scroll};