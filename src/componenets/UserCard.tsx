import React, { useEffect, useState } from 'react'

type User = {
    id: number,
    name: string,
    email: string,
    age: number,
    profilePicture:string,
}

const UserCard = () => {

  const [searchUser,setSearchuser] = useState('')
  const [users, setUsers] = useState<User[]>()
  const [user,setUser] = useState<User|null>()
  const [error,setError] = useState('')

    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearchuser(e.target.value)
    }

    const fetchUsers= async()=>{
        try {
            const response = await fetch('/users.json')
            if (!response.ok) {
                throw new Error
            }
            const data = await response.json()
            setUsers(data.users)
            console.log(users)                
        } catch (error) {
            console.error('error: ', error)
        }
    } 

    const findUser = ()=>{
        const found = users?.find(u=>
            u.name.toLowerCase().includes(searchUser.toLowerCase())
        )
        if (found) {
            setUser(found)
            setError('')
        }
        else{
            setUser(null)
            setError('No user found with the given name.')
        }
    }

    useEffect(()=>{
        fetchUsers()
    },[])

  return (
    <div className='user-card'>
        <div className='search-section'>
            <label htmlFor="">Enter User Name</label>
            <input 
            value={searchUser}
            onChange={handleSearch}
            type="text" />
            <button onClick={findUser}>Search</button>
        </div>
        <div className='result-section'>
            {error && <p>{error}</p>}
            {user && (
                <div className='user-info'>
                    <img src={user.profilePicture} alt={user.name} className='profile'/>
                    <div className='user-details'>
                        <p>ID: {user.id}</p>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Ahe: {user.age}</p>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default UserCard