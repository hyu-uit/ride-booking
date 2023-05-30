import { createContext, ReactNode, useEffect, useState } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ a: 123 });

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
