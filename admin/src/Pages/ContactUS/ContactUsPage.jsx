import { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import { format } from 'date-fns';
import { fetchContactUs, updateContactUs } from '../../service/apiService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ContactUsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    subject: '',
    isRead: '',
    isSpam: '',
    isSolved: ''
  });
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
          navigate('/');
      }
  }, [navigate]);

  const fetchData = async () => {
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

      const response = await fetchContactUs({...apiFilters,token});
      
      if (response?.success && response?.statusCode === 200) {
        setContacts(response.data.contactUsList || []);
        setTotalCount(response.data.total || 0);
      } else {
        console.error('API call succeeded but returned unexpected data structure:', response);
        setContacts([]);
        setTotalCount(0);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setContacts([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, filters]);

  

  const handleStatusUpdate = async (contactId, field, value) => {
    
    try {
      setContacts(contacts.map(contact => 
        contact._id === contactId ? { ...contact, [field]: value } : contact
      ));
      
      const updateData = {
        [field]: value
      };

      const response = await updateContactUs(localStorage.getItem('accessToken'),contactId, updateData);
      
      if (!response?.success || response?.statusCode !== 200) {
        console.error('Failed to update contact:', response?.message);
        await fetchData();
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      await fetchData();
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Contact Reports</h1>
          
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

        {/* Contacts Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                ) : contacts.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                      No contacts found
                    </td>
                  </tr>
                ) : (
                  contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          <span className="text-sm font-medium text-gray-900">{contact.name}</span>
                          <span className="text-sm text-gray-500">{contact.email}</span>
                          <span className="text-sm text-gray-500">{contact.companyName}</span>
                          <span className="text-sm text-gray-500">{contact.phoneNumber}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          <span className="text-sm font-medium text-gray-900">{contact.subject}</span>
                          {contact.fileLink && (
                            <a 
                              href={contact.fileLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              View Attachment
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm text-gray-900 whitespace-pre-wrap max-h-36 overflow-y-auto">
                            {contact.message}
                          </p>
                          {contact.createdAt && (
                            <span className="text-xs text-gray-500">
                              {format(new Date(contact.createdAt), 'MMM d, yyyy h:mm a')}
                            </span>
                          )}
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
                                checked={contact[key]}
                                onChange={(e) => handleStatusUpdate(contact._id, key, e.target.checked)}
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

export default ContactUsPage;