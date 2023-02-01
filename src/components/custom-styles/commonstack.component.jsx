
import { Stack } from "@mui/system";
import React from "react";

const CommonStack = ({
  children,
  direction,
  justifyContent,
  alignItems,
  flexWrap,
  height,
  onSubmit,
  component,
  spacing,
  bgcolor,
  textAlign,
  sx,
}) => {
  return (
    <Stack
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      flexWrap={flexWrap}
      height={height}
      sx={sx}
      component={component}
      onSubmit={onSubmit}
      spacing={spacing}
      bgcolor={bgcolor}
      textAlign={textAlign}
    >
      {children}
    </Stack>
  );
};

export default CommonStack;
