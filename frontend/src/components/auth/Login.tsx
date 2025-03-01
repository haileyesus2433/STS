import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import { LogIn } from 'lucide-react';

interface LoginState {
  email: string;
  password: string;
  redirectToDashboard: boolean;
}

class Login extends Component<{}, LoginState> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  constructor(props: {}) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirectToDashboard: false
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { email, password } = this.state;
    
    try {
      await this.context.login(email, password);
      this.setState({ redirectToDashboard: true });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  render() {
    const { email, password, redirectToDashboard } = this.state;
    const { isAuthenticated, user } = this.context;
    
    // Redirect if logged in
    if (isAuthenticated && redirectToDashboard) {
      return <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} />;
    }
    
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-indigo-600 p-4 text-white text-center">
          <h2 className="text-2xl font-bold flex items-center justify-center">
            <LogIn className="mr-2" size={24} />
            Login
          </h2>
        </div>
        <div className="p-6">
          <form onSubmit={this.handleSubmit}>
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
            <div className="mb-6">
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
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-150"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account? <a href="/signup" className="text-indigo-600 hover:text-indigo-800">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;