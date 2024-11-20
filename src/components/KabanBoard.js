import React, { useState, useEffect } from "react";
import DropdownMenu from "./DropdownMenu";
import TicketCard from "./TicketCard";

// Import status icons
import todoIcon from "../assets/icons/To-do.svg";
import inProgressIcon from "../assets/icons/in-progress.svg";
import backlogIcon from "../assets/icons/Backlog.svg";
import plusIcon from "../assets/icons/add.svg";
import threeDotsIcon from "../assets/icons/3 dot menu.svg";
import noPriorityIcon from "../assets/icons/No-priority.svg";
import lowPriorityIcon from "../assets/icons/Img - Low Priority.svg";
import mediumPriorityIcon from "../assets/icons/Img - Medium Priority.svg";
import highPriorityIcon from "../assets/icons/Img - High Priority.svg";
import urgentPriorityIcon from "../assets/icons/SVG - Urgent Priority colour.svg";
import user from "../assets/icons/user.svg";

const KanbanBoard = ({ tickets, users }) => {
  const [grouping, setGrouping] = useState(() => {
    return localStorage.getItem("grouping") || "status"; 
  });
  const [ordering, setOrdering] = useState(() => {
    return localStorage.getItem("ordering") || "priority"; 
  });
  

  useEffect(() => {
    const savedGrouping = localStorage.getItem("grouping");
    const savedOrdering = localStorage.getItem("ordering");
    if (savedGrouping) setGrouping(savedGrouping);
    if (savedOrdering) setOrdering(savedOrdering);
  }, []);

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    localStorage.setItem("ordering", ordering);
  }, [grouping, ordering]);

  const groupTickets = (tickets, groupBy) => {
    const grouped = {};
    tickets.forEach((ticket) => {
      let key;
      if (groupBy === "userId") {
        const user = users.find((user) => user.id === ticket.userId);
        key = user ? user.name : "Unknown User";
      } else {
        key = ticket[groupBy] || "Uncategorized";
      }
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(ticket);
    });
    return grouped;
  };

  const groupedTickets = groupTickets(tickets, grouping);

  const sortTickets = (tickets, orderBy) => {
    if (orderBy === "priority") {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (orderBy === "title") {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Todo":
        return todoIcon;
      case "In progress":
        return inProgressIcon;
      case "Backlog":
        return backlogIcon;
      case "1":
        return lowPriorityIcon;
      case "2":
        return mediumPriorityIcon;
      case "3":
        return highPriorityIcon;
      case "4":
        return urgentPriorityIcon;
      case "Uncategorized":
        return noPriorityIcon;
      default:
        return user;
    }
  };

  const getColumnLabel = (key) => {
    if (grouping === "userId") {
      return key; 
    }
    switch (key) {
      case "Todo":
        return "To Do";
      case "In progress":
        return "In Progress";
      case "Backlog":
        return "Backlog";
      case "1":
        return "Low";
      case "2":
        return "Medium";
      case "3":
        return "High";
      case "4":
        return "Urgent";
      case "Uncategorized":
        return "No Priority";
      default:
        return null;
    }
  };

  return (
    <div className="kanban-board">
      <div className="dropdown-container">
        <DropdownMenu
          grouping={grouping}
          ordering={ordering}
          setGrouping={setGrouping}
          setOrdering={setOrdering}
        />
      </div>

      <div className="columns">
        {Object.keys(groupedTickets).map((groupKey) => (
          <div key={groupKey} className="column">
            <div className="column-header">
              <div className="column-header-left">
                <img
                  src={getStatusIcon(groupKey)}
                  alt={`${groupKey} Icon`}
                  className="status-icon"
                />
                <span className="column-label">{getColumnLabel(groupKey)}</span>
                <span className="ticket-count">{groupedTickets[groupKey].length}</span>
              </div>
              <div className="column-header-right">
                <img src={plusIcon} alt="Add Icon" className="status-icon" />
                <img src={threeDotsIcon} alt="Menu Icon" className="status-icon" />
              </div>
            </div>
            {sortTickets(groupedTickets[groupKey], ordering).map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} grouping={grouping} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
