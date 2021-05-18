import { useColorMode, Switch } from "@chakra-ui/react";

export const DarkModeSwitch = (props: any) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Switch
      color="green"
      isChecked={isDark}
      {...props}
      onChange={toggleColorMode}
    />
  );
};
