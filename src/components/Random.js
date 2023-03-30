import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
const Random = () => {
  const [user, setUser] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const api = "https://randomuser.me/api";
  useEffect(() => {
    return () => {
      async function fetchData() {
        try {
          const response = await axios.get(api);
          const data = response.data.results;

          console.log(data);
          localStorage.setItem("data", JSON.stringify(data));
          setUser(data);
        } catch (error) {
          console.log(error);
        }
      }

      fetchData();
    };
  }, [refresh]);

  const handleRefresh = useCallback(() => {
    setRefresh(refresh + 1);
  }, [refresh]);

  /* useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(api);
                const data = response.data.results;
                
                
                console.log(data);
                setuser(data);
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, []) */

  return (
    <>
      <div>
        {user.map((userData) => (
          <ul key={userData.id.value}>
            <li>
              {userData.name.title} {userData.name.first} {userData.name.last}
            </li>
            <li>{userData.email}</li>
          </ul>
        ))}
      </div>
      <button onClick={handleRefresh}>Refresh</button>
    </>
  );
};

export default Random;
