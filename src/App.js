import React from 'react';
import Caption from './components/Caption';
import ListContainer from './components/ListContainer';
import Credits from './components/Credits';

import './App.css';

const DEFAULTTASKS = [
  {index: 0, task: 'clean home',isChecked: false},
  {index: 1,task: 'go clean myself in the bathroom',isChecked: false},
  {index: 2,task: 'play on guitar',isChecked: true},
  {index: 3,task: 'learn react',isChecked: false},
  {index: 4,task: 'go to store',isChecked: false},
];

const tasks = [];
const localStorage = window.localStorage;

if (!localStorage.getItem('todoAppTasks')){
  tasks.push(...DEFAULTTASKS)
}else{
  const storageTasks = JSON.parse(localStorage.getItem('todoAppTasks'))
  tasks.push(...storageTasks)
}



class App extends React.Component {

  render(){


    return(
      <div className="mainContainer">
      <Caption />
      <ListContainer taskList={tasks} />
      <Credits />
      </div>
    )
  }
}



export default App;
