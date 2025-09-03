import { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { createMedia, updateMedia, uploadFile } from '../../service/apiService';
import slugify from 'slugify';
import MediaTypeDropdown from '../MediaTypeDropdown';

const MediaModal = ({ open, onClose, token, media }) => {
    const initialFormState = {
        title: '',
        resource_type: '',
        slug: '',
        description: '',
        thumbnailImage: null,
        link: ''
    };

    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (media) {
            setFormData({
                title: media.title || '',
                resource_type: media.resource_type || '',
                slug: media.slug || '',
                description: media.description || '',
                thumbnailImage: media.thumbnailImage || null,
                link: media.link || ''
            });
        } else {
            setFormData(initialFormState);
        }
    }, [media]);

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

    const generateSlug = () => {
        if (!formData.title || !formData.title.trim()) {
            toast.error("Media Title is Required");
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
            { field: 'title', message: 'Media title is required' },
            { field: 'resource_type', message: 'Media type is required' },
            { field: 'slug', message: 'Slug is required' },
            { field: 'description', message: 'Description is required' },
            { field: 'thumbnailImage', message: 'Thumbnail image is required' },
            { field: 'link', message: 'Link is required' }
        ];

        for (const { field, message } of requiredFields) {
            if (!formData[field]?.trim()) {
                toast.error(message);
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        console.log(formData);
        
        try {
            const response = media 
                ? await updateMedia(token, media._id, formData)
                : await createMedia(token, formData);

            if (response.success) {
                toast.success(media ? 'Media updated successfully' : 'Media created successfully');
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
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-[900px] max-h-[90vh] overflow-y-auto scrollbar-thin"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
                    {media ? 'Edit Media Item' : 'Create New Media Item'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter media title"
                            />
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type</label>
                            <MediaTypeDropdown 
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
                                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Generate Slug
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                                rows="3"
                                placeholder="Enter media description"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Image</label>
                            <FileUpload
                                label="Upload Thumbnail"
                                file={formData.thumbnailImage}
                                onUpload={(e) => handleFileUpload(e, 'thumbnailImage')}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Link</label>
                            <input
                                type="url"
                                name="link"
                                value={formData.link}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter media link"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-6 py-3 bg-blue-600 text-white rounded-lg transition-all ${
                                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                            }`}
                        >
                            {loading ? 'Saving...' : media ? 'Update Media' : 'Create Media'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </Modal>
    );
};

const FileUpload = ({ label, file, onUpload }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-all">
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

MediaModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    media: PropTypes.object
};

FileUpload.propTypes = {
    label: PropTypes.string.isRequired,
    file: PropTypes.string,
    onUpload: PropTypes.func.isRequired,
};

export default MediaModal;