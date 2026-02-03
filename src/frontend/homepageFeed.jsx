import React, { useEffect, useState } from 'react';
import ForgeReconciler, { DynamicTable,  Inline, Select, Spinner, Text, Button, Heading, Stack } from '@forge/react';
import { invoke } from '@forge/bridge';

const App = () => {
  const [event, setEvent] = useState(null);
  const [eventNames, setEventNames] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleSelectChange = (e) => {
    setEvent(e.value);
  };

  useEffect(() => {
    invoke("getEventNames").then(setEventNames);
  }, []);

  const handleRefresh = (e) => {
    setRefreshing(true);
    invoke("getEventNames").then(result => {
      setEventNames(result)
      setRefreshing(false);
    });
  }

  return (
  <>
    <Stack space="space.200">
        <Inline spread="space-between">
          <Heading as="h2">Leaderboard</Heading>
          <Button isLoading={refreshing} onClick={e => handleRefresh(e)}>Refresh</Button>
        </Inline>
        { (eventNames && !refreshing) ? <Select
          options={eventNames.results.map((name) => ({ value: name.key, label: name.key }))}
          onChange={(option) => handleSelectChange(option)}
          /> : <Spinner /> } 
          { event && <DynamicTable caption={event} rows={eventNames.results.find(e => e.key === event).value.map((item) => ({
            key: item,
            cells: [
              {
                key: "name",
                content: <Text>{item}</Text>
              }
            ]
          }))}/>}
    </Stack>
  </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);