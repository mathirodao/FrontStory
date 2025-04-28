import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface DeleteCampaignProps {
  show: boolean;
  handleClose: () => void;
  campaign: Campaign;
  onDelete: (id: number) => void;
}

const DeleteCampaign: React.FC<DeleteCampaignProps> = ({ show, handleClose, campaign, onDelete }) => {
  const handleDelete = () => {
    onDelete(campaign.id);  
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete the campaign "{campaign.name}"?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCampaign;
