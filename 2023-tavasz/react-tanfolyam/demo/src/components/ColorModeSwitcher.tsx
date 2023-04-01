import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, IconButtonProps, useColorMode, useColorModeValue } from '@chakra-ui/react';

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>;

export function ColorModeSwitcher(props: ColorModeSwitcherProps) {
  const { toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label='Sötét-világos mód váltás'
      icon={useColorModeValue(<SunIcon w={5} h={5} />, <MoonIcon w={5} h={5} />)}
      onClick={toggleColorMode}
      variant='ghost'
      {...props}
    />
  );
}
