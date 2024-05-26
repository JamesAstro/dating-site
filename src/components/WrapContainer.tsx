import type { ReactNode } from "react";

import { tw } from "@/utils/style";

interface WrapContainerProps {
  className?: string;
  children?: ReactNode;
}

const WrapContainer = (props: WrapContainerProps) => {
  const { className, children } = props;

  return (
    <div
      className={tw("relative mx-auto my-0 w-full max-w-[1300px]", className)}
    >
      {children}
    </div>
  );
};

export default WrapContainer;
