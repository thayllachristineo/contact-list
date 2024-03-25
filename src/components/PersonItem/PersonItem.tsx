import { Avatar, Box, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';

import PersonModal from '../PersonModal/PersonModal';
import { TContact } from '../../types';

type TProps = TContact & {
  onRemove?: (_data: TContact) => void;
};

const PersonItem: FC<TProps> = ({
  id,
  name,
  mainPhone,
  cellPhone,
  homePhone,
  onRemove,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Box
        display="flex"
        flexDir="row"
        alignItems="center"
        gap="8px"
        borderBottom="1px solid "
        borderColor=" gray.200"
        padding={3}
        as="button"
        width="100%"
        onClick={() => setIsModalOpen(true)}
      >
        <Avatar name={name} />
        <Text>{name}</Text>
      </Box>
      <PersonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        id={id}
        name={name}
        mainPhone={mainPhone}
        cellPhone={cellPhone}
        homePhone={homePhone}
        onRemove={onRemove}
      />
    </>
  );
};

export default PersonItem;
