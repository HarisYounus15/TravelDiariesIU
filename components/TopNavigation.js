import React, { useState, useEffect } from 'react';
import { Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChatBubbleBottomCenterIcon } from 'react-native-heroicons/outline';

const TopNavigation = ({ screenName, route }) => {
  const { email } = route.params;
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://192.168.1.108:3000/api/users/${email}`);
        const data = await response.json();

        if (response.ok) {
          setUserData(data.users[0]);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Network request failed');
      }
    };

    fetchUserData();
  }, [email]);

  const profilePictureUrl = userData ? `http://192.168.1.108/${userData.image.path}` : null;

  return (
    <>
     <View style={styles.topNav}>
        <TouchableOpacity onPress={toggleSideMenu}>
          <Image source={require('../assets/menu.png')} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 20 }}>{screenName}</Text>
      {profilePictureUrl ?(
        
        <TouchableOpacity onPress={()=>navigation.navigate('Profile',route={route})}>
        <Image style={{ width: 50, height: 50 }} source={{ uri: profilePictureUrl }} />
        </TouchableOpacity>

      ):(
        <View style={{ width: 50, height: 50, backgroundColor: 'gray' }} />

      )}
        
      </View>
      {isSideMenuOpen && (
        <View style={styles.sideMenu}>
          <TouchableOpacity onPress={()=>navigation.navigate('Home',route={route})}>
          <ChatBubbleBottomCenterIcon size={20} color='white' stroke={1}/>
            <Text style={styles.sideMenuItem}>Discover</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('Journal')}>
          <ChatBubbleBottomCenterIcon size={20} color='white' stroke={1}/>

            <Text style={styles.sideMenuItem}>Feed</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('CreateJournal',route={route})}>
          <ChatBubbleBottomCenterIcon size={20} color='white' stroke={1}/>
            <Text style={styles.sideMenuItem}>Create Journal</Text>
          </TouchableOpacity>   
          <View style={{width:'100%',height:1,backgroundColor:'#527DBE'}}></View>
          <TouchableOpacity onPress={()=>navigation.navigate('Policy',route={route})}>
          <ChatBubbleBottomCenterIcon size={20} color='white' stroke={1}/>
            <Text style={styles.sideMenuItem}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('Journal',route={route})}>
          <ChatBubbleBottomCenterIcon size={20} color='white' stroke={1}/>
            <Text style={styles.sideMenuItem}>About Us</Text>
          </TouchableOpacity>
          <View style={{width:'100%',height:1,backgroundColor:'#527DBE'}}></View>
          <TouchableOpacity onPress={()=>navigation.navigate('Journal',route={route})}>
          <ChatBubbleBottomCenterIcon size={30} color='white'  stroke={1}/>
            <Text style={styles.sideMenuItem}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 40,
    width: 'auto',
    height:'auto',
    paddingHorizontal:20,
    paddingVertical:5,
    backgroundColor: '#021024',
    zIndex:3,
  },
  sideMenu: {
    justifyContent:'center',
    alignItems:'flex-start',
    paddingLeft:50,
        position: 'absolute',
    top: 80,
    left: 0,
    width: 300,
    height:'100%',
    backgroundColor: '#021024',
    padding: 10,
    zIndex:2
  },
  sideMenuItem: {
    color: 'white',
    fontSize: 20,
    marginVertical: 20,
    flexDirection:'row',
    justifyContent:'space-evenly',

  },
});

export default TopNavigation;
