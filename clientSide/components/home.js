import React, { Component } from 'react';
import { SafeAreaView, TextInput, Button, View ,Text,Image} from 'react-native';
import {StyleSheet} from 'react-native'
class Home extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            
            name:'',
            room:'',
        }
        this.handelJoin=this.handelJoin.bind(this);
    }
    
    handelJoin()
    {
        if(!this.state.name || !this.state.room)
        {
            alert("both Required")
            return;
        }

        this.props.navigation.navigate('Room',{...this.state})
           this.setState({
               title:"",
               description:'',
           })
    }
    render() { 
        return ( 
            <SafeAreaView style={styles.MainBody}>
                
                <View style={styles.mainView}>

                  
                 <TextInput style={styles.inputStyle} placeholder={'Name'} value={this.state.name} onChangeText={(text)=>this.setState({name:text})} />
               

                 <TextInput style={styles.inputStyle}  placeholder={'Room'} value={this.state.room} onChangeText={(text)=>this.setState({room:text})} />
                 <View style={styles.toList}>
                     <Button title={'Join'} onPress={()=>{this.handelJoin()}} />
                     </View>
                </View>
             </SafeAreaView>
         );
    }
}



const styles=StyleSheet.create({
    MainBody:{
        flex:1,
        justifyContent:"center",
       
    },
    inputStyle:{
        
        borderColor:'black',
        borderWidth:1,
        
        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        margin:4
    },
    
    mainView:{
        flex:1,
        justifyContent:'center',
        fontSize:25,
        fontFamily:'bold',

       margin:15,
       
    },
    toList:{
        
        justifyContent: 'space-around',
        paddingTop:20
    }

})
 
export default  Home;