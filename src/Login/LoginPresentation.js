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
    render(){
        return(
            <View style={styles.container}>
                <Logo />
                <Form />
                <SignupSection/>
                <ButtonSubmit/>
            </View>
        )
    }
}
export default LoginPresentation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#26abf3',
        alignItems: 'center',
    }
});