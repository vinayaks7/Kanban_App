import { React, useEffect, useState } from 'react';
import {
  Box,
  Button,
  ModalCloseButton,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Input,
  Icon,
  Select,
  Grid,
  GridItem,
  useToast,
  Textarea,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const options = [];
const colors = { 1: 'red', 2: 'blue', 3: 'green' };
const priority_label = { 1: 'High', 2: 'Medium', 3: 'Low' };
const priority_visble_down = { 1: 'hidden', 2: 'visible', 3: 'visible' };
const priority_visble_up = { 1: 'visible', 2: 'hidden', 3: 'hidden' };
const assignee = { 1: 'Vinayak', 2: 'Rohan', 3: 'Rahul' };
var date_regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;

const TaskCard = ({
  task_id,
  task_assignee,
  task_desc,
  task_summary,
  task_status,
  task_priority,
  task_deadline,
}) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [value_desc, setValue_desc] = useState([task_desc]);
  const [value_status, setValue_status] = useState([task_status]);
  const [value_assignee, setValue_assignee] = useState([task_assignee]);
  const [value_summary, setValue_summary] = useState([task_summary]);
  const [value_priority, setValue_priority] = useState([task_priority]);
  const [value_deadline, setValue_deadline] = useState([task_deadline]);
  const toast = useToast();

  // const [users, setUsers] = React.useState([]);

  const handleChangeDesc = event => setValue_desc(event.target.value);
  const showDetailsD = () => {
    console.log('insde');
  };
  const handleChangeStatus = event => setValue_status(event.target.value);
  const showDetailsS = () => {
    console.log('insde');
  };
  const handleChangeAssignee = event => {
    setValue_assignee(event.target.value);
    console.log(event.target.value);
  };
  const showDetailsA = () => {
    console.log('insde');
  };
  const handleChangeSummary = event => setValue_summary(event.target.value);
  const showDetailsSum = () => {
    console.log('insde');
  };
  const handleChangePriority = event => setValue_priority(event.target.value);
  const showDetailsP = () => {
    console.log('insde');
  };
  const handleChangeDeadline = event => setValue_deadline(event.target.value);
  const showDetailsDead = () => {
    console.log('insde');
  };

  // ---------------------------------------------------------------------------------
  // edit the task
  const edit_the_task = async () => {
    if (
      value_desc &&
      value_status &&
      value_priority &&
      value_summary &&
      value_assignee &&
      value_deadline
    ) {
      if (!date_regex.test(value_deadline)) {
        toast({ description: 'Please fill the date in yyyy-mm-dd' });
      } else {
        let res = await fetch('http://127.0.0.1:8000/test/udpdate_delete/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            task_id: task_id,
            task_desc: value_desc,
            task_status: value_status,
            task_priority: value_priority,
            task_summary: value_summary,
            user_id: value_assignee,
            task_deadline: value_deadline,
          }),
        })
          .then(response => response.json())
          .then(responseData => {
            // console.log(responseData);
          })
          .catch(error => console.warn(error));

        window.location.reload();
      }
    } else {
      toast({ description: 'Please fill all the fields ' });
    }
  };
  // --------------------------------------------------------------------------
  // delete the task
  const delete_the_task = async () => {
    let res = await fetch('http://127.0.0.1:8000/test/udpdate_delete/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task_id: task_id,
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
      })
      .catch(error => console.warn(error));

    window.location.reload();
  };
  // --------------------------------------------------------------------------------------

  const get_all_users = async () => {
    let res = await fetch('http://127.0.0.1:8000/test/get_all_users/', {
      method: 'GET',
    });

    res = await res.json();
    console.log(res);

    res.forEach(option1 =>
      options.push(new Option(option1.user_name, option1.id, option1.selected))
    );
    console.log(options);

    for (let i = 0; i < options.length; i++) {
      console.log(options[i].value); //log the value
    }
  };
  // ----------------------------------------------------------------------------------
  useEffect(() => {
    setValue_desc({ task_desc }.task_desc);
    setValue_status({ task_status }.task_status);
    setValue_assignee({ task_assignee }.task_assignee);
    setValue_summary({ task_summary }.task_summary);
    setValue_priority({ task_priority }.task_priority);
    setValue_deadline({ task_deadline }.task_deadline);
  }, []);

  // ----------------------------------------------------------------------------------------
  return (
    <Box>
      <Modal id="id1" isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Input
              id="id5"
              placeholder="Enter task_summary"
              w={500}
              value={value_summary}
              onChange={handleChangeSummary}
              size="sm"
            />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" alignItems="baseline">
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem w="100%" h="200" bg="white.500">
                  <Textarea
                    value={value_desc}
                    onChange={handleChangeDesc}
                    placeholder="Here is a sample placeholder"
                    size="sm"
                    h="200"
                  />
                </GridItem>
                <GridItem w="100%" h="200" bg="white.500">
                  <Select
                    id="id3"
                    value={value_status}
                    onChange={handleChangeStatus}
                    size="sm"
                    mb="2"
                    placeholder="Select task status"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </Select>
                  <Select
                    id="id4"
                    mt="2"
                    mb="2"
                    placeholder="Select the priority"
                    value={value_priority}
                    onChange={handleChangePriority}
                    size="sm"
                  >
                    <option value="1">High</option>
                    <option value="2">Medium</option>
                    <option value="3">Low</option>
                  </Select>

                  {/* <Input
                    id="id6"
                    // value={value_assignee}
                    // onChange={handleChangeAssignee}
                    placeholder="Here is a sample placeholder"
                    size="sm"
                  /> */}
                  <Select
                    id="id6"
                    mt="2"
                    mb="2"
                    placeholder={'Select the assignee'}
                    value={value_assignee}
                    onChange={handleChangeAssignee}
                    size="sm"
                  >
                    <option value="1">Vinayak</option>
                    <option value="2">Rahul</option>
                    <option value="3">Rohan</option>
                  </Select>
                  <Input
                    id="id7"
                    mt="2"
                    mb="2"
                    placeholder="Enter task_deadline in yyyy-mm-dd"
                    value={value_deadline}
                    onChange={handleChangeDeadline}
                    size="sm"
                  />
                </GridItem>
              </Grid>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                edit_the_task();
              }}
            >
              Edit
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => {
                delete_the_task();
                onToggle();
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box
        m={'3'}
        bg={'#FFFFFF'}
        height={195}
        width="calc(100h)"
        left={114}
        top={322}
      >
        <Box height={17} width={125} left={121} top={330}>
          <Text as="b" fontSize="14">
            {task_summary}
          </Text>
        </Box>
        <Box m={'2'} height={45} width={177} left={121} top={352}>
          <Text fontSize="12">{task_desc}</Text>
        </Box>

        <Box
          display="flex"
          alignItems="baseline"
          marginLeft={45}
          marginTop={20}
        >
          <Box display="flex" alignItems="baseline">
            <ChevronDownIcon
              w={7}
              h={5}
              color={colors[{ task_priority }.task_priority]}
              visibility={priority_visble_down[{ task_priority }.task_priority]}
              position="relative"
            />
            <ChevronUpIcon
              w={7}
              h={5}
              color={colors[{ task_priority }.task_priority]}
              visibility={priority_visble_up[{ task_priority }.task_priority]}
              position="absolute"
            />

            <Text>{priority_label[{ task_priority }.task_priority]}</Text>
          </Box>
          <Box marginLeft={2}>
            <Button
              as={Button}
              w={12}
              h={31}
              onClick={() => {
                onToggle();
              }}
            >
              Details
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskCard;
