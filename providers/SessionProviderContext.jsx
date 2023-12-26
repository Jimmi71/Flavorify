"use client";

import { SessionProvider } from "next-auth/react";

const SessionProviderContext = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderContext;
