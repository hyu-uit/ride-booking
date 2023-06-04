import { useReducer } from "react";
import { createContext, ReactNode, useEffect, useState } from "react";

export const BookingContext = createContext(null);

const initialState = {
  region: {
    latitude: 0, // Initial latitude
    longitude: 0, // Initial longitude
    latitudeDelta: 0.005, //zoom
    longitudeDelta: 0.005, //zoom
  },
  pickUpLocation: {
    name: "",
    latitude: 0, // Initial latitude
    longitude: 0, // Initial longitude
  }, // Initial user location
  destinationLocation: {
    name: "",
    latitude: 0, // Initial latitude
    longitude: 0, // Initial longitude
  }, // Initial user location
  bookingDetails: "",
  price: "",
  note: "",
  paymentMethod: "",
  isModalCancelShow: false,
};

export const SET_STEP = "SET_STEP";
export const BACK_STEP = "BACK_STEP";
export const SET_SHOW_MODAL_CANCEL = "SET_SHOW_MODAL_CANCEL";
export const SET_BOOKING_DETAILS = "SET_BOOKING_DETAILS";
export const SET_PRICE = "SET_PRICE";
export const SET_NOTE = "SET_NOTE";
export const SET_PAYMENT_METHOD = "SET_PAYMENT_METHOD";
export const SET_DESTINATION_LOCATION = "SET_DESTINATION_LOCATION";
export const SET_PICK_UP_LOCATION = "SET_PICK_UP_LOCATION";
export const SET_INITIAL_LOCATION = "SET_INITIAL_LOCATION";

const stateReducer = (state, action) => {
  switch (action.type) {
    case SET_SHOW_MODAL_CANCEL:
      return { ...state, isModalCancelShow: action.payload };
    case SET_BOOKING_DETAILS:
      return { ...state, bookingDetails: action.payload };
    case SET_PRICE:
      return { ...state, price: action.payload };
    case SET_NOTE:
      return { ...state, note: action.payload };
    case SET_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case SET_DESTINATION_LOCATION:
      return {
        ...state,
        destinationLocation: {
          name: action.payload.name,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      };
    case SET_PICK_UP_LOCATION:
      return {
        ...state,
        pickUpLocation: {
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
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      };
    default:
      throw new Error();
  }
};

export const BookingProvider = ({ children }) => {
  const [booking, dispatch] = useReducer(stateReducer, initialState);

  return (
    <BookingContext.Provider
      value={{
        booking,
        dispatch,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
