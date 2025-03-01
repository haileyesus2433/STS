import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipboardList } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import TicketItem from "../tickets/TicketItem";

// API base URL
const API_URL = "http://localhost:5000/api";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  user: User;
}

interface AdminDashboardState {
  tickets: Ticket[];
  loading: boolean;
}

class AdminDashboard extends Component<{}, AdminDashboardState> {
  static contextType = AuthContext;
  declare context: React.ContextType<typeof AuthContext>;

  constructor(props: {}) {
    super(props);
    this.state = {
      tickets: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchTickets();
  }

  fetchTickets = async () => {
    try {
      const res = await axios.get(`${API_URL}/tickets`);
      this.setState({ tickets: res.data, loading: false });
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast.error("Failed to load tickets");
      this.setState({ loading: false });
    }
  };

  handleStatusChange = async (ticketId: string, newStatus: string) => {
    try {
      await axios.put(`${API_URL}/tickets/${ticketId}`, {
        status: newStatus,
      });

      toast.success("Ticket status updated");
      this.fetchTickets();
    } catch (error) {
      toast.error("Failed to update ticket status");
    }
  };

  render() {
    const { tickets, loading } = this.state;

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center text-indigo-600">
          <ClipboardList className="mr-2" size={24} />
          All Support Tickets
        </h2>

        {loading ? (
          <p className="text-center py-4">Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <p className="text-center py-4 text-gray-500">
            No tickets found in the system.
          </p>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <TicketItem
                key={ticket._id}
                ticket={ticket}
                isAdmin={true}
                onStatusChange={this.handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default AdminDashboard;
