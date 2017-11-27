import  React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';

import Login from './src/Login/LoginPresentation';
import Chat from './src/Chat/ChatPresentation';
import FindFriend from './src/FindFriend/FindFriendPresentation';
import FriendList from './src/FriendList/FriendListPresentation';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabIcon = ({ selected, title }) => {
    return (
        <Icon name="users"/>
    );
}

class Routers extends Component<{}> {
    render(){
        return (
            <Router>
                <Scene key='root' style={{ backgroundColor:'#000fff'}}>
                    <Scene key='login' component={Login} hideNavBar={true} initial/>
                    <Scene
                        key='tabbar'
                        tabs={true}
                        tabBarStyle={{ backgroundColor: '#FFFFFF' }}
                        hideNavBar={true}
                        tabBarPosition={'bottom'}
                    >
                        <Scene key='users' icon={TabIcon} >
                            <Scene
                                key="test"
                                component={FriendList}
                                hideNavBar={true}
                            />
                        </Scene>

                        <Scene key='find' >
                            <Scene
                                key="test3"
                                component={FindFriend}
                                hideNavBar={true}
                            />
                        </Scene>
                    </Scene>
                    <Scene key='chat' title='Chat' component={Chat} hideNavBar={true} />
                </Scene>


            </Router>
        )
    }
}
export default Routers;