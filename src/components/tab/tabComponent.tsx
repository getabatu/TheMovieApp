import React, { useState, useCallback } from 'react';
import { View, Dimensions, TouchableOpacity, Text, SafeAreaView, ScrollView } from 'react-native';
import { Icon } from 'native-base';


const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export interface Props {

};

const TabComponent: React.FC<Props> = (props) => {
    const {
        routes,
        index
    } = props.navigation.state;
    const [tabIndex, setTabIndex] = useState(index);

    const goToHome = useCallback(() => {
        setTabIndex(0)
        props.navigation.navigate("HomeScreen");
    }, []);

    const goToInfo = useCallback(() => {
        setTabIndex(1)
        props.navigation.navigate("InfoScreen");
    }, []);

    const tabData = [
        {
            id: 0,
            name: 'Home',
            icon: 'home',
            contentIndex: ['white', 'black'],
            backgoundIndex: ['gray', 'white'],
            onPressFunction: goToHome
        },
        {
            id: 0,
            name: 'Favourite',
            icon: 'star',
            backgoundIndex: ['white', 'gray'],
            contentIndex: ['black', 'white'],
            onPressFunction: goToInfo
        },
    ]

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', height: 60, width }} >
                {
                    tabData.map((obj, index) => {
                        return (
                            <TouchableOpacity onPress={obj.onPressFunction} style={{ margin: 5, borderRadius: 5, height: 50, width: '45%', justifyContent: 'center', alignItems: 'center', backgroundColor: obj.backgoundIndex[tabIndex] }} >
                                <Icon name={obj.icon} type="FontAwesome" style={{ fontSize: 23, color: obj.contentIndex[tabIndex] }} />
                                <Text style={{ color: obj.contentIndex[tabIndex] }} >{obj.name}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </SafeAreaView>
    )
};

export default TabComponent;