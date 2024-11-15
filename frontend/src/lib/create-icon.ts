import { cn } from "@/lib/utils";
import {
  createElement,
  forwardRef,
  ReactSVG,
  RefAttributes,
  SVGProps,
} from "react";

type IconNode = [elementName: keyof ReactSVG, attrs: Record<string, string>][];
type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ElementAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;
interface IconProps extends ElementAttributes {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
}
interface IconComponentProps extends IconProps {
  iconNode: IconNode;
}

const Icon = forwardRef<SVGSVGElement, IconComponentProps>(
  (
    {
      color = "currentColor",
      size = 24,
      strokeWidth = 0,
      absoluteStrokeWidth,
      className = "",
      children,
      iconNode,
      ...rest
    },
    ref,
  ) => {
    return createElement(
      "svg",
      {
        ref,
        ...{
          xmlns: "http://www.w3.org/2000/svg",
          width: 24,
          height: 24,
          viewBox: "0 0 24 24",
          fill: "currentColor",
          stroke: "currentColor",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        },
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth
          ? (Number(strokeWidth) * 24) / Number(size)
          : strokeWidth,
        className: cn(className),
        ...rest,
      },
      [
        ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
        ...(Array.isArray(children) ? children : [children]),
      ],
    );
  },
);

export const createIcon = (iconName: string, iconNode: IconNode) => {
  const Component = forwardRef<SVGSVGElement, IconProps>(
    ({ className, ...props }, ref) =>
      createElement(Icon, {
        ref,
        iconNode,
        className: cn(className),
        ...props,
      }),
  );

  Component.displayName = `${iconName}`;

  return Component;
};

export type IconType = ReturnType<typeof createIcon>;
