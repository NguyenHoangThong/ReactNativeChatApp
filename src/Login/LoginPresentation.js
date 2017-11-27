import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    TextInput
} from 'react-native'
import Logo from './Logo';
import SignupSection from './SignupSection';
import ButtonSubmit from './ButtonSubmit';
import Form from './Form';


class LoginPresentation extends Component<{}> {
    constructor(props){
        super(props);
        this.state ={
            username: '',
            password: ''
        }
    }

    handlePassword(text){
        this.setState({password:text});
    };

    handleUsername(text){
        this.setState({username: text});
    }

    render(){
        return(
            <View style={styles.container}>
                <Logo />
                <Form handlePassword={(text) => this.handlePassword(text)}
                      handleUsername={(text) => this.handleUsername(text)}/>
                <SignupSection/>
                <ButtonSubmit username={this.state.username}
                              password={this.state.password}
                />
            </View>
        )
    }
}
export default LoginPresentation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#43fffa',
        alignItems: 'center',
    }
});