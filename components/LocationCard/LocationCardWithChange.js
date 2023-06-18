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
import { COLORS, FONTS, SIZES } from "../../constants";
import ArrowDownIcon from "../../assets/icons/icons8-down-arrow-48.png";
import LocationIcon from "../../assets/icons/icons8-location-48.png";
import ChangeIcon from "../../assets/icons/icons8-change-48.png";
import {
  DESTINATION_INPUT,
  PICK_UP_INPUT,
} from "../../screens/Booking/BookingScreen";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { TouchableOpacity } from "react-native";
import { Platform } from "react-native";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getAutoCompleteResults } from "../../api/locationAPI";
import {
  BookingContext,
  SET_DESTINATION_LOCATION,
  SET_INITIAL_LOCATION,
} from "../../context/BookingContext";

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
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      // empty input will lead to error
      if (desInput.length > 1) {
        setLoading(true);
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
          .catch((err) => {
            console.log(
              "🚀 ~ file: LocationCardWithChange.js:66 ~ searchTimeout ~ err:",
              err
            );
            return;
          })
          .finally(() => setLoading(false));
      }
    }, 1000);
    return () => {
      clearTimeout(searchTimeout);
    };
  }, [desInput]);

  const { t } = useTranslation();

  return (
    <Flex marginTop={3} marginLeft={3} marginRight={3}>
      <HStack
        w={"100%"}
        h={"auto"}
        bgColor={COLORS.tertiary}
        borderColor={COLORS.fourthary}
        borderRadius={10}
        borderWidth={1}
        padding={4}
      >
        <VStack space={2} flex={5}>
          <VStack>
            <Text bold fontSize={SIZES.h6} color={"#8CC3FF"}>
              {t("pickUp")}
            </Text>
            <TouchableOpacity
              onPress={(e) => {
                setFocusInput(PICK_UP_INPUT);
                setShowDropdown(false);
              }}
            >
              <Text color={"white"} padding={1} style={{ ...FONTS.body5 }} bold>
                {t("enterPickUp")}
              </Text>
            </TouchableOpacity>
          </VStack>
          <Divider />
          <VStack>
            <Text bold fontSize={SIZES.h6} color={"#8CC3FF"}>
              {t("des")}
            </Text>
            <AutocompleteDropdown
              onFocus={() => {
                setFocusInput(DESTINATION_INPUT);
              }}
              direction={Platform.select({ ios: "down" })}
              dataSet={suggestionsList}
              onSelectItem={(item) => {
                originalResult.map((result) => {
                  if (result.place_id == item.id) {
                    dispatch({
                      type: SET_INITIAL_LOCATION,
                      payload: {
                        latitude: result.lat,
                        longitude: result.lon,
                      },
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
                placeholder: t("enterDestination"),
                style: {
                  color: "white",
                  paddingLeft: 0,
                  ...FONTS.body5,
                },
                onChangeText: (text) => setDestinationInput(text),
              }}
              loading={loading}
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
                marginTop: 0,
                color: "white",
              }}
              renderItem={(item, text) => (
                <Text
                  color={"white"}
                  style={{ ...FONTS.body5, marginVertical: 5 }}
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
