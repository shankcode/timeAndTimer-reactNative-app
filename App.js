import React, { Component } from 'react';
import {
  StyleSheet,
  AppRegistry,
  StatusBar,
  TextInput,
  Button,
  View,
  Text
} from 'react-native';


let comment;
let interval;

export default class MyApp extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: 'there',
      date: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      currHour: new Date().getHours(),
      currMin: new Date().getMinutes(),
      currSec: new Date().getSeconds(),
      countStart: '',
      milliSec: 0
    };
    this.handlePressAfterCheck = this.handlePressAfterCheck.bind(this);
    this.handleTimerCheck = this.handleTimerCheck.bind(this);
    this.handleTimerStop = this.handleTimerStop.bind(this);
  }

  componentWillMount() {
    setInterval(() => {
      this.setState({
        currHour: new Date().getHours(),
        currMin: new Date().getMinutes(),
        currSec: new Date().getSeconds(),
        date: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
      })
    }, 1000);
  }

  handleTimerCheck() {
    this.state.countStart === '' ? this.handlePressAfterCheck() : comment = 'Timer already running!';
  }

  handleTimerStop() {
    clearInterval(interval);
    this.setState({milliSec: 0, countStart: ''});
    comment = '';
  }

  handlePressAfterCheck() {
    let staticDateTime = new Date();
    this.setState({ countStart: '1' });
    interval = setInterval(() => {
      let milliSec = new Date() - staticDateTime;
      this.setState({milliSec});
    }, 1000);
  }


  render(){
    return (
      <View style={styles.container}>
        <StatusBar hidden={false}/>
        <View style={styles.view1}>
          <Text style={{fontSize: 40}}>Hello, {this.state.name}! </Text>
          <Text></Text>
          <TextInput
            style={styles.inputText}
            placeholder="Enter your name!"
            placeholderTextColor='#a6a6a6'
            onChangeText={(text) => text ? this.setState({name: text}) : this.setState({name: 'there'})}
          />
        </View>
        <View style={styles.view2}>
          <Text style={{fontSize: 25, marginBottom: 15 }}># Time is::</Text>
          <Text style={{fontSize: 23, marginBottom: 15}}>
            {`${this.state.date}/${this.state.month}/${this.state.year}  ${this.state.currHour}:${this.state.currMin}:${this.state.currSec}`}
          </Text>
          <Text>--------------------------------------------</Text>
          <Text style={{marginBottom: 15}} >--------------------------------------------</Text>
          <Text style={{fontSize: 25, marginBottom: 15}}># Timer::</Text>
          <Text style={{fontSize: 23, marginBottom: 15}}>
            {Math.round(this.state.milliSec/1000)}
          </Text>
          <Text>{ comment }</Text>
        </View>
        <View style={styles.view3}>
          <Button
            onPress={this.handleTimerCheck}
            title='Start'
            color='green'
          />
          <Button
            onPress={this.handleTimerStop}
            title='Stop'
            color='red'
          />
        </View>
      </View>
    );
  }
}



//StyleSheet for the App
const styles = StyleSheet.create({
  container: {
    flex: 1,

    overflow: 'scroll'
  },
  inputText: {
    width: '50%',
    height: '20%',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    fontSize: 20
  },
  view1: {
    flex: 1,
    backgroundColor: '#fdcb6e',
    justifyContent: 'center',
    alignItems: 'center'
  },
  view2: {
    flex: 2,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  view3: {
    flex: 1,
    backgroundColor: '#fab1a0',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
})
