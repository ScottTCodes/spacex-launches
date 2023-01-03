import React from 'react';
import Image from 'next/image';
import styles from './LaunchCard.module.css';

import { Launch } from '../../types/launch';

import formatDate from '../../utils/formatDate';

const LaunchCard = ({ launch }: { launch: Launch }) => {
  const success = launch.launch_success;

  return (
    <div data-cy-id={launch.flight_number} className={styles.card}>
      <div className={styles.image}>
        <Image src={launch.links?.mission_patch_small} width={100} height={100} />
      </div>
      <div>
        <div>
          <h2 className={styles.title}>{launch.mission_name}</h2>
          <time dateTime={launch.launch_date_utc}>{formatDate(launch.launch_date_utc)}</time>
        </div>
        <span data-cy-id='launch-status' className={success ? styles.success : styles.fail}>
          {success ? 'Success' : 'Failure'}
        </span>
        {launch?.launch_failure_details && <div data-cy-id='failure-details'>{launch.launch_failure_details?.reason}</div>}
      </div>
      <div>
        <h3>Core</h3>
        <p>{launch.rocket.first_stage.cores[0].core_serial}</p>
        <h3>Payloads</h3>
        {launch.rocket.second_stage.payloads.map(payload => (
          <div key={payload.payload_id}>
            <p>
              {payload.payload_type}: {payload.payload_id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaunchCard;
