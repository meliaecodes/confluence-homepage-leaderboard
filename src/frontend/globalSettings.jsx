import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Box, Button, Select, Spinner, Text, CodeBlock, Heading, Stack, Inline } from '@forge/react';
import { invoke } from '@forge/bridge';

const App = () => {
  const [event, setEvent] = useState(null);
  const [eventNames, setEventNames] = useState(null);
  const [trigger, setTrigger] = useState(null);

  const handleDeleteEvent = (e, eventName) => {
    console.log("deleteEvent");
    setEvent(null);
    invoke("deleteEventData", eventName).then(setEventNames);
  };

  const handleRefresh = (e) => {
    console.log("refreshing events...");
    setEvent(null);
    invoke("getEventNames").then(setEventNames);
  }

  const handleSelectChange = (e) => {
    setEvent(e.value);
  };

  useEffect(() => {
    invoke("getTriggerUrl").then(setTrigger);
  }, []);

  useEffect(() => {
    invoke("getEventNames").then(setEventNames);
  }, []);

  useEffect(() => {
    console.log("eventNames")
    console.info(eventNames?  eventNames.results : eventNames);
  }, [eventNames]);


  const data = JSON.stringify({ event: "test-event", name: "charles atlas" });
  const sampleCurl = trigger
    ? `curl -X POST ${trigger} --data '${data}'`
    : "Loading...";

  return (
    <Stack space="space.200">
      <Stack>
        <Text>To set the message, run the following curl command:</Text>
        <CodeBlock text={sampleCurl} language="shell" />
      </Stack>
      <Stack>
        <Inline alignBlock="center">
          <Heading as="h2">Leaderboard</Heading>
          <Button iconBefore="refresh" appearance="subtle"  onClick={e => handleRefresh(e)}/>
        </Inline>
        { eventNames ? <Select
          options={eventNames.results.map((name) => ({ value: name.key, label: name.key }))}
          onChange={(option) => handleSelectChange(option)}
          /> : <Spinner /> } 
      </Stack>
      <Stack>
        { event && <Heading as="h3">Leaderboard for {event}</Heading>}
        <Inline alignBlock="end" spread="space-between">
          <Box> 
            <Stack>
              { event ? eventNames.results.find(e => e.key === event).value.map(i => <Text>{i}</Text>) : <Text>Select an event...</Text> } 
            </Stack>
          </Box>
          <Box>
            { event && <Button appearance="danger" spacing="compact" onClick={e => handleDeleteEvent(e, event)}>Delete {event}</Button> }
          </Box>
        </Inline>
      </Stack>
    </Stack>
  );
};


ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
