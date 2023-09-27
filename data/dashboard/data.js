import React, { useState, useEffect } from 'react';

export default function Data(){
    const [clients, setClients] = useState([]);
    const fetchUsers=async ()=>{
        try {
            const response = await fetch('/api/usersHandler', {
              method: 'GET',
            });
            const data = await response.json();
            setClients(data);
          } catch (error) {
            console.error(error);
          }
    }
    return (
        <div>
            {fetchUsers()} 
        </div>
    )
}
