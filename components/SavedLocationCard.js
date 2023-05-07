import React from "react";
import {
    Divider,
    Image,
    Text,
    Box,
    HStack,
    View,
    Center,
    Flex,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants/theme";
import deleteIcon from '../assets/delete-icon.png'
import homeIcon from '../assets/home-icon.png'

const SavedLocationCard = ({ onClickDelete }) => {
    return (
            <View h={95} style={{
                backgroundColor: COLORS.tertiary,
                justifyContent:'center',
            }}>
                <HStack style={{marginHorizontal: 10}}>
                    <Center style={{
                        width: 52,
                        height: 52,
                        borderRadius: 52 / 2,
                        backgroundColor: COLORS.fourthary,
                        justifyContent:'center',
                    }}>
                        <Image alt="home icon" source={homeIcon} style={{
                            width: 29,
                            height: 27,
                        }}></Image>
                    </Center>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 15,
                        flexWrap: 'wrap',
                        flexShrink: 2,
                    }}>
                        <Text style={{
                            color: COLORS.white,
                            ...FONTS.h5,
                            fontWeight: 'bold',
                        }}>Home
                        </Text>
                        <Text style={{
                            color: COLORS.white,
                            ...FONTS.body6,
                            
                        }}>Hẻm 409, đường TCH18, phường Tân Chánh Hiệp Quận 12, Tp.HCM
                        </Text>
                        <Divider bgColor={'#192157'} style={{marginTop:14}}>
                        </Divider>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        marginLeft: 20,
                    }}>
                        <TouchableOpacity onPress={()=>{onClickDelete}}>
                            <Image source={deleteIcon} style={{
                                width: 18,
                                height: 16,
                            }}></Image>
                        </TouchableOpacity>
                    </View>
                </HStack>
            </View>
    );
};
export default SavedLocationCard; 