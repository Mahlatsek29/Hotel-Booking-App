import React, { useState } from 'react';
import CircleLoader from 'react-spinners/CircleLoader';

function Loader() {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ marginTop: '150px' }}>
      <div className="sweet-loading">
        <CircleLoader
          color="#806043"
          loading={loading}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Loader;
