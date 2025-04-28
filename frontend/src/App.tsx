import React from "react";
import CampaignList from "./components/CampaignList";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container className="py-4">
      <h1>Dashboard - FrontStory</h1>
      <CampaignList />
    </Container>
  );
}

export default App;
