/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import { Launch } from '../types/launch';

import fetchLaunch from './api/fetchLaunch';
import LaunchGrid from '../components/LaunchGrid';
import Logo from '../public/spacex.svg';



export default function Home() {
  const [page, setPage] = useState<number>(0);
  const [launchData, setLaunchData] = useState<Launch[]>([]);
  const [error, setError] = useState<boolean>(false);

  
  const fetchData = async () => {
    const launches = await fetchLaunch(0);

    if (launches instanceof Error) {
      setError(true);
    } else {
      setLaunchData(launches);
    }
  };

  if (launchData.length === 0) {
    fetchData();
  }

  const loadMore = useCallback(() => {
    let previousPage = page;
    setPage(previousPage += 1);
  }, [page]);

  useEffect(() => {
    if (page !== 0) {
      const fetchData = async () => {
        const previousLaunchData = launchData;
        const launches = await fetchLaunch(page);

        if (launches instanceof Error) {
          setError(true);
        } else {
          setLaunchData([...previousLaunchData, ...launches]);
        }
      };

      fetchData();
    }
  }, [page]);

  return (
    <div className={styles.container}>
      <Head>
        <title>SpaceX Launches</title>
        <meta name='description' content='A website showing the launches from SpaceX' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className={styles.header}>
        <Logo />
        <h1>Launches</h1>
      </header>
      <main className={styles.main}>
        {!error ? (<LaunchGrid launches={launchData} />) : (<h2 className={styles.error}>Sorry we can&apos;t seem to find any launch information at this time.</h2>)}
      </main>
      {!error && (<div className={styles.buttonWrap}>
        <button data-cy-id='load-more' className={styles.loadmore} type="submit" onClick={() => loadMore()}>Load more</button>
      </div>)}
    </div>
  );
}
