import React from 'react';
import {Button, View} from 'react-native';
import {Audio} from 'expo-av';

export default class Som extends React.Component{
  constructor(props){
    super(props);
    this.som = new Audio.Sound();
    this.som.loadAsync(require('../assets/pokemon-theme-song-original2.mp3'));
  }
  
  tocar(){
    this.som.setPositionAsync(0);
    this.som.playAsync();
    this.som.setOnPlaybackStatusUpdate( (estado) => {
      if(estado.didJustFinish == true){
        console.log("fim");
        this.som.setPositionAsync(0);
        this.som.playAsync();
      }
      else{
        console.log("playing...");
      }
    } )
  }

  parar(){
    this.som.stopAsync();
  }

  render(){
    return(
      <View style={{height: '100%', display: 'flex', 
                    justifyContent: 'space-around'}}>
        <Button title="Musica" onPress={()=>this.tocar()}></Button>
      </View>
    )
  }
} 
