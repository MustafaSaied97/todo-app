import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import { getUID,LocalStorage, ENDPOINTS, getCurrentLocation,callApi } from 'src/utils';
import { ModalForm, Task,WeatherCard } from 'src/components';
import moment from 'moment'

export default function TodoPage() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [mode, setMode] = useState('add');
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({});
  const [weatherData, setWeatherData] = useState({})
  const [isLoading, setisLoading] = useState(false)

  const defaultTaskData = {
    title: '',
    description: '',

    created_at: '',

    is_archived:false,
    archive_at: '',

    is_checked: false,
    finished_at: '',
  };
  const handleOpenModal = ({ modeType, taskData }) => {
    if (!modeType || !Object.keys(taskData).length) return;
    setTask(taskData);
    setMode(modeType);
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setTask(defaultTaskData);
    setIsOpenModal(false);
  };
  const actions = {
    openAddModal: () => handleOpenModal({ modeType: 'add', taskData: defaultTaskData }),
    openEditModal: (taskData) => {handleOpenModal({ modeType: 'edit', taskData: taskData }) },
    openInfoModal: (taskData) => handleOpenModal({ modeType: 'info', taskData: taskData }),
    onAddItem:(taskData)=>{
      const tasksClone=[...tasks]
      const taskDataWithId={
        ...taskData,
        id:getUID(),
        created_at:moment().format('lll'),
      }
      tasksClone.push(taskDataWithId)
      setTasks(tasksClone)
      handleCloseModal()
    },
    onEditItem:(taskData)=>{
      const tasksClone=tasks.map((taskItem)=>taskItem.id==taskData.id? taskData : taskItem)
      setTasks(tasksClone)
      handleCloseModal()
    },
    onDeleteItem:(taskData)=>{
      const tasksClone=tasks.filter((taskItem)=>taskData.id!==taskItem.id)
      setTasks(tasksClone)
    },
    onToggleArchiveItem:(taskData)=>{
      const tasksClone=tasks.map((taskItem)=>{
        if(taskItem.id==taskData.id){
          const newArchiveState=!taskData.is_archived
          return{
            ...taskData,
            is_archived:newArchiveState,
            archive_at:newArchiveState?moment().format('lll'):''
          }
        }else{
          return{...taskItem}
        }
      })
      setTasks(tasksClone)
    },
    onToggleCheckedItem:(taskData)=>{
      const tasksClone=tasks.map((taskItem)=>{
        if(taskItem.id==taskData.id){
          const newCheckedState=!taskData.is_checked
          return{
            ...taskData,
            is_checked:newCheckedState,
            finished_at:newCheckedState?moment().format('lll'):''
          }
        }else{
          return{...taskItem}
        }
      })
      setTasks(tasksClone)
    },

  };
  const getWeatherData = async () => {
    let coordinates=await getCurrentLocation()
    try {
      setisLoading(true)
      let data = await callApi({
        method: ENDPOINTS.getCurrentWeather.method,
        url: `${ENDPOINTS.getCurrentWeather.url}?lat=${coordinates?.lat}&lon=${coordinates?.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
      }        
      );
      setWeatherData(data)
    } catch (err) {
    } finally {
      setisLoading(false)
    }
  };
  useEffect(()=>{
    if(tasks.length==0){
      const tasksLocal = LocalStorage({type:'get',key:'tasks'})||[]
      setTasks([...tasksLocal])
      return
    }
    LocalStorage({type:'set',key:'tasks',value:tasks})
  },[tasks])
  useEffect(()=>{
    getWeatherData()
  },[])
 

  return (
    <section>
      <ModalForm open={isOpenModal} mode={mode} handleClose={handleCloseModal} data={task} actions={actions} />
      {Object.keys(weatherData).length&&
        <WeatherCard 
          temp={weatherData?.main?.temp}
          main={weatherData?.weather[0]?.main}
          location={`${weatherData?.name},${weatherData?.sys?.country}`}
          time={moment().format('lll')}
          iconId={weatherData?.weather[0]?.icon}
        />
      }
      <Stack sx={{ mt: 4 }} spacing={{ xs: 2, sm: 2 }} direction='row' useFlexGap flexWrap='wrap' justifyContent='flex-end' alignItems='center'>
        <Tooltip title='Add task' arrow>
          <Fab color='primary' aria-label='add' onClick={actions.openAddModal}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </Stack>
      {/* ListTasks  */}
      <Stack spacing={5} sx={{ width: '100%', mt: 6 }}>
        {tasks.map((taskItem, index) => (
          <Task taskItem={taskItem} actions={actions} key={index} />
        ))}
      </Stack>
    </section>
  );
}
