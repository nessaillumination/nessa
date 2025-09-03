import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { toast } from 'react-hot-toast';
import { deleteByType } from '../service/apiService';


export const DELETEMODELBYTYPE = {
  'PRODUCT': "PRODUCT",
  "SOLUTION": "SOLUTION",
  "TESTIMONIAL": "TESTIMONIAL",
  "PROJECT": "PROJECT",
  "BLOG": "BLOG",
  "MEDIA":"MEDIA"
};

export default function DeleteModal({ open, onClose, id, type }) {
  const [loading, setLoading] = useState(false);

  const isValidType = DELETEMODELBYTYPE.hasOwnProperty(type);



  const handleDelete = async () => {
    if (!isValidType) {
      toast.error("Invalid type for deletion.");
      onClose();
      return;
    }
    setLoading(true);
    try {
      
      await deleteByType({ _id: id, type });
      toast.success(`Successfully deleted the ${DELETEMODELBYTYPE[type] || 'item'}`);
      onClose();
    } catch (error) {
      console.log(error);
      
      toast.error("Failed to delete the item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="text-center text-xl font-bold text-red-600">
        Delete {DELETEMODELBYTYPE[type] || 'Item'}
      </DialogTitle>
      <DialogContent>
        <div className="text-center mb-4 text-lg text-gray-700">
          <p className="text-gray-600">
            Are you sure you want to delete this {DELETEMODELBYTYPE[type] || 'item'}?
          </p>
          <p className="text-gray-500">
            This action is irreversible.
          </p>
        </div>
      </DialogContent>
      <DialogActions className="justify-center space-x-4 pb-6 bg-gray-100">
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCancel}
          disabled={loading}
          className="px-6 py-2 text-sm border-blue-600 text-blue-600"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={loading}
          className="px-6 py-2 text-sm bg-red-600 text-white"
        >
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}



export const DeleteModalButton = ({ id, type ,fetchData=()=>{}}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openDeleteModal = () => {
    setModalOpen(true);
  };

  const closeDeleteModal = () => {
    setModalOpen(false);
    fetchData()
  };

  return (
    <div>
      <button
        onClick={openDeleteModal}
        className="bg-red-600 text-white p-2 rounded-md"
      >
        Delete
      </button>

      <DeleteModal
        open={modalOpen}
        onClose={closeDeleteModal}
        id={id}
        type={type}
      />
    </div>
  );
};