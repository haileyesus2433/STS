import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import { UserPlus } from 'lucide-react';

interface SignupState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  redirectToDashboard: boolean;
}

class Signup extends Component<{}, SignupState> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  constructor(props: {}) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'user',
      redirectToDashboard: false
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { name, email, password, confirmPassword, role } = this.state;
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    try {
      await this.context.signup(name, email, password, role);
      this.setState({ redirectToDashboard: true });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  render() {
    const { name, email, password, confirmPassword, role, redirectToDashboard } = this.state;
    const { isAuthenticated, user } = this.context;
    
    // Redirect if logged in
    if (isAuthenticated && redirectToDashboard) {
      return <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} />;
    }
    
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-indigo-600 p-4 text-white text-center">
          <h2 className="text-2xl font-bold flex items-center justify-center">
            <UserPlus className="mr-2" size={24} />
            Sign Up
          </h2>
        </div>
        <div className="p-6">
          <form onSubmit={this.handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-300"
                id="name"
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-300"
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-300"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                placeholder="Password"
                required
                minLength={6}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-300"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
                placeholder="Confirm Password"
                required
                minLength={6}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                Role
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-300"
                id="role"
                name="role"
                value={role}
                onChange={this.handleChange}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-150"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account? <a href="/login" className="text-indigo-600 hover:text-indigo-800">Login</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;