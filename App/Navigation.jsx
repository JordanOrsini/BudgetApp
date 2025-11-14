import {Component} from 'react';
import {Pressable, Text, View} from "react-native";
import {styles} from "./Style";

import AddTransaction from "./AddTransaction";

/* 
   Class representing the navigation component of the application.
*/
class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false, 
      data: [{id: 0, selected: false},
             {id: 1, selected: false},
             {id: 2, selected: false},
             {id: 3, selected: false},
            ],
    };
  }

  componentDidMount = () => {
    const newDataArray = [...this.state.data];
    newDataArray[this.props.selectedIndex].selected = true;
    this.setState({data: newDataArray});
  }

  setModalVisibility = (visibility) => {
    this.setState({modalVisible: visibility});
  }

  // Function that returns the navigation component.
  render () {
    return (
      <View style={styles.modalNavContainer}>      
        <AddTransaction modalVisibility={this.state.modalVisible} setVisibility={this.setModalVisibility}/>

        <View style={styles.navigationContainer}>
          <Pressable style={({pressed}) => [styles.navButton, styles.navButtonLeft, this.state.data[0].selected ? styles.selected : '', pressed ? styles.pressed : '']} onPress={() => this.props.navigation.navigate('Overview')}>
            <Text>Overview</Text>
          </Pressable>
          <Pressable style={({pressed}) => [styles.navButton, styles.navButtonMiddleLeft, this.state.data[1].selected ? styles.selected : '', pressed ? styles.pressed : '']} onPress={() => this.props.navigation.navigate('Budget')}>
            <Text>Budget</Text>
          </Pressable>
          <Pressable style={({pressed}) => [styles.navButton, styles.navButtonMiddle, pressed ? styles.pressed : '']} onPress={() => this.setModalVisibility(true)}>
            <Text>+</Text>
          </Pressable>
          <Pressable style={({pressed}) => [styles.navButton, styles.navButtonMiddleRight, this.state.data[2].selected ? styles.selected : '', pressed ? styles.pressed : '']} onPress={() => this.props.navigation.navigate('Transactions')}>
            <Text>Transactions</Text>
          </Pressable>
          <Pressable style={({pressed}) => [styles.navButton, styles.navButtonRight, this.state.data[3].selected ? styles.selected : '', pressed ? styles.pressed : '']} onPress={() => this.props.navigation.navigate('Settings')}>
            <Text>Settings</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

export default Navigation;