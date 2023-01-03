import React from 'react';
import styles from './LaunchGrid.module.css';

import LaunchCard from '../LaunchCard';

import { Launch } from '../../types/launch';

function LaunchGrid({ launches }: { launches: Launch[] }) {
  return (
    <div data-cy-id='launch-grid' className={styles.grid}>
      {launches.map(launch => (
        <LaunchCard key={launch.flight_number} launch={launch} />
      ))}
    </div>
  );
}

export default LaunchGrid;
