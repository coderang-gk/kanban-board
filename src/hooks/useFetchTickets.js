// hooks/useFetchTickets.js
import { useState, useEffect } from "react";

const useFetchTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment"); // Replace with your API URL
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { tickets, users, loading };
};

export default useFetchTickets;
