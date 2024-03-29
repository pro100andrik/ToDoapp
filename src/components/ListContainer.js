import React from 'react';
import TextArea from './TextArea';
import ListOfItems from './ListOfItems';
import Controls from './Controls';

class ListContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tasks: this.props.taskList.map(element => {
        element.editable = false;
        return element;
      }),
      showType: 'showAll',
      showRemoveButton: this.props.taskList.map(el => el.isChecked).includes(true)
    }
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleIsChecked = this.handleIsChecked.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleItemsVisibility = this.handleItemsVisibility.bind(this);
    this.handleRemoveCompleted = this.handleRemoveCompleted.bind(this);
  }

  handleAddItem(taskName){
    this.setState({
       tasks: [...this.state.tasks, {task:taskName, isChecked: false, index: this.state.tasks[this.state.tasks.length - 1]?.index + +1 || 0}],
    },this.updateLocalStorage)
  }

  handleIsChecked(target){
    this.setState({
      tasks: this.state.tasks.map(el => {
          if (el.index === +target) el.isChecked = !el.isChecked
        return el;
      }),
      showRemoveButton: this.state.tasks.map(el => el.isChecked).includes(true)
    },this.updateLocalStorage);
  }

  handleDeleteItem(target){
    this.setState(prevState => ({
      tasks: prevState.tasks.filter((_, i) => target !== i),
      showRemoveButton: prevState.tasks.filter((_, i) => target !== i).map(el => el.isChecked).includes(true)
    }),this.updateLocalStorage)
  }

  handleRemoveCompleted(){
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(el => !el.isChecked),
      showRemoveButton: false
    }),this.updateLocalStorage)
  }

  handleItemsVisibility(type){
    this.setState({
      showType: type
    })
  }

  handleClick = (targetIndex) => {
    this.setState({
      tasks: this.state.tasks.map((element, index) => {
        if (targetIndex === index){
          element.editable = true;
        }
        return element;
      })
    })
  }

  handleInputBlur = () => {
    this.setState({
      tasks: this.state.tasks.map((element) => {
          element.editable = false;
        return element;
      })
    },this.updateLocalStorage)
  }

  handleChangeTask = (targetIndex, targetText) => {
    this.setState({
      tasks: this.state.tasks.map((element, index) => {
        if (targetIndex === index){
          element.task = targetText
        }
        return element;
      })
    })
  }

  updateLocalStorage = () => {
    const localStorage = window.localStorage;
    localStorage.setItem('todoAppTasks', JSON.stringify(this.state.tasks.map(element => {
      const save = {}
      save.index = element.index;
      save.task = element.task;
      save.isChecked = element.isChecked;
      return save;
    })))
  }

  render(){
      return(
      <div>
      <TextArea handleAddItem={this.handleAddItem} />
      <ul>
      <ListOfItems
        taskList={this.state.tasks}
        handleCheck={this.handleIsChecked}
        handleDeleteItem={this.handleDeleteItem}
        showType={this.state.showType}
        handleClick={this.handleClick}
        handleInputBlur={this.handleInputBlur}
        handleChangeTask={this.handleChangeTask}
      /></ul>
      <Controls
        taskList={this.state.tasks}
        handleItemsVisibility={this.handleItemsVisibility}
        handleRemoveCompleted={this.handleRemoveCompleted}
        showRemoveButton={this.state.showRemoveButton}
      />
      </div>
    )
  }
}

export default ListContainer
