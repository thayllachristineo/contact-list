import { useEffect, useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';

import Header from './components/Header';
import PersonItem from './components/PersonItem';
import AddContact from './components/AddContact';

import { TContacts } from './types';
import { listContacts } from './services';
import { getGroups, getSortedGroupsArray } from './App.utils';

function App() {
  const [contacts, setContacts] = useState<TContacts>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const groups = getSortedGroupsArray(getGroups(contacts, searchTerm));

  const fetchContacts = async () => {
    listContacts().then(setContacts);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Box padding={4}>
      <Header onChange={setSearchTerm} />
      {groups.map(([letter, contacts], index) => (
        <>
          <Heading
            key={`${letter}-${index}`}
            as="h2"
            size="sm"
            paddingLeft={4}
            mb={1}
          >
            {letter}
          </Heading>
          <Box
            border="1px solid"
            borderColor="gray.200"
            borderBottomColor="white"
            borderRadius="md"
            mb={4}
          >
            {contacts.map(({ id, name, mainPhone, cellPhone, homePhone }) => (
              <PersonItem
                key={`${name}-${index}`}
                id={id}
                name={name}
                mainPhone={mainPhone}
                cellPhone={cellPhone}
                homePhone={homePhone}
                onRemove={fetchContacts}
              />
            ))}
          </Box>

          <AddContact onInsert={fetchContacts} />
        </>
      ))}
    </Box>
  );
}

export default App;
