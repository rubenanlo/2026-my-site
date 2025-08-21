import {
  animate,
  MotionValue,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useMemo, useState } from "react";

interface FormatNumberProps {
  decimals?: number;
  thousands?: boolean;
  locale?: string;
  exponential?: boolean;
  percentage?: boolean;
}

const formatNumber = (
  number: number,
  props?: FormatNumberProps
): number | string => {
  const {
    decimals = 1,
    thousands = true,
    locale = "en-US",
    exponential = false,
    percentage = false,
  } = props || {};

  // Format the number with specified decimals
  const formattedWithDecimals = number.toFixed(decimals);

  const isZero = [...formattedWithDecimals.replace(/[.-]/g, "")]
    .map(Number)
    .every((num) => num === 0);

  // If the formatted number is '0.00', return it in exponential notation
  if (isZero && exponential) return number.toExponential(decimals);

  if (isZero && exponential && percentage) return number * 100;

  if (percentage) return Number((number * 100).toFixed(decimals));

  // Otherwise, format with thousand separators if required
  if (thousands) {
    return new Intl.NumberFormat(locale, {
      maximumFractionDigits: decimals,
    }).format(number);
  }

  // Return the number formatted with fixed decimals if thousands separator is not required
  return Number(formattedWithDecimals);
};

interface AnimatedValueProps {
  from?: number;
  to?: number;
  decimals?: number;
  formatThousands?: boolean;
  animations?: Record<string, any>;
  measureWidth?: boolean;
  className?: string;
}

interface AnimatedValueResult<T> {
  value: MotionValue<T>;
  width?: number;
}

type ReturnType<T extends boolean, M extends boolean> = T extends true
  ? M extends true
    ? AnimatedValueResult<string>
    : MotionValue<string>
  : M extends true
  ? AnimatedValueResult<number>
  : MotionValue<number>;

// Define the generic type for the hook to make it conditional based on formatThousands
export function useAnimatedValue<
  T extends boolean = false,
  M extends boolean = false
>({
  from = 0,
  to,
  decimals = 0,
  formatThousands = false as T,
  animations: userAnimations = {},
  measureWidth = false as M,
  className = "text-lg font-bold leading-none sm:text-3xl",
}: AnimatedValueProps & { formatThousands?: T; measureWidth?: M }): ReturnType<
  T,
  M
> {
  const animations = useMemo(
    () => ({ duration: 1, ...userAnimations }),
    [userAnimations]
  );

  // Only proceed if 'to' is a valid number
  if (typeof to !== "number") {
    // Return a static motion value with the 'from' value
    const staticValue = useMotionValue(from);
    if (measureWidth) {
      return {
        value: staticValue,
        width: 0,
      } as ReturnType<T, M>;
    }
    return staticValue as ReturnType<T, M>;
  }

  const numberFrom = useMotionValue(from);
  const [width, setWidth] = useState<number>(0);

  const animatedNumber = useTransform(numberFrom, (value: number) => {
    if (formatThousands) {
      return formatNumber(value, {
        decimals: decimals,
        thousands: true,
        exponential: false,
      });
    }
    return Number(value.toFixed(decimals));
  });

  useEffect(() => {
    const controls = animate(numberFrom, to, animations);
    return () => controls.stop();
  }, [from, to, numberFrom, animations]);

  useEffect(() => {
    if (measureWidth && typeof window !== "undefined") {
      // Create a temporary element to measure text width
      const measureTextWidth = () => {
        const el = document.createElement("span");
        el.className = className;
        el.style.position = "absolute";
        el.style.visibility = "hidden";
        el.style.whiteSpace = "nowrap";

        // Format the value the same way as in the real element
        const formattedValue = formatThousands
          ? new Intl.NumberFormat("en-US").format(to)
          : to.toFixed(decimals);

        el.textContent = formattedValue;

        document.body.appendChild(el);
        const measuredWidth = el.getBoundingClientRect().width;
        document.body.removeChild(el);

        return measuredWidth;
      };

      setWidth(measureTextWidth());
    }
  }, [to, measureWidth, className, formatThousands, decimals]);

  if (measureWidth) {
    return {
      value: animatedNumber,
      width,
    } as ReturnType<T, M>;
  }

  return animatedNumber as ReturnType<T, M>;
}
