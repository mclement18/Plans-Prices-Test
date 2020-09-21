import { useState, useEffect } from 'react';
import Head from 'next/head';
import Plan from '../components/Plan';
import Select from '../components/Select';
import styles from '../styles/PlansAndPrices.module.scss';
import { cycles, currencies } from '../data/select_inputs';
import { extractPlans } from '../utils/data_fetching';

export default function PlansAndPrices() {
  const [currency, setCurrency] = useState(currencies[0].value);
  const [cycle, setCycle] = useState(cycles[0].value);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    (async () => {
      const plans = await extractPlans(currency);
      setPlans(plans);
    })();
  }, [currency]);

  const onChangeCycle = ({target: {value}}) => setCycle(value);

  const onChangeCurrency = ({target: {value}}) => setCurrency(value);

  return (
    <div className={styles.container}>
      <Head>
        <title>Plans and Prices Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Plans &amp; Prices</h1>

        <div className={styles.inputs}>
          <Select options={cycles} value={cycle} onChange={onChangeCycle} />
          <Select options={currencies} value={currency} onChange={onChangeCurrency} />
        </div>

        <div className={styles.grid}>
          {plans.map(plan => <Plan key={plan.ID} plan={plan} cycle={cycle} />)}
        </div>
      </main>
    </div>
  );
}
