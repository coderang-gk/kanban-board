import React from "react";

import doneIcon from "../assets/icons/Done.svg";
import inProgressIcon from "../assets/icons/in-progress.svg";
import noPriorityIcon from "../assets/icons/No-priority.svg";
import lowPriorityIcon from "../assets/icons/Img - Low Priority.svg";
import mediumPriorityIcon from "../assets/icons/Img - Medium Priority.svg";
import highPriorityIcon from "../assets/icons/Img - High Priority.svg";
import urgentPriorityIcon from "../assets/icons/SVG - Urgent Priority colour.svg";
import toDoIcon from "../assets/icons/To-do.svg";

const TicketCard = ({ ticket, grouping }) => {
  const priorityLabels = ["No Priority", "Low", "Medium", "High", "Urgent"];
  const priorityIcons = [
    noPriorityIcon,
    lowPriorityIcon,
    mediumPriorityIcon,
    highPriorityIcon,
    urgentPriorityIcon,
  ];

  const statusIcons = {
    "To Do": toDoIcon,
    "In Progress": inProgressIcon,
    "Done": doneIcon,
  };

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        <h4 className="ticket-title">{ticket.title}</h4>
      </div>
      <div className="ticket-details">
        <div className="ticket-priority">
          {grouping !== "priority" && ticket.priority !== undefined && (
            <img
              src={priorityIcons[ticket.priority]}
              alt={priorityLabels[ticket.priority]}
              className="priority-icon-detail"
            />
          )}
          {ticket.tag && <span className="ticket-tag">{ticket.tag[0]}</span>}
        </div>
        <div className="ticket-status">
          {ticket.status && statusIcons[ticket.status] && (
            <img
              src={statusIcons[ticket.status]}
              alt={ticket.status}
              className="status-icon"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
