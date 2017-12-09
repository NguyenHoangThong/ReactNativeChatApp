import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Animated,
    Easing,
    Image,
    View,
    AsyncStorage
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

import spinner from '../Images/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

class ButtonSubmit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };

        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
        this._onPress = this._onPress.bind(this);
    };


    _login(){
        AsyncStorage.setItem('token', 'abcd');
        // const json = JSON.stringify(data)
        // fetch('http://localhost:3000/users/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Accept: 'application/json'
        //     },
        //     body: json
        // })
        //     .then((response) => response.json())
        //     .then((res) => {
        //         if (res.error) {
        //             alert(res.error)
        //         } else {
        //             AsyncStorage.setItem('token', res.token)
        //             alert(`Success! You may now access protected content.`)
        //             // Redirect to home screen
        //
        //         }
        //     })
        //     .catch(() => {
        //         alert('There was an error logging in.');
        //     })
        //     .done()

    }
    _onPress() {
        if (this.state.isLoading) return;
        //method post login
        //true = success

        this.setState({ isLoading: true });
        Animated.timing(
            this.buttonAnimated,
            {
                toValue: 1,
                duration: 200,
                easing: Easing.linear
            }
        ).start();

        setTimeout(() => {
            this._onGrow();
        }, 2000);
        this._login();

        setTimeout(() => {
            Actions.tabbar();
            // alert("change screen ok");
            this.setState({ isLoading: false });
            this.buttonAnimated.setValue(0);
            this.growAnimated.setValue(0);
            alert(this.props.username);

        }, 2300);
    }

    _onGrow() {
        Animated.timing(
            this.growAnimated,
            {
                toValue: 1,
                duration: 200,
                easing: Easing.linear
            }
        ).start();
    }

    render() {
        const changeWidth = this.buttonAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
        });
        const changeScale = this.growAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, MARGIN]
        });

        return (
            <View style={styles.container} username={this.props.username}
                                           password={this.props.password}>
                <Animated.View style={{width: changeWidth}}>
                    <TouchableOpacity style={styles.button}
                                      onPress={this._onPress}
                                      activeOpacity={1} >
                        {this.state.isLoading ?
                            <Image source={spinner} style={styles.image} />
                            :
                            <Text style={styles.text}>LOGIN</Text>
                        }
                    </TouchableOpacity>
                    <Animated.View style={[ styles.circle, {transform: [{scale: changeScale}]} ]} />
                </Animated.View>
            </View>
        );
    }
}
ButtonSubmit.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: -95,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F035E0',
        height: MARGIN,
        borderRadius: 20,
        zIndex: 100,
    },
    circle: {
        height: MARGIN,
        width: MARGIN,
        marginTop: -MARGIN,
        borderWidth: 1,
        borderColor: '#F035E0',
        borderRadius: 100,
        alignSelf: 'center',
        zIndex: 99,
        backgroundColor: '#F035E0',
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    image: {
        width: 24,
        height: 24,
    },
});

export default ButtonSubmit;