import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Ticket, TicketPlus } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import TicketItem from "../tickets/TicketItem";

// API base URL
const API_URL = "http://localhost:5000/api";

interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

interface UserDashboardState {
  tickets: Ticket[];
  title: string;
  description: string;
  loading: boolean;
}

class UserDashboard extends Component<{}, UserDashboardState> {
  static contextType = AuthContext;
  declare context: React.ContextType<typeof AuthContext>;

  constructor(props: {}) {
    super(props);
    this.state = {
      tickets: [],
      title: "",
      description: "",
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

  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, description } = this.state;

    try {
      await axios.post(`${API_URL}/tickets`, {
        title,
        description,
      });

      toast.success("Ticket created successfully");
      this.setState({ title: "", description: "" });
      this.fetchTickets();
    } catch (error) {
      toast.error("Failed to create ticket");
    }
  };

  render() {
    const { tickets, title, description, loading } = this.state;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center text-indigo-600">
            <TicketPlus className="mr-2" size={24} />
            Create New Ticket
          </h2>
          <form onSubmit={this.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-300"
                id="title"
                type="text"
                name="title"
                value={title}
                onChange={this.handleChange}
                placeholder="Ticket Title"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-300"
                id="description"
                name="description"
                value={description}
                onChange={this.handleChange}
                placeholder="Describe your issue"
                rows={4}
                required
              />
            </div>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-150"
              type="submit"
            >
              Submit Ticket
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center text-indigo-600">
            <Ticket className="mr-2" size={24} />
            My Tickets
          </h2>

          {loading ? (
            <p className="text-center py-4">Loading tickets...</p>
          ) : tickets.length === 0 ? (
            <p className="text-center py-4 text-gray-500">
              No tickets found. Create your first ticket!
            </p>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <TicketItem
                  key={ticket._id}
                  ticket={ticket}
                  isAdmin={false}
                  onStatusChange={() => {}}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default UserDashboard;
