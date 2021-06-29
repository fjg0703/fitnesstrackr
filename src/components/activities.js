import React, { useState, useEffect } from 'react'
import {createActivity, getAllActivities, getPublicRoutinesByActivity} from '../api'

const Activities = ({activities, loggedIn, setActivities}) =>{

    const[ newActivity, setNewActivity, ] = useState()
    const[ activityRoutines, setActivityRoutines] = useState(false);
    const[ activityId, setActivityId]= useState()
    const handleSubmit = async (event) =>{
        try{
            event.preventDefault()
            const response = await createActivity(newActivity) 

            if(response.id){
            alert("Success Creating Activity")
                setActivities(await getAllActivities())
            }else{
                return alert(response.message)
            }
            }catch(error){
                console.error(error)
            }
    }

    const activityHandle = async (event) => {
        event.preventDefault()

        setActivityId(event.target.id)

        setActivityRoutines(await getPublicRoutinesByActivity,
          (activityId))
    }

    return ( <div>
        {loggedIn ? 
    <form onSubmit={handleSubmit}>
    <h2> Create An Activity</h2>
    <label>Activity Name:</label>
    <input
      name="Name"
      required
      onChange={(event) => setNewActivity({ ...newActivity, name: event.target.value })}
    />
    <label>Description:</label>
    <input
      type="Description"
      required
      onChange={(event) => setNewActivity({ ...newActivity, description: event.target.value })}
    />
    <button type="submit">submit</button>
  </form> : null }


        <h1>Activities</h1>
        {activities?.map((activity, index) => {
        return (
        <div key={index}>
        { <b>Click Activity name to view affiliated routines</b> }
        <h2  id ={activity.id} onClick={activityHandle} >Activity :: {activity.name}</h2>
        <h3>Description ::</h3> <p>{activity.description}</p>
        { activity.id && activityId ? 

        <ul>
            {activityRoutines?.map((routine, index) => {
                return(
                    <li index={index}>
                        Routine: {routine.name}
                    </li>
                )})}
        </ul>   
        : null} 
        

        
      </div>)
    })}
    </div>
    )
    
} 

export default Activities