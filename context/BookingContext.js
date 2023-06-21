import { useReducer } from "react";
import { createContext } from "react";
import { ceilingKilometer } from "../helper/converter";

export const BookingContext = createContext(null);

const initialState = {
  region: {
    latitude: 0, // Initial latitude
    longitude: 0, // Initial longitude
    latitudeDelta: 0.01, //zoom
    longitudeDelta: 0.015, //zoom
  },
  pickUpLocation: {
    name: "",
    address: "",
    latitude: 0, // Initial latitude
    longitude: 0, // Initial longitude
  }, // Initial user location
  destinationLocation: {
    name: "",
    address: "",
    latitude: 0, // Initial latitude
    longitude: 0, // Initial longitude
  }, // Initial user location
  bookingDetails: {
    idTrip: "",
    price: 0,
    paymentMethod: "", // momo or cash
    distance: 0, // km
    time: 0, // minute (travel time from a to b)
    date: "", // date booking format 15:00 12/05/2002
    promotionName: "",
    promotion: 0, // price - promotion = final price
    ratingType: "", // disappointed or normal or love
    isScheduled: false,
  },
  isModalCancelShow: false,
  routing: null, // to draw line on map
};

export const destLocationDefault = {
  destinationLocation: {
    name: "",
    address: "",
    latitude: 0, // Initial latitude
    longitude: 0, // Initial longitude
  }, // Initial user location
};

export const bookingDefaultValue = {
  price: 0,
  paymentMethod: "", // momo or cash
  distance: 0, // km
  time: 0, // minute (travel time from a to b)
  date: "", // date booking format 15:00 12/05/2002
  promotion: 0, // price - promotion = final price
  ratingType: "", // disappointed or normal or love
  serviceRatings: null, // for example Good service, Well prepared, Punctuality,...
};

export const SET_STEP = "SET_STEP";
export const BACK_STEP = "BACK_STEP";
export const SET_SHOW_MODAL_CANCEL = "SET_SHOW_MODAL_CANCEL";
export const SET_BOOKING_DETAILS = "SET_BOOKING_DETAILS";
export const SET_DESTINATION_LOCATION = "SET_DESTINATION_LOCATION";
export const SET_PICK_UP_LOCATION = "SET_PICK_UP_LOCATION";
export const SET_INITIAL_LOCATION = "SET_INITIAL_LOCATION";
export const SET_ROUTING = "SET_ROUTING";

const FIRST_KM_PRICE = 15000;
const PRICE_PER_NEXT_KM = 5000;

const stateReducer = (state, action) => {
  switch (action.type) {
    case SET_SHOW_MODAL_CANCEL:
      return { ...state, isModalCancelShow: action.payload };
    case SET_BOOKING_DETAILS:
      return {
        ...state,
        bookingDetails: {
          ...state.bookingDetails,
          ...action.payload,
        },
      };
    case SET_DESTINATION_LOCATION:
      return {
        ...state,
        destinationLocation: {
          address: action.payload.address,
          name: action.payload.name,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      };
    case SET_PICK_UP_LOCATION:
      return {
        ...state,
        pickUpLocation: {
          address: action.payload.address,
          name: action.payload.name,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      };
    case SET_INITIAL_LOCATION:
      return {
        ...state,
        region: {
          ...state.region,
          ...action.payload,
        },
      };
    case SET_ROUTING:
      return {
        ...state,
        routing: action.payload,
      };
    default:
      throw new Error("Unhandle action in booking context!!");
  }
};

export const calculateFinalPrice = (price, promotion) => {
  if (promotion >= price) return 0;
  return price - promotion;
};

function calculatePrice(distanceInKm) {
  if (distanceInKm <= 0) {
    return 0; // No distance, no price
  }
  // Calculate the total price
  const totalPrice = FIRST_KM_PRICE + PRICE_PER_NEXT_KM * (distanceInKm - 1);
  return totalPrice;
}

export const BookingProvider = ({ children }) => {
  const [booking, dispatch] = useReducer(stateReducer, initialState);

  return (
    <BookingContext.Provider
      value={{
        booking,
        dispatch,
        calculatePrice,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
