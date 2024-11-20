// App.js
import React from "react";
import useFetchTickets from "./hooks/useFetchTickets.js";
import KanbanBoard from "./components/KabanBoard.js";
import "./styles/App.css";

function App() {
  const { users,tickets, loading } = useFetchTickets();

  if (loading) return <div>Loading...</div>;

  return <KanbanBoard tickets={tickets} users={users} />
  ;
}

export default App;
