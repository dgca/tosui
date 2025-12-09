import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useWindowSize } from "usehooks-ts";
import {
  DEFAULT_BREAKPOINTS,
  getBreakpointValue as baseGetBreakpointValue,
  type Breakpoint,
} from "./breakpoints";

type Config = {
  breakpoints?: Partial<Record<Breakpoint, number>>;
};

const TosuiContext = createContext<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getBreakpointValue: <T extends Record<Breakpoint, any>>(options: T) => any;
}>({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getBreakpointValue: () => undefined as any,
});

export function Tosui({
  children,
  config = {},
}: {
  children: ReactNode;
  config?: Config;
}) {
  const { width = 0 } = useWindowSize();

  const breakpoints = useMemo(() => {
    return { ...DEFAULT_BREAKPOINTS, ...config.breakpoints };
  }, [config.breakpoints]);

  const getBreakpointValue = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <T extends Record<Breakpoint, any>>(options: T) => {
      return baseGetBreakpointValue({
        breakpoints,
        width,
        options,
      });
    },
    [width, breakpoints]
  );

  const contextValue = useMemo(() => {
    return {
      getBreakpointValue,
    };
  }, [getBreakpointValue]);

  return (
    <TosuiContext.Provider value={contextValue}>
      {children}
    </TosuiContext.Provider>
  );
}

export function useBreakpointValue() {
  return useContext(TosuiContext).getBreakpointValue;
}
