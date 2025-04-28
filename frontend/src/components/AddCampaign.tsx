import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { createCampaign } from '../services/api';

interface AddCampaignProps {
  refreshCampaigns: () => void;
}

const AddCampaign: React.FC<AddCampaignProps> = ({ refreshCampaigns }) => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      start_date: '',
      end_date: '',
      clicks: '',
      cost: '',
      revenue: '',
    });
  
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async () => {
        console.log('hice click')
      await createCampaign({
        ...formData,
        clicks: parseInt(formData.clicks),
        cost: parseFloat(formData.cost),
        revenue: parseFloat(formData.revenue),
      });
      refreshCampaigns();
      handleClose();
    };
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Add Campaign
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Campaign</Modal.Title>
          </Modal.Header>
  
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" onChange={handleChange} />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" name="start_date" onChange={handleChange} />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formEndDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" name="end_date" onChange={handleChange} />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formClicks">
                <Form.Label>Clicks</Form.Label>
                <Form.Control type="number" name="clicks" onChange={handleChange} />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formCost">
                <Form.Label>Cost</Form.Label>
                <Form.Control type="number" step="0.01" name="cost" onChange={handleChange} />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formRevenue">
                <Form.Label>Revenue</Form.Label>
                <Form.Control type="number" step="0.01" name="revenue" onChange={handleChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
  
          <Modal.Footer>
            <Button variant="success" onClick={handleSubmit}>
              Save
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  
  export default AddCampaign;