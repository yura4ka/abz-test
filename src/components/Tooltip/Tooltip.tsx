import { useState } from "react";
import {
  offset,
  useFloating,
  useHover,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";
import cl from "./Tooltip.module.scss";

type Props = {
  content: string;
  children: React.ReactElement;
};

const Tooltip = ({ content, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-start",
    middleware: [offset(15)],
  });
  const { isMounted, styles } = useTransitionStyles(context, {
    initial: {
      opacity: 0,
    },
    duration: 300,
  });
  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      <div
        ref={refs.setReference}
        className={cl.tooltip}
        {...getReferenceProps()}
      >
        {children}
      </div>
      {isMounted && (
        <div
          ref={refs.setFloating}
          className={cl.content}
          style={{ ...floatingStyles, ...styles }}
          {...getFloatingProps()}
        >
          {content}
        </div>
      )}
    </>
  );
};

export default Tooltip;
