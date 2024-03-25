import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { FC } from 'react';

type TProps = {
  onChange: (_value: string) => void;
};

const Header: FC<TProps> = ({ onChange }) => {
  return (
    <Box display="flex" flexDirection="column" gap="16px" mb="20px">
      <Heading>Lista de Contatos</Heading>

      <InputGroup>
        <Input
          placeholder="Buscar contato"
          variant="flushed"
          onChange={(e) => onChange(e.target.value)}
        />
        <InputRightElement>
          <SearchIcon color="gray.300" />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default Header;
