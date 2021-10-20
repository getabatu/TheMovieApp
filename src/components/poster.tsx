import React from 'react';
import { View, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import dateFormat from 'dateformat';
import { Icon } from 'native-base';

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export interface Props {
    title: string;
    image: any;
    releaseDate: any;
    onClickFav: () => void;
    isFav: boolean;
};

const HeaderMenu: React.FC<Props> = (props) => {
    return (
        <View style={{ justifyContent: 'space-between', width: width / 3.3, marginTop: 20, marginBottom: 40, }} >
            <View>
                <Image
                    style={{ borderRadius: 10, resizeMode: 'stretch', width: '100%', height: width / 2.2, }}
                    source={props.image}
                />
                <Text style={{ width: '100%', marginTop: 8, fontSize: 14, color: 'white' }} >
                    {props.title}
                </Text>
                <Text style={{ width: '100%', marginTop: 8, fontSize: 14, color: 'white' }} >
                    Release on {'\n'}{dateFormat(props.releaseDate, 'dd mmm yyyy')}
                </Text>
            </View>
            <TouchableOpacity onPress={props.onClickFav} style={{ alignSelf: 'flex-end', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }} >
                <Icon name={props.isFav ? 'check' : 'add'} type={"MaterialIcons"} style={{ fontSize: 23, color: 'white' }} />
                <Text style={{ marginRight: 1, fontSize: 14, color: 'white' }} >
                    Favourite
                </Text>
            </TouchableOpacity>
        </View>
    )
};

export default HeaderMenu;