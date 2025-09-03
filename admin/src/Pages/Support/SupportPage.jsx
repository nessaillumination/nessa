import React, { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import { format } from 'date-fns';
import { fetchSupportTickets, updateSupportTicket } from '../../service/apiService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const SupportPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    subject: '',
    isRead: '',
    isSpam: '',
    isSolved: ''
  });

  const navigate = useNavigate()
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        navigate('/');
    }
}, [navigate]);

  useEffect(() => {
    fetchTickets();
  }, [page, filters]);

  const fetchTickets = async () => {
    try {

      setLoading(true);

      const token = localStorage.getItem('accessToken');
        if (!token) {
            toast.error('Authentication failed: No token found');
            return;
        }
      const apiFilters = {
        limit: ITEMS_PER_PAGE,
        offset: (page - 1) * ITEMS_PER_PAGE,
        subject: filters.subject || undefined,
        isRead: filters.isRead === '' ? undefined : filters.isRead === 'true',
        isSpam: filters.isSpam === '' ? undefined : filters.isSpam === 'true',
        isSolved: filters.isSolved === '' ? undefined : filters.isSolved === 'true'
      };

      console.log(apiFilters);
      

      const response = await fetchSupportTickets({ ...apiFilters, token });
      
      if (response.success && response.data) {
        setTickets(response.data.contactUsList);
        setTotalCount(response.data.total);
      } else {
        toast.error('Failed to get support us tickets')
        setTickets([]);
        setTotalCount(0);
      }
    } catch (error) {
      toast.error('Failed to get support us tickets')
      setTickets([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (ticketId, field, value) => {
    try {
      setTickets(tickets.map(ticket => 
        ticket._id === ticketId ? { ...ticket, [field]: value } : ticket
      ));
      
      const updateData = {
        [field]: value
      };

      // Call update API
      const response = await updateSupportTicket(localStorage.getItem('accessToken'),ticketId, updateData);
      
      if (!response.success) {
        console.error('Failed to update ticket:', response.message);
        // Revert optimistic update on failure
        await fetchTickets();
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
      // Revert optimistic update on error
      await fetchTickets();
      // You might want to show an error notification here
    }
  };


  

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Support Tickets</h1>
          
          {/* Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <input
                type="text"
                name="subject"
                placeholder="Search by subject"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                onChange={handleFilterChange}
                value={filters.subject}
              />
            </div>
            
            {['isRead', 'isSpam', 'isSolved'].map((filterName) => (
              <div key={filterName} className="flex flex-col">
                <select
                  name={filterName}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  onChange={handleFilterChange}
                  value={filters[filterName]}
                >
                  <option value="">Filter by {filterName.slice(2)}</option>
                  <option value="true">{filterName.slice(2)}</option>
                  <option value="false">Not {filterName.slice(2)}</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                    Customer Info
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                    Product Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                    Message
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      </div>
                    </td>
                  </tr>
                ) : tickets.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                      No tickets found
                    </td>
                  </tr>
                ) : (
                  tickets.map((ticket) => (
                    <tr key={ticket._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          <span className="text-sm font-medium text-gray-900">{ticket.name}</span>
                          <span className="text-sm text-gray-500">{ticket.companyName}</span>
                          <span className="text-sm text-gray-500">{ticket.email}</span>
                          <span className="text-sm text-gray-500">{ticket.phoneNumber}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          <span className="text-sm font-medium text-gray-900">{ticket.productName}</span>
                          <span className="text-sm text-gray-500">SKU: {ticket.productSKUId}</span>
                          {ticket.fileLink && (
                            <a 
                              href={ticket.fileLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center space-x-1"
                            >
                              <span>View Attachment</span>
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm text-gray-900 whitespace-pre-wrap max-h-36 overflow-y-auto">
                            {ticket.message}
                          </p>
                          <span className="text-xs text-gray-500">
                            {format(new Date(ticket.createdAt), 'MMM d, yyyy h:mm a')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-3">
                          {[
                            { key: 'isRead', label: 'Read' },
                            { key: 'isSpam', label: 'Spam' },
                            { key: 'isSolved', label: 'Solved' }
                          ].map(({ key, label }) => (
                            <label key={key} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={ticket[key]}
                                onChange={(e) => handleStatusUpdate(ticket._id, key, e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4 transition-colors"
                              />
                              <span className="text-sm text-gray-700">{label}</span>
                            </label>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalCount > 0 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              count={Math.ceil(totalCount / ITEMS_PER_PAGE)}
              page={page}
              onChange={(e, newPage) => setPage(newPage)}
              color="primary"
              variant="outlined"
              shape="rounded"
              size="large"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportPage;