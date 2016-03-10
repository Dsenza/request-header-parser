import React from 'react';

const CamperTableHeading = () => (

  <thead>
    <tr>
      <th>#</th>
      <th>Camper Name</th>
      <th className="recent">Points in past 30 days</th>
      <th className="alltime">All time points</th>
    </tr>
  </thead>

);

export default CamperTableHeading;