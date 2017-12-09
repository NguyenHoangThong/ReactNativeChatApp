import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Dimensions,
    Image,
    Animated,
    TextInput,
    ListView,
    AsyncStorage
} from 'react-native';
import {
    Avatar,
    Header,
    SearchBar,
    Icon,
    List,
    ListItem

} from 'react-native-elements'

import data from '../Data';
const {width, height} = Dimensions.get('window');
import { Actions, ActionConst } from 'react-native-router-flux';
const list = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Online'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: '3 minutes ago'
    },

]


class FriendListPresentation extends Component<{}> {

    constructor(props){
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            isLoaded: false,
            isOpenMenu: false,
            dataSource: ds.cloneWithRows(list),
            rotateY: new Animated.Value(0),
            translateX: new Animated.Value(width),
            menuAnimation: new Animated.Value(0),
            text: ''
        }
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
            />
        );
    }
    // _onPress() {
    //     Actions.chat({username: });
    // }

    // renderRow(rowData){
    //     const img = rowData.image;
    //     _onPress= () =>{
    //         Actions.chat({username: rowData.username});
    //     }
    //     return (
    //         <TouchableHighlight style={styles.containerCell}
    //             onPress={_onPress}
    //         >
    //             <View>
    //                 <View style={styles.footerContainer}>
    //                     <View
    //                         style={styles.imageUser}
    //                     >
    //                         <Avatar
    //                             medium
    //                             rounded
    //                             source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
    //                         />
    //                     </View>
    //                     <Text style={styles.textBy}>{rowData.username}</Text>
    //                 </View>
    //             </View>
    //         </TouchableHighlight>
    //     )
    // }

    renderRow(rowData, sectionID) {
        return (
            <ListItem
                roundAvatar
                key={sectionID}
                title={rowData.name}
                subtitle={rowData.subtitle}
                avatar={
                    <Avatar
                        rounded
                        source={require('../Images/avatar.png')}
                        title={rowData.name[0]}
                    />
                }
                onPress={() =>{
                    Actions.chat({username: rowData.name});
                }}
            />
        )
    }

    filterSearch(text){
        // avatar={{uri:rowData.avatar_url}}
        const newData = list.filter((item) => {
            const itemData = item.name.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newData),
            text: text
        })
    }
    render(){
        this.checkToken().then((value) => {
            if(value === null){
                Actions.login();
            }
        });
        return (
            <View style={styles.container}>

                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'FRIEND', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />

                <SearchBar
                    containerStyle={ {backgroundColor: '#fefefe', marginBottom: 1}}
                    icon = {{ color: '#fefefe', name: 'search' }}
                    lightTheme
                    onChangeText={(text) => this.filterSearch(text) }
                    placeholder='Type Here...'
                />

                <List>
                    <ListView
                        renderRow={this.renderRow.bind(this)}
                        dataSource={this.state.dataSource}
                    />
                </List>

            </View>
        )
    }
}
export default FriendListPresentation;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#26abf3'
    },
    textInput: {
        height: 30,
        borderWidth: 1,
        borderColor: '#43fffa',
        marginBottom: 10,
        marginHorizontal: 10
    },
    content: {
        zIndex: 1
    },
    footerContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#26abf3'
    },
    imageAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 5
    },
    listContainer: {
        marginHorizontal: 10
    },
    text: {
        color: '#f8fff4'
    },
    containerCell: {
        marginBottom: 10
    },
    textTitle: {
        fontSize: 13
    },
    textBy: {
        fontSize: 20,
        margin: 10,
        flexWrap: 'wrap'
    },
    textMenu: {
        fontSize: 20,
        color: '#fff'
    }
});