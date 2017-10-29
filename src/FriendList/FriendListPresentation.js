import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'

class FriendListPresentation extends Component<{}> {
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    FriendList
                </Text>
            </View>
        )
    }
}
export default FriendListPresentation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
    },
});