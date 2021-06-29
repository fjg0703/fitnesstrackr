import React, { useEffect } from 'react'
import axios from 'axios'



async function getRoutines() {

  let { data } = await axios.get('https://fitnesstrac-kr.herokuapp.com/api/routines')

console.log(data)
return data

}





const Routines = () => {
  const [routines, setRoutines ] = useSate([])

  useEffect(() => {

    async function getAllRoutines(){
      let data = await getRoutines()

    setRoutines(data)


    }

    getAllRoutines()

  }, [])

  console.log(routines)


  let displayRoutines = routines.map((r, idx) => {
    return <div className='routine'>
      <h1>{r.name}</h1>
      <h2>Creator: {r.creatorName}</h2>
      <h3> Goal: {r.goal}</h3>
    </div>
  })

  return <div>
    {



    }



  </div>
}

const SingleRoutine = (props) =>{
  


}


const activity =() => {

}

export default Routine