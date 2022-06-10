import React from 'react';

const ListOfItems = props =>{

  const handleCheck = e => {
    props.handleCheck(e.target.value)
  }

  const handleButtonClick = index => {
    props.handleDeleteItem(index)
  }

  const handleMouseEnter = index => {
    props.handleButtonVisibility(index);
  }

  const handleMouseLeave = index => {
    props.handleButtonVisibility(index);
  }


    let filteredTasks = props.taskList;
    if(props.showType === 'showActive'){
      filteredTasks = props.taskList.filter(el => !el.isChecked)
    }else if (props.showType === 'showCompleted'){
      filteredTasks = props.taskList.filter(el => el.isChecked)
    }
    return(
      filteredTasks.map((element, index) =>
                          <li key={index}
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={() => handleMouseLeave(index)}>
                            <input type='checkbox'
                              value={element.index}
                              checked={element.isChecked}
                              onChange={handleCheck}
                              className='checkbox'>
                            </input>
                            
                            <span className={element.isChecked ? 'text checked-element' : 'text'} >{element.task}</span>
                            <button className={props.buttonIsVisible[index] ? 'close-button' : 'close-button hiden'}
                            onClick={() => handleButtonClick(index)}>X</button>
                          </li>)
    )

}

export default ListOfItems
