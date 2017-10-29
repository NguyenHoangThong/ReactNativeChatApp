import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    TextInput
} from 'react-native'

class LoginPresentation extends Component<{}> {
    render(){
        return(
            <View style={styles.container}>
                <TextInput

                />
            </View>
        )
    }
}
export default LoginPresentation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#26abf3',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#4af4ec',
        borderWidth: 1
    }
});