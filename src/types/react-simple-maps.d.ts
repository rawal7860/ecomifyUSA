// Minimal typings for react-simple-maps (the package ships none).
// Covers only what this project uses, with no `any`.
declare module "react-simple-maps" {
  import * as React from "react";

  export interface RsmGeography {
    rsmKey: string;
    properties: Record<string, string>;
  }

  interface ComposableMapProps extends React.SVGProps<SVGSVGElement> {
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    children?: React.ReactNode;
  }
  export const ComposableMap: React.FC<ComposableMapProps>;

  interface GeographiesProps {
    geography: string;
    children: (args: { geographies: RsmGeography[] }) => React.ReactNode;
  }
  export const Geographies: React.FC<GeographiesProps>;

  interface GeographyStyleStates {
    default?: React.CSSProperties;
    hover?: React.CSSProperties;
    pressed?: React.CSSProperties;
  }
  interface GeographyProps {
    geography: RsmGeography;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
    style?: GeographyStyleStates;
    [dataAttr: `data-${string}`]: string | undefined;
  }
  export const Geography: React.FC<GeographyProps>;
}
