import React, { Component } from 'react';
import { SafeAreaView, TextInput, Button, View ,Text, TouchableOpacity, ScrollView} from 'react-native';
import {StyleSheet} from 'react-native'
import io from 'socket.io-client'
import { color } from 'react-native-reanimated';
var socket;
class Home extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            room:this.props.navigation.state.params.room.trim().toLowerCase(),
            name:this.props.navigation.state.params.name.trim().toLowerCase(),
            message:"",
            messages:[],
        }
        this.setScrollRef=this.setScrollRef.bind(this);
        this.handelSendMessage=this.handelSendMessage.bind(this);
    }
    componentDidMount()
    {
     socket=io("http://192.168.43.212:5000")


     
     socket.emit('join',{name:this.state.name,room:this.state.room},(error)=>{
       if(error)
       {
        alert(error);
        this.props.navigation.navigate("Home");
       }
     });
     socket.on('message',(message)=>{

        this.setState({messages:[...this.state.messages,message]})
       
     })
    }
    componentDidUpdate()
    {
        this.scrollRef.scrollToEnd({animated: true})
    }
     componentWillUnmount()
     {
         socket.emit('disconnect');

     }
    handelSendMessage()
    {


        if(!this.state.message) return;
        socket.emit("sendMessage",this.state.message,()=>{})
        this.setState({message:""})
    }
    setScrollRef(ele)
    {
   this.scrollRef=ele;
    }
    render() { 
        
      
        return ( 
            <SafeAreaView style={styles.MainBody}>
               <View style={styles.chatHeader}>
                
                <View style={styles.leftHeader}>
                <Text style={styles.fontStyle}>Welcome,{this.props.navigation.state.params.name}
                </Text>
                </View>
                <View style={styles.gap}></View>
                <View style={styles.rightHeader}>
                <Text style={styles.fontStyle} >{this.props.navigation.state.params.room}</Text>
                </View>
                
                </View>
                <View style={styles.chatBox}>
                <ScrollView ref={this.setScrollRef}>

               {this.state.messages.map((message,i)=>{

                 

                   if(this.state.name===message.user)
                   {

                   return (
                   <View key={i} style={styles.messageBox,styles.rightBox}>
                  <View style={styles.rightMessage}>
                   <Text style={styles.right} >{message.text}</Text></View>
                   <Text style={styles.user}>{this.state.name}</Text>
                   </View>
                   
                   );
                   
                   }
                   else
                   {
                    return (
                        <View key={i} style={styles.messageBox,styles.leftBox}>
                         
                        
                        
                        <View style={styles.leftMessage}>
                   <Text style={styles.left} >{message.text}</Text></View>
                   <Text style={styles.user}>{message.user}</Text>
                        </View>);
                   }

               })}

               
                </ScrollView>
                </View>
                   <View style={styles.inputPanel}>
                       <TextInput value={this.state.message} style={styles.inputStyle} onChangeText={(text)=>{this.setState({message:text})}} />
                       <TouchableOpacity style={styles.button} onPress={()=>this.handelSendMessage()}>
                           <Text style={{color:'white',fontSize:20}}>Send</Text>
                        </TouchableOpacity>
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
    fontStyle:{
        fontSize:15,
        
    },
    user:{
        color:'#828282'
    },
   leftHeader:{
flex:3,
justifyContent:'center',
alignItems:'center',

   },
   gap:{
       flex:5
   },
   rightHeader:{
flex:2,

justifyContent:'center',
alignItems:'center',
   },
   right:{
 
    color:'white',
    fontSize:20,
    
   },
   rightMessage:{
    backgroundColor:'#2979FF',
    borderRadius:10,
    overflow: 'hidden',
    maxWidth: '70%',
    padding: 10,
    marginLeft:5,
    marginTop:2,
    marginRight:3
   },
   leftMessage:{
    backgroundColor:'#F3F3F3',
    borderRadius:10,
    borderColor:'black',
    borderWidth:1,
    maxWidth: '70%',
    overflow: 'hidden',
    padding: 10,
    marginRight:5,
    marginTop:2
   },
  
   left:{
   
    color:'black',
    fontSize:20,

   },
  
    chatHeader:{
        flex:1,
        flexDirection:'row',
        borderColor:'black',
        borderBottomWidth:1,

    },
    chatBox:{
        flex:8,
        
    },
    messageBox:
    {
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      margin:3
    },
    leftBox:{
        flexDirection:'row', 
        textAlign:'left',
        marginLeft:10
    },
    rightBox:{
        flexDirection:'row-reverse' ,
        textAlign:'right',
        marginRight:10
       
        
    },
    message:{
       
        
    },
    inputPanel:{
        flex:1,
        flexDirection:'row'
    },
    inputStyle:{
flex:8,
borderColor:'black',
borderWidth:1,
    },
    button:{

        flex:2,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'blue'
    }

})
 
export default Home;