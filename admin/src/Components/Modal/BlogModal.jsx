import { useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { toast } from 'react-hot-toast'
import { createBlog, updateBlog, uploadFile } from '../../service/apiService'
import JoditEditor from "jodit-react";
import slugify from 'slugify';
import BlogTypeDropdown from '../BlogTypeDropdown '

const editorConfig = {
    editorClass: "light",
    // style: {
    //     backgroundColor: "#1e1e2f",
    //     color: "#f5f5f5",
    // },
    statusbar: false,
};

const BlogModal = ({ open, onClose, token, blog }) => {
    const initialFormState = {
      title: '',
      resource_type: '',
      slug: '',
      tag: '',
      description: '',
      thumbnailImage: null,
      userImage: null,
      userName: '',
      content: ''
    };
  
    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      if (blog) {
        setFormData({
          title: blog.title || '',
          resource_type: blog.resource_type || '',
          slug: blog.slug || '',
          tag: blog.tag || '',
          description: blog.description || '',
          thumbnailImage: blog.thumbnailImage || null,
          userImage: blog.userImage || null,
          userName: blog.userName || '',
          content: blog.content || ''
        });
      } else {
        setFormData(initialFormState);
      }
    }, [blog]);
  
    useEffect(() => {
      if (!open) {
        setFormData(initialFormState);
      }
    }, [open]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleEditorChange = (content) => {
      setFormData(prev => ({
        ...prev,
        content
      }));
    };
  
    const generateSlug = () => {
      if (!formData.title && !formData.title.trim()) {
        toast.error("Blog Title is Required ");
        return;
      }
      
      const slug = slugify(formData.title, { lower: true });
      setFormData(prev => ({ ...prev, slug }));
    };
  
    const handleFileUpload = async (e, type) => {
      const files = e.target.files;
      if (!files.length) return;
  
      const maxFileSize = 1000000; // 1MB
      setLoading(true);
      try {
        const file = files[0];
        if (file.size > maxFileSize) {
          toast.error('File size must be less than 1MB');
          return;
        }
  
        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('category', type.toUpperCase());
  
        const response = await uploadFile(uploadData);
        if (response.success) {
          setFormData(prev => ({
            ...prev,
            [type]: response.data
          }));
          toast.success('File uploaded successfully');
        } else {
          toast.error('File upload failed');
        }
      } catch (error) {
        console.error('Upload failed:', error);
        toast.error('File upload failed');
      } finally {
        setLoading(false);
      }
    };
  
    const validateForm = () => {
      const requiredFields = [
        { field: 'title', message: 'Blog title is required' },
        { field: 'resource_type', message: 'Blog type is required' },
        { field: 'slug', message: 'Slug is required' },
        { field: 'description', message: 'Description is required' },
        { field: 'tag', message: 'Tag is required' },
        { field: 'userName', message: 'Author name is required' },
        { field: 'content', message: 'Blog content is required' },
      ];
  
      for (const { field, message } of requiredFields) {
        if (!formData[field]?.trim()) {
          toast.error(message);
          return false;
        }
      }
  
      if (!formData.thumbnailImage) {
        toast.error("Thumbnail image is required");
        return false;
      }
      if (!formData.userImage) {
        toast.error("Author image is required");
        return false;
      }
  
      return true;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;
  
      setLoading(true);
      try {
        const response = blog 
          ? await updateBlog(token, blog?._id, formData)
          : await createBlog(token, formData);
  
        if (response.success) {
          toast.success(blog ? 'Blog updated successfully' : 'Blog created successfully');
          onClose();
        } else {
          toast.error('Operation failed');
        }
      } catch (error) {
        console.error('Submission failed:', error);
        toast.error('An error occurred during submission');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Modal
        open={open}
        onClose={onClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-[900px] max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
            {blog ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter blog title"
                />
              </div>
  
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type</label>
                  <BlogTypeDropdown 
                    selectedType={formData.resource_type} 
                    onChange={(value) => handleInputChange({ target: { name: 'resource_type', value } })}
                  />
                   
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      readOnly
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-3 bg-gray-50"
                    />
                   <button
                      type="button"
                      onClick={generateSlug}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Generate Slug
                    </button>
                  </div>
                </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <input
                  type="text"
                  name="tag"
                  value={formData.tag}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter tags (comma-separated)"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  rows="3"
                  placeholder="Enter blog description"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter author name"
                />
              </div>
            </div>
  
            {/* Image Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUpload
                label="Thumbnail Image"
                file={formData.thumbnailImage}
                onUpload={(e) => handleFileUpload(e, 'thumbnailImage')}
              />
              <FileUpload
                label="Author Image"
                file={formData.userImage}
                onUpload={(e) => handleFileUpload(e, 'userImage')}
              />
            </div>
  
            {/* Blog Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <JoditEditor
                value={formData.content}
                config={editorConfig}
                onChange={handleEditorChange}
                className="rounded-lg border border-gray-300"
              />
            </div>
  
            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 bg-blue-600 text-white rounded-lg transition-all duration-200 ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
              >
                {loading ? 'Saving...' : blog ? 'Update Blog' : 'Create Blog'}
              </button>
            </div>
          </form>
        </motion.div>
      </Modal>
    );
  };
  
  const FileUpload = ({ label, file, onUpload }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-all duration-200">
      <label className="block cursor-pointer">
        <span className="block text-sm font-medium text-gray-700 mb-2">{label}</span>
        <input
          type="file"
          onChange={onUpload}
          accept="image/*"
          className="hidden"
        />
        <div className="flex justify-center items-center h-24">
          {file ? (
            <img
              src={file}
              alt="Preview"
              className="max-h-full max-w-full object-contain rounded"
            />
          ) : (
            <div className="text-center">
              <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span className="text-sm text-gray-500">Click to upload</span>
            </div>
          )}
        </div>
      </label>
    </div>
  );
  
  BlogModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    blog: PropTypes.object
  };
  
  FileUpload.propTypes = {
    label: PropTypes.string.isRequired,
    file: PropTypes.string,
    onUpload: PropTypes.func.isRequired,
  };
  
  export default BlogModal;