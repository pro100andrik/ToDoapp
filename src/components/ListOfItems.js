import React from 'react';

const ListOfItems = props =>{

  const handleCheck = e => {
    props.handleCheck(e.target.value)
  }

  const handleButtonClick = index => {
    props.handleDeleteItem(index)
  }

  const handleDoubleClick = e =>{
    e.stopPropagation();
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
                              // onClick={(e) => props.handleDoubleClick(index, e)}
                              // onDoubleClick={(e) => props.handleDoubleClick(index, e)}
                              >
                            <input type='checkbox'
                              value={element.index}
                              checked={element.isChecked}
                              onChange={handleCheck}
                              onDoubleClick={(e) => handleDoubleClick(e)}
                              className='checkbox'/>

                            {element.editable
                              ?
                            <>
                              <span className='input-wrapper'>
                              <input autoFocus
                                     type='text'
                                     className='task-input'
                                     value={element.task}
                                     onBlur={props.handleInputBlur}
                                     onChange={(e) => props.handleChangeTask(index, e.target.value)}/>
                              </span>
                              <button className='save-button'>Save</button>
                            </>
                              :
                            <span onClick={(e) => props.handleClick(index, e)}
                                  className={element.isChecked ? 'text checked-element' : 'text'}>
                                  {element.task}
                            </span>
                            }


                            <button className='close-button'
                            onClick={() => handleButtonClick(index)}>X</button>
                          </li>)
    )

}

export default ListOfItems
