import {
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  View,
} from "native-base";
import { COLORS, GEOAPIFY_KEY, SIZES } from "../../constants";
import ArrowDownIcon from "../../assets/icons/icons8-down-arrow-48.png";
import LocationIcon from "../../assets/icons/icons8-location-48.png";
import ChangeIcon from "../../assets/icons/icons8-change-48.png";
import {
  DESTINATION_INPUT,
  PICK_UP_INPUT,
} from "../../screens/Booking/BookingScreen";

const LocationCardWithChange = ({
  pickUpInput,
  setPickUpInput,
  pickDesInput,
  setDesInput,
  setFocusInput,
}) => {
  return (
    <Flex marginTop={3} marginLeft={3} marginRight={3}>
      <HStack
        w={"100%"}
        h={160}
        bgColor={COLORS.tertiary}
        borderColor={COLORS.fourthary}
        borderRadius={10}
        borderWidth={1}
        padding={4}
      >
        <VStack space={2} flex={5}>
          <VStack>
            <Text bold fontSize={SIZES.h6} color={"#8CC3FF"}>
              Pick-up
            </Text>
            <Input
              onFocus={() => setFocusInput(PICK_UP_INPUT)}
              variant="unstyled"
              placeholder="Your location"
              bold
              fontSize={SIZES.h6}
              color={"white"}
              padding={1}
              disabled
            />
          </VStack>
          <Divider />
          <VStack>
            <Text bold fontSize={SIZES.h6} color={"#8CC3FF"}>
              Drop off
            </Text>
            <Input
              onFocus={() => setFocusInput(DESTINATION_INPUT)}
              variant="unstyled"
              placeholder="Enter destination"
              bold
              fontSize={SIZES.h6}
              color={"white"}
              padding={1}
            />
          </VStack>
        </VStack>
        <Center marginLeft={"auto"} flex={1}>
          <Divider
            bgColor={COLORS.fourthary}
            height={10}
            thickness={2}
            orientation="vertical"
          />
          <Center
            borderRadius={50}
            width={"25px"}
            height={"25px"}
            bgColor={COLORS.fourthary}
            marginBottom={2}
            marginTop={2}
          >
            <Image width={"20px"} height={"20px"} source={ChangeIcon} alt="" />
          </Center>
          <Divider
            bgColor={COLORS.fourthary}
            height={10}
            thickness={2}
            orientation="vertical"
          />
        </Center>
        <Center marginLeft={"auto"} flex={1}>
          <Center
            borderRadius={50}
            width={"25px"}
            height={"25px"}
            bgColor={"black"}
          >
            <Image
              width={"20px"}
              height={"20px"}
              source={ArrowDownIcon}
              alt=""
            />
          </Center>
          <View
            borderColor={COLORS.fourthary}
            minHeight={20}
            style={{
              borderWidth: 1,
              borderStyle: "dashed",
            }}
          />
          <Center
            borderRadius={50}
            width={"25px"}
            height={"25px"}
            bgColor={COLORS.fourthary}
          >
            <Image
              width={"20px"}
              height={"20px"}
              source={LocationIcon}
              alt=""
            />
          </Center>
        </Center>
      </HStack>
    </Flex>
  );
};

//const homePlace = {
//   description: "Home",
//   geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
// };
// const workPlace = {
//   description: "Work",
//   geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
// };

// const preDefined = [
//   {
//     description: "Đại học Công nghệ thông tin",
//     geometry: { location: { lat: 10.8719125, lng: 106.8020985 } },
//   },
//   {
//     description: "Ký túc xá khu A",
//     geometry: { location: { lat: 10.8782444, lng: 106.8062906 } },
//   },
// ];

// <GooglePlacesAutocomplete
//   query={{
//     key: GOOGLE_PLACES_API_KEY,
//     language: "vi", // language of the results
//     components: "country:vn",
//   }}
//   onPress={(data, details) => console.log(data, details)}
//   predefinedPlaces={preDefined}
//   predefinedPlacesAlwaysVisible={true}
//   currentLocation={true}
//   currentLocationLabel="Current location"
// />;

export default LocationCardWithChange;
