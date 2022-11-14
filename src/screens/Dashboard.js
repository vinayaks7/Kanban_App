import React, { useEffect, useState } from 'react';
import {
  Center,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Square,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Button, Text, ButtonGroup } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import TaskCard from '../components/TaskCard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Select,
  Switch,
} from '@chakra-ui/react';
// ------------------------------------------------------------------------------------
// creating a task

const Dashboard = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [tasks, setTasks] = useState([]);
  const options = [];
  const [switchValue, setSwitchValue] = useState(false);
  const [task_desc, setDesc] = useState('');
  const [task_status, setStatus] = useState('');
  const [task_priority, setPriority] = useState('');
  const [task_summary, setSummary] = useState('');
  const [task_assignee, setAssignee] = useState('');
  const [task_deadline, setDeadline] = useState('');
  const [task_notStarted, setNotStarted] = useState(0);
  const [task_inProgress, setInProgress] = useState(0);
  const [task_Completed, setCompleted] = useState(0);
  const toast = useToast();

  const onChangetaskDesc = event => {
    setDesc(event.target.value);
  };

  const onChangetaskStatus = event => {
    setStatus(event.target.value);
  };
  const onChangetaskPriority = event => {
    setPriority(event.target.value);
  };
  const onChangetaskSummary = event => {
    setSummary(event.target.value);
  };
  const onChangetaskAssignee = event => {
    setAssignee(event.target.value);
  };
  const onChangetaskDeadline = event => {
    setDeadline(event.target.value);
  };

  const add_a_task = async () => {
    if (
      task_desc &&
      task_status &&
      task_priority &&
      task_summary &&
      task_assignee &&
      task_deadline
    ) {
      var date_regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
      if (!date_regex.test(task_deadline)) {
        toast({ description: 'Please fill the date in yyyy-mm-dd' });
      } else {
        const res = fetch('http://127.0.0.1:8000/test/home/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            task_desc: task_desc,
            task_status: task_status,
            task_priority: task_priority,
            task_summary: task_summary,
            user_id: task_assignee,
            task_deadline: task_deadline,
          }),
        });
        onClose();
        window.location.reload();
      }

      // .then(response => {
      //   // setTasks(response.json());
      // })
      // .then(responseData => {
      //   // console.log(responseData);
      // })
      // .catch(error => {
      //   console.warn(error);
      //   toast({ description: 'Please fill all the fields' });
      // });

      // res = await res.json();
      // // setTasks(prevState => [res, ...prevState]);
      // console.log(res);
    } else {
      toast({ description: 'Please fill all the fields' });
    }
  };
  // ---------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------

  useEffect(() => {
    sort_tasks_priority();
  }, []);

  const params = {
    task_id: 1,
    task_desc: 'Sample 3',
  };
  const abc = JSON.stringify(params);

  // -------------------------------------------------------------------------------

  const sort_tasks_priority = async () => {
    let res = await fetch('http://127.0.0.1:8000/test/sort_tasks_priority/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    res = await res.json();
    // console.log(res);
    let ns = 0;
    let ip = 0;
    let c = 0;

    for (let i in res) {
      if (res[i].task_status === 'Not Started') {
        ns = ns + 1;
      } else if (res[i].task_status === 'In Progress') {
        ip = ip + 1;
      } else {
        c = c + 1;
      }
    }
    // console.log(ns, ip, c);
    setNotStarted(ns);
    setInProgress(ip);
    setCompleted(c);
    setTasks(res);
  };

  // ----------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------------------
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
  const task_id = 7;
  const get_single_username = async () => {
    let res = await fetch(
      'http://127.0.0.1:8000/test/get_single_username/?task_id=' + task_id,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    res = await res.json();
    console.log(res);
  };
  // --------------------------------------------------------------------------------------------
  const sort_tasks_deadline = async () => {
    console.log('******************************+' + switchValue);
    let res = await fetch('http://127.0.0.1:8000/test/sort_tasks_deadline/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    res = await res.json();
    // console.log(res);
    setTasks(prevState => [res, ...prevState]);
  };

  // -------------------------------------------------------------------------------------
  // for showing in modal - details of the task
  const get_all_tasks_for_single_user = async () => {
    let res = await fetch(
      'http://127.0.0.1:8000/test/get_all_tasks_for_single_user/?user_id=3/',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    res = await res.json();
    console.log(res);
  };
  // ------------------------------------------------------------------------------------
  // getting all the task
  const get_all_task = async () => {
    let res = await fetch('http://127.0.0.1:8000/test/home/', {
      method: 'GET',
    });

    console.log('**********************************');
    console.log(res);
    res = await res.json();
    setTasks(res);
  };

  //---------------------------------------------------------------------------------------
  return (
    <div>
      <Text fontSize="4xl" ml="20" mt="3" fontWeight={700}>
        Kanban Board
      </Text>
      <Text fontSize="4x2" ml="20" mt="1" fontWeight={700}>
        Vinayak's Tasks
      </Text>
      <Box display="flex" alignItems="baseline">
        <Button
          colorScheme="blue"
          onClick={() => {
            onToggle();
            // get_all_users();
          }}
          ml="20"
          mt="5"
        >
          Create
        </Button>
      </Box>

      <Modal id="id1" isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalHeader>
            <Input
              id="id5"
              placeholder="Enter task_summary"
              w={500}
              onChange={onChangetaskSummary}
              value={task_summary}
            />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" alignItems="baseline">
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem w="100%" h="200" bg="white.500">
                  <Textarea
                    id="id2"
                    placeholder="Enter task desc"
                    h="200"
                    onChange={onChangetaskDesc}
                    value={task_desc}
                  />
                </GridItem>
                <GridItem w="100%" h="200" bg="white.500">
                  <Select
                    id="id3"
                    mb="2"
                    placeholder="Select task status"
                    value={task_status}
                    onChange={onChangetaskStatus}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </Select>
                  <Select
                    id="id4"
                    mt="2"
                    mb="2"
                    value={task_priority}
                    onChange={onChangetaskPriority}
                    placeholder="Select task priority"
                  >
                    <option value="1">High</option>
                    <option value="2">Medium</option>
                    <option value="3">Low</option>
                  </Select>

                  <Select
                    id="id6"
                    mt="2"
                    mb="2"
                    placeholder="Select task asignee"
                    value={task_assignee}
                    onChange={onChangetaskAssignee}
                  >
                    <option value="1">Vinayak</option>
                    <option value="2">Rahul</option>
                    <option value="3">Rohan</option>
                  </Select>

                  <Input
                    id="id7"
                    mb="2"
                    placeholder="Enter task_deadline in yyyy-mm-dd"
                    value={task_deadline}
                    onChange={onChangetaskDeadline}
                  />
                </GridItem>
              </Grid>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              bg=" #00000080"
              mr={3}
              onClick={onClose}
              colorScheme="#2A4ECB"
            >
              Cancel
            </Button>
            <Button
              bg="#2A4ECB"
              onClick={() => {
                add_a_task();
              }}
              colorScheme="#2A4ECB"
            >
              Add Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* task_notStarted,task_inProgress,task_Completed */}
      <Box className="1" display="flex" alignItems="baseline">
        <Box marginLeft={150} marginTop={15}>
          <Text fontSize="4x2" fontWeight={700} l>
            Not Started ({task_notStarted})
          </Text>
        </Box>
        <Box marginLeft={130} marginTop={15}>
          <Text fontSize="4x2" fontWeight={700}>
            In Progress ({task_inProgress})
          </Text>
        </Box>
        <Box marginLeft={150} marginTop={15}>
          <Text fontSize="4x2" fontWeight={700}>
            Completed ({task_Completed})
          </Text>
        </Box>
      </Box>

      <Box display="flex" className="2" alignItems="baseline" mt={'0'}>
        {/* ------------------------------------------------------------------------------------------ */}

        <Box
          flex="1"
          bg="#EEEEEE"
          mr={10}
          position={'absolute'}
          width={216}
          h="calc(100h)"
          left={103}
          minH={'637'}
          top={207}
        >
          {tasks
            .filter(task => task.task_status === 'Not Started')
            .map(task => (
              <TaskCard
                task_id={task.task_id}
                task_assignee={task.user_id}
                task_desc={task.task_desc}
                task_summary={task.task_summary}
                task_status={task.task_status}
                task_priority={task.task_priority}
                task_deadline={task.task_deadline}
              ></TaskCard>
            ))}
        </Box>
        {/* ------------------------------------------------------------------------------------------ */}
        <Box
          flex="1"
          bg="#EEEEEE"
          mr={10}
          position={'absolute'}
          width={216}
          h="calc(100h)"
          minH={'637'}
          left={362}
          top={207}
        >
          {tasks
            .filter(task => task.task_status === 'In Progress')
            .map(task => (
              <TaskCard
                task_id={task.task_id}
                task_assignee={task.user_id}
                task_desc={task.task_desc}
                task_summary={task.task_summary}
                task_status={task.task_status}
                task_priority={task.task_priority}
                task_deadline={task.task_deadline}
              ></TaskCard>
            ))}

          {/* key={article.id} title={article.title} description={article.description} id={article.id}  */}
        </Box>
        {/* ----------------------------------------------------------------------------------------- */}

        <Box
          flex="1"
          bg="#EEEEEE"
          mr={10}
          position={'absolute'}
          width={216}
          height={637}
          left={618}
          top={207}
          h="calc(100h)"
          minH={'637'}
        >
          {tasks
            .filter(task => task.task_status === 'Completed')
            .map(task => (
              <TaskCard
                task_id={task.task_id}
                task_assignee={task.user_id}
                task_desc={task.task_desc}
                task_summary={task.task_summary}
                task_status={task.task_status}
                task_priority={task.task_priority}
                task_deadline={task.task_deadline}
              ></TaskCard>
            ))}
        </Box>

        {/* ------------------------------------------------------------------------------------------ */}
      </Box>
    </div>
  );
};

export default Dashboard;
