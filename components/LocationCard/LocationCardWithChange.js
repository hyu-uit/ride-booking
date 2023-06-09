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
import { COLORS, FONTS, GEOAPIFY_KEY, SIZES } from "../../constants";
import ArrowDownIcon from "../../assets/icons/icons8-down-arrow-48.png";
import LocationIcon from "../../assets/icons/icons8-location-48.png";
import ChangeIcon from "../../assets/icons/icons8-change-48.png";
import {
  DESTINATION_INPUT,
  PICK_UP_INPUT,
} from "../../screens/Booking/BookingScreen";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { Dimensions } from "react-native";
import { Platform } from "react-native";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { getAutoCompleteResults } from "../../api/locationAPI";
import {
  BookingContext,
  SET_DESTINATION_LOCATION,
} from "../../context/BookingContext";
import { TouchableWithoutFeedback } from "react-native-web";

const LocationCardWithChange = ({
  pickUpInput,
  setPickUpInput,
  desInput,
  setDestinationInput,
  setFocusInput,
  setStep,
  setMarker,
}) => {
  const { dispatch } = useContext(BookingContext);
  const [suggestionsList, setSuggestionsList] = useState([]);
  // save result to find long lat on click select item auto complete
  const [originalResult, setOriginalResult] = useState([]);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      // empty input will lead to error
      if (desInput.length > 1)
        getAutoCompleteResults(desInput)
          .then((results) => {
            setOriginalResult(results);
            setSuggestionsList(
              results.map((result) => ({
                id: result.place_id,
                title: result.formatted,
              }))
            );
          })
          .catch((err) => console.log(err));
    }, 2000);

    return () => {
      clearTimeout(searchTimeout);
    };
  }, [desInput]);

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
            <TouchableWithoutFeedback>
              <Input
                onFocus={() => {
                  setFocusInput(PICK_UP_INPUT);
                }}
                editable={false}
                variant="unstyled"
                placeholder="Your location"
                bold
                color={"white"}
                padding={1}
                value={pickUpInput}
                onChange={(e) => {
                  e.preventDefault();
                }}
                style={{ ...FONTS.body6 }}
              />
            </TouchableWithoutFeedback>
          </VStack>
          <Divider />
          <VStack>
            <Text bold fontSize={SIZES.h6} color={"#8CC3FF"}>
              Drop off
            </Text>
            {/* <Input
              onFocus={() => setFocusInput(DESTINATION_INPUT)}
              variant="unstyled"
              placeholder="Enter destination"
              bold
              fontSize={SIZES.h6}
              color={"white"}
              padding={1}
              value={desInput}
              onChangeText={(text) => setDesInput(text)}
            /> */}
            <AutocompleteDropdown
              onFocus={() => setFocusInput(DESTINATION_INPUT)}
              direction={Platform.select({ ios: "down" })}
              showChevron={false}
              dataSet={suggestionsList}
              onOpenSuggestionsList={}
              onSelectItem={(item) => {
                originalResult.map((result) => {
                  if (result.place_id == item.id) {
                    console.log({
                      address: result.formatted,
                      name: result.name,
                      latitude: result.lat,
                      longitude: result.lon,
                    });
                    dispatch({
                      type: SET_DESTINATION_LOCATION,
                      payload: {
                        address: result.formatted,
                        name: result.name,
                        latitude: result.lat,
                        longitude: result.lon,
                      },
                    });
                    setMarker({
                      address: result.formatted,
                      name: result.name,
                      latitude: result.lat,
                      longitude: result.lon,
                    });
                    // save in case user click back button
                    item && setDestinationInput(item.title);
                    setStep(2);
                  }
                });
              }}
              textInputProps={{
                value: desInput,
                placeholder: "Search your destination",
                style: {
                  color: "white",
                  paddingLeft: 0,
                  ...FONTS.body6,
                },
                onChangeText: (text) => setDestinationInput(text),
              }}
              inputContainerStyle={{
                backgroundColor: "transparent",
                borderRadius: 25,
                borderColor: "red",
                marginLeft: 0,
              }}
              suggestionsListContainerStyle={{
                backgroundColor: COLORS.tertiary,
                paddingHorizontal: 5,
                width: "105%",
                borderColor: "white",
                borderWidth: 1,
                borderTopWidth: 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
              renderItem={(item, text) => (
                <Text
                  color={"white"}
                  style={{ ...FONTS.body6, marginVertical: 5 }}
                >
                  {item.title}
                </Text>
              )}
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

export default LocationCardWithChange;
