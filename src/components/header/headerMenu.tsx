import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export interface Props {
    title: string
};

const HeaderMenu: React.FC<Props> = (props) => {
    return (
        <SafeAreaView style={{ backgroundColor: 'black' }} >
            <View style={{ width, justifyContent: 'center', backgroundColor: 'black', height: 60 }}>
                <Text style={{ fontSize: 18, fontWeight: '800', color: 'white', marginLeft: 20 }} >{props.title}</Text>
            </View>
        </SafeAreaView>
    )
};

export default HeaderMenu;