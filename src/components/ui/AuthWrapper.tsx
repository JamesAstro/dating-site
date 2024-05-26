"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useAuth, useSignIn, useUser } from "@clerk/nextjs";

interface AuthWrapperProps {
  children?: ReactNode;
}

const AuthWrapper = (props: AuthWrapperProps) => {
  const { children } = props;

  const [isSet, setIsSet] = useState<boolean>(false);

  const { sessionId } = useAuth();
  const { setActive, isLoaded } = useSignIn();
  const { user } = useUser();

  useEffect(() => {}, [isLoaded, isSet, sessionId, setActive, user]);

  return children;
};

export default AuthWrapper;
