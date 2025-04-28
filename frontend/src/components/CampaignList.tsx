import { useEffect, useState } from 'react';
import { getCampaigns, deleteCampaign } from '../services/api';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import DeleteCampaign from './DeleteCampaign';
import AddCampaign from './AddCampaign';

interface Campaign {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  clicks: number;
  cost: number;
  revenue: number;
  profit: number;
}

const CampaignList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({
    key: 'name',
    direction: 'asc',
  });

  // localStorage
  const loadCampaignsFromStorage = () => {
    const storedCampaigns = localStorage.getItem('campaigns');
    if (storedCampaigns) {
      setCampaigns(JSON.parse(storedCampaigns));
    }
  };

  const saveCampaignsToStorage = (campaigns: Campaign[]) => {
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
  };

  const fetchCampaigns = async () => {
    try {
      const data = await getCampaigns();
      setCampaigns(data);
      saveCampaignsToStorage(data); 
    } catch (err) {
      console.error('Failed to load campaigns.');
      loadCampaignsFromStorage(); 
    }
  };

  const handleDelete = async (id: number) => {
    await deleteCampaign(id);
    fetchCampaigns(); 
    setShowDeleteModal(false);
  };

  const sortCampaigns = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedCampaigns = [...campaigns].sort((a, b) => {
      if (key === 'start_date' || key === 'end_date') {
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return direction === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      }

      if (key === 'profit') {
        const profitA = a.profit;
        const profitB = b.profit;
        return direction === 'asc' ? profitA - profitB : profitB - profitA;
      }

      // Default: sort by string (name)
      const aValue = a[key as keyof Campaign];
      const bValue = b[key as keyof Campaign];
      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setCampaigns(sortedCampaigns);
    saveCampaignsToStorage(sortedCampaigns); 
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <Container className="py-4">
      <Row className="align-items-center mb-4">
        <Col><h2>Campaigns</h2></Col>
        <Col className="text-end">
          <AddCampaign refreshCampaigns={fetchCampaigns} />
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th onClick={() => sortCampaigns('name')}>
              Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => sortCampaigns('start_date')}>
              Start Date {sortConfig.key === 'start_date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => sortCampaigns('end_date')}>
              End Date {sortConfig.key === 'end_date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => sortCampaigns('clicks')}>
              Clicks {sortConfig.key === 'clicks' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => sortCampaigns('cost')}>
              Cost {sortConfig.key === 'cost' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => sortCampaigns('revenue')}>
              Revenue {sortConfig.key === 'revenue' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => sortCampaigns('profit')}>
              Profit {sortConfig.key === 'profit' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id}>
              <td>{campaign.name}</td>
              <td>{campaign.start_date}</td>
              <td>{campaign.end_date}</td>
              <td>{campaign.clicks}</td>
              <td>${campaign.cost.toFixed(2)}</td>
              <td>${campaign.revenue.toFixed(2)}</td>
              <td>${campaign.profit.toFixed(2)}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => { setSelectedCampaign(campaign); setShowDeleteModal(true); }}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedCampaign && (
        <DeleteCampaign
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          campaign={selectedCampaign}
          onDelete={handleDelete}
        />
      )}
    </Container>
  );
};

export default CampaignList;
