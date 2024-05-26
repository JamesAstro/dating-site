import type { ReactNode } from "react";

import { tw } from "@/utils/style";

interface WrapperProps {
  className?: string;
  children?: ReactNode;
}

const Wrapper = (props: WrapperProps) => {
  const { className, children } = props;

  return (
    <div
      className={tw("relative mx-auto my-0 w-full max-w-[1200px]", className)}
    >
      {children}
    </div>
  );
};

export default Wrapper;
