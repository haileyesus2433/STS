import React, { Component } from 'react';
import { Clock, User } from 'lucide-react';

interface User {
  _id?: string;
  name: string;
  email: string;
}

interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  user?: User;
}

interface TicketItemProps {
  ticket: Ticket;
  isAdmin: boolean;
  onStatusChange: (ticketId: string, newStatus: string) => void;
}

class TicketItem extends Component<TicketItemProps> {
  getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800';
      case 'in progress':
        return 'bg-indigo-100 text-indigo-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { ticket, onStatusChange } = this.props;
    onStatusChange(ticket._id, e.target.value);
  };

  render() {
    const { ticket, isAdmin } = this.props;
    const statusClass = this.getStatusColor(ticket.status);
    
    return (
      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{ticket.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
          </span>
        </div>
        
        <p className="text-gray-600 mb-3">{ticket.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Clock size={16} className="mr-1" />
          <span>{this.formatDate(ticket.createdAt)}</span>
        </div>
        
        {isAdmin && ticket.user && (
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <User size={16} className="mr-1" />
            <span>{ticket.user.name} ({ticket.user.email})</span>
          </div>
        )}
        
        {isAdmin && (
          <div className="mt-3">
            <label htmlFor={`status-${ticket._id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Update Status:
            </label>
            <select
              id={`status-${ticket._id}`}
              value={ticket.status}
              onChange={this.handleStatusChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        )}
      </div>
    );
  }
}

export default TicketItem;