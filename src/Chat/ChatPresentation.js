import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import {
    Avatar,
    Header,
    SearchBar,
    Icon,
    List,
    ListItem
} from 'react-native-elements';
import { Actions, ActionConst } from 'react-native-router-flux';

const USER_ID = '@userId';

class ChatPresentation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            userId: null,
            userName: this.props.username
        };

        this.determineUser = this.determineUser.bind(this);
        this.onReceivedMessage = this.onReceivedMessage.bind(this);
        this.onSend = this.onSend.bind(this);
        this._storeMessages = this._storeMessages.bind(this);

        this.socket = SocketIOClient('http://192.168.1.12:3001', { transports: ['websocket'] });
        this.socket.on('message', this.onReceivedMessage);
        this.determineUser();
    }


    async checkToken(){
        try {
            const value = await AsyncStorage.getItem('token');
            return value;
        } catch (error) {
            // Error retrieving data
        }
    }


    iconComponent(){
        return (
            <Icon
                name="arrow-back"
                size={30}
                color="#4F8EF7"
                onPress={() =>{
                    Actions.tabbar();
                }}
            />
        );
    }
    /**
     * When a user joins the chatroom, check if they are an existing user.
     * If they aren't, then ask the server for a userId.
     * Set the userId to the component's state.
     */
    determineUser() {
        alert(this.state.userName);
        AsyncStorage.getItem(USER_ID)
            .then((userId) => {
                // If there isn't a stored userId, then fetch one from the server.
                if (!userId) {
                    this.socket.emit('userJoined', null);
                    this.socket.on('userJoined', (userId) => {
                        AsyncStorage.setItem(USER_ID, userId);
                        this.setState({ userId });
                    });
                } else {
                    this.socket.emit('userJoined', userId);
                    this.setState({ userId });
                }
            })
            .catch((e) => alert(e));
    }

    // Event listeners
    /**
     * When the server sends a message to this.
     */
    onReceivedMessage(messages) {
        this._storeMessages(messages);
    }

    /**
     * When a message is sent, send the message to the server
     * and store it in this component's state.
     */
    onSend(messages=[]) {
        this.socket.emit('message', messages[0]);
        this._storeMessages(messages);
    }

    render() {
        this.checkToken().then((value) => {
            if(value === null){
                Actions.login();
            }
        });
        let user = { _id: this.state.userId || -1 };
        let username = this.state.userName || "";
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#26abf3'
            }}>
                <Header
                    leftComponent={this.iconComponent()}
                    centerComponent={{ text: username, style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />

                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.onSend}
                    user={user}
                />
            </View>


        );
    }

    // Helper functions
    _storeMessages(messages) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
    }
}

module.exports = ChatPresentation;
