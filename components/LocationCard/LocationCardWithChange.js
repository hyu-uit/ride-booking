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
import {
  AutocompleteDropdown,
  AutocompleteDropdownContextProvider,
} from "react-native-autocomplete-dropdown";
import { TouchableOpacity } from "react-native";
import { Platform } from "react-native";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  getAutoCompleteResults,
  getSingleAddressFromCoordinate,
} from "../../api/locationAPI";
import {
  BookingContext,
  SET_DESTINATION_LOCATION,
  SET_INITIAL_LOCATION,
  SET_PICK_UP_LOCATION,
} from "../../context/BookingContext";
import { fetchCurrentUserLocation } from "../../helper/location";

const defaultPickUpItem = { id: "your-location", title: "Your location" };
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
  const [destSuggestionsList, setDestSuggestionsList] = useState([]);
  const [pickUpSuggestionsList, setPickUpSuggestionsList] = useState([
    defaultPickUpItem,
  ]);
  // save result to find long, lat, name on click select item auto complete
  const [destOriginalResult, setDestOriginalResult] = useState([]);
  const [pickUpOriginalResult, setPickUpOriginalResult] = useState([
    defaultPickUpItem,
  ]);

  const [destLoading, setDestLoading] = useState(false);
  const [pickUpLoading, setPickUpLoading] = useState(false);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      // empty input will lead to error
      if (desInput.length > 1) {
        setDestLoading(true);
        getAutoCompleteResults(desInput)
          .then((results) => {
            setDestOriginalResult(results);
            setDestSuggestionsList(
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
          .finally(() => setDestLoading(false));
      }
    }, 1000);
    return () => {
      clearTimeout(searchTimeout);
    };
  }, [desInput]);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      // empty input will lead to error
      if (pickUpInput.length > 1) {
        setPickUpLoading(true);
        getAutoCompleteResults(pickUpInput)
          .then((results) => {
            setPickUpOriginalResult(results);
            setPickUpSuggestionsList([
              defaultPickUpItem,
              ...results.map((result) => ({
                id: result.place_id,
                title: result.formatted,
              })),
            ]);
          })
          .catch((err) => {
            console.log(
              "🚀 ~ file: LocationCardWithChange.js:66 ~ searchTimeout ~ err:",
              err
            );
            return;
          })
          .finally(() => setPickUpLoading(false));
      }
    }, 500);
    return () => {
      clearTimeout(searchTimeout);
    };
  }, [pickUpInput]);

  const { t } = useTranslation();

  const onSelectPickUpItem = (item) => {
    if (!item) return;

    // set to current location
    if (item.id === "your-location") {
      fetchCurrentUserLocation()
        .then(({ latitude, longitude }) => {
          dispatch({
            type: SET_INITIAL_LOCATION,
            payload: {
              latitude,
              longitude,
            },
          });

          getSingleAddressFromCoordinate(latitude, longitude)
            .then((value) => {
              dispatch({
                type: SET_PICK_UP_LOCATION,
                payload: {
                  name: "Your location",
                  address: value.formatted,
                  latitude,
                  longitude,
                },
              });
              setMarker({
                name: "Your location",
                address: value.formatted,
                latitude,
                longitude,
              });

              item && setPickUpInput(item.title);
              setStep(2);
            })
            .catch((err) => {
              console.log(
                "🚀 ~ file: LocationCardWithChange.js:174 ~ .then ~ err:",
                err
              );
            });
        })
        .catch((err) => {
          console.log("🚀 ~ file: LocationCardWithChange.js:178 ~ err:", err);
        });
      // save in case user click back button
    } else
      pickUpOriginalResult.map((result) => {
        if (result.place_id == item.id) {
          dispatch({
            type: SET_INITIAL_LOCATION,
            payload: {
              latitude: result.lat,
              longitude: result.lon,
            },
          });

          dispatch({
            type: SET_PICK_UP_LOCATION,
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
          item && setPickUpInput(item.title);
          setStep(2);
        }
      });
  };

  const onSelectDestItem = (item) => {
    destOriginalResult.map((result) => {
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
  };

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
            <AutocompleteDropdown
              onFocus={() => {
                setFocusInput(PICK_UP_INPUT);
              }}
              showClear
              onClear={() => setPickUpInput("")}
              closeOnBlur
              direction={Platform.select({ ios: "down" })}
              dataSet={pickUpSuggestionsList}
              onSelectItem={onSelectPickUpItem}
              textInputProps={{
                value: pickUpInput,
                placeholder: t("enterPickUp"),
                style: {
                  color: "white",
                  paddingLeft: 0,
                  ...FONTS.body5,
                },
                onChangeText: (text) => setPickUpInput(text),
              }}
              loading={pickUpLoading}
              inputContainerStyle={{
                backgroundColor: "transparent",
                borderRadius: 25,
                borderColor: "red",
                marginLeft: 0,
              }}
              suggestionsListContainerStyle={{
                display: "flex",
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
              useFilter={false} // set false to prevent rerender twice
            />
          </VStack>
          <Divider />
          <VStack>
            <Text bold fontSize={SIZES.h6} color={"#8CC3FF"}>
              {t("des")}
            </Text>
            <AutocompleteDropdown
              onClear={() => setDestinationInput("")}
              showClear
              onFocus={() => {
                setFocusInput(DESTINATION_INPUT);
              }}
              direction={Platform.select({ ios: "down" })}
              dataSet={destSuggestionsList}
              onSelectItem={onSelectDestItem}
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
              loading={destLoading}
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
              useFilter={false} // set false to prevent rerender twice
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
