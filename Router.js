import  React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';

import Login from './src/Login/LoginPresentation';
import Chat from './src/Chat/ChatPresentation';
import FindFriend from './src/FindFriend/FindFriendPresentation';
import FriendList from './src/FriendList/FriendListPresentation';

// const TabIcon = ({ selected, title }) => {
//     return (
//         <Text style={{color: selected ? 'red' :'black'}}>{title}</Text>
//     );
// }

class Routers extends Component<{}> {
    render(){
        return (
            <Router>
                <Scene key='root'>
                    <Scene key='login' component={Login} hideNavBar={true}/>
                    <Scene
                        key='tabbar'
                        tabs={true}
                        tabBarStyle={{ backgroundColor: '#FFFFFF' }}
                        hideNavBar={true}
                        tabBarPosition={'bottom'}
                        initial
                    >
                        <Scene key='find' title='Find'   >
                            <Scene
                                key="test"
                                component={FriendList}
                                title="Scarlet"
                                hideNavBar={true}
                            />
                        </Scene>

                        <Scene key='list' title='List' >
                            <Scene
                                key="test3"
                                component={FindFriend}
                                title="Sssss"
                                hideNavBar={true}
                            />
                        </Scene>
                    </Scene>
                    <Scene key='chat' title='Chat' component={Chat}/>
                </Scene>


            </Router>
        )
    }
}
export default Routers;