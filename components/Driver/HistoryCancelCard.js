import React from "react";
import {
    Center,
    Divider,
    Flex,
    HStack,
    Image,
    Text,
    VStack,
    View,
} from "native-base";
import { TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants/theme";
import locationLineIcon from "../../assets/location-line-full.png"

const HistoryCancelCard = ({ }) => {
    return (
        <View
            bgColor={COLORS.tertiary}
            w={"100%"}
            h={230}
            borderRadius={20}>
            <VStack space={1} paddingRight={26}>
                <HStack paddingLeft={26} space={12} marginTop={4} f alignItems={"center"} >
                    <Text color={COLORS.white} style={{
                        ...FONTS.h4,
                        fontWeight: 'bold'
                    }}>Phuong Uyen</Text>
                    <Text color={COLORS.white} style={{
                        ...FONTS.h3,
                        marginLeft: 5
                    }}>20,000đ</Text>
                    <View style={{
                        backgroundColor: 'rgba(233,84,84,0.3)',
                        borderRadius: 20,
                        height: 22,
                        width: 100,
                        alignItems: 'center', 
                        flex:1,
                    }}>
                        <Text style={{
                        color: COLORS.red,
                        ...FONTS.body6}}>CANCELED</Text>
                    </View>
                </HStack>
                <Text paddingLeft={26} style={{ color: COLORS.lightGrey, ...FONTS.body6 }}>#ID00001</Text>
                <Text paddingLeft={26} style={styles.detailText}>Today, 12h15</Text>
                <VStack marginTop={2} paddingRight={26} >
                    <HStack alignItems={"center"}>
                        <Image alt="location line" source={locationLineIcon}></Image>
                        <VStack space={5} style={{marginRight:30}} >
                            <VStack>
                                <Text style={styles.detailText}>KTX Khu B</Text>
                                <Text numberOfLines={1} style={styles.titleText}>Pickup - KTX Khu B ĐHQG, Đông Hòa, Dĩ An, Bình Dương</Text>

                            </VStack>
                            <VStack>
                                <Text style={styles.detailText}>UIT</Text>
                                <Text numberOfLines={1} style={styles.titleText}>Destination - Trường Đại học Công nghệ Thông tin - ĐHQG TPHCN...</Text>
                            </VStack>
                        </VStack>
                    </HStack>
                </VStack>
            </VStack>
        </View>
    );
};
const styles = StyleSheet.create({
    titleText: {
        color: COLORS.grey,
        ...FONTS.body6,
    },
    detailText: {
        color: COLORS.white,
        ...FONTS.body6,
        fontWeight: 'bold'
    },
});
export default HistoryCancelCard; 