import styles from '../styles/Plan.module.scss';
import {
  monthlyPrice,
  annualPrice,
  getUserNb,
  byteSizeToHumanRedable,
  perUser,
  pluralize,
  getDomainNb,
  getVPNOption,
  currencySymbol
} from '../utils/data_parsing';
import PropsTypes from 'prop-types';

export default function Plan({plan, cycle}) {
  return (
    <div className={styles.card}>
      <header className={styles.header}>
        {plan.MostPopular ? <span className={styles.popular}>Most Popular</span> : null}

        <h3>{plan.Name}</h3>
        
        <div className={styles.price}>
          <p className={styles.monthly}>{currencySymbol(plan.Currency)} <span>{monthlyPrice(plan.Pricing, cycle)}</span>/mo</p>
          <p className={styles.annually}>Billed as {currencySymbol(plan.Currency) + annualPrice(plan.Pricing, cycle)} per year</p>
        </div>
      </header>

      <div className={styles.content}>
        <p className={styles.description}>{plan.Description}</p>

        <ul className={styles.details}>
          <li>{getUserNb(plan.MaxMembers, plan.MultiUser)}</li>
          <li>{byteSizeToHumanRedable(plan.MaxSpace)} storage{perUser(plan.MultiUser)}</li>
          <li>{pluralize(plan.MaxAddresses, 'address')}{perUser(plan.MultiUser)}</li>
          <li>{getDomainNb(plan.MaxDomains)}</li>
          {plan.Features !== 0 ? <li>{plan.Features}</li> : null}
          {plan.PrioritySupport ? <li>Priority support</li> : null}
          <li>{getVPNOption(plan.MaxVPN)}</li>
        </ul>
      </div>
      
      <footer className={styles.footer}>
        <a href={`/signup?plan=${plan.Name}&cur=${plan.Currency}`} className={styles.selection}>Select</a>
      </footer>
    </div>
  );
}

Plan.propTypes = {
  cycle: PropsTypes.number.isRequired,
  plan: PropsTypes.shape({
    Currency: PropsTypes.string,
    ID: PropsTypes.string,
    MaxAddresses: PropsTypes.number,
    MaxDomains: PropsTypes.number,
    MaxMembers: PropsTypes.number,
    MaxSpace: PropsTypes.number,
    MaxVPN: PropsTypes.number,
    Name: PropsTypes.number,
    Pricing: PropsTypes.oneOfType([
      PropsTypes.number,
      PropsTypes.shape({
        1: PropsTypes.number,
        12: PropsTypes.number,
        24: PropsTypes.number
      })
    ]),
    Description: PropsTypes.number,
    Features: PropsTypes.oneOfType([
      PropsTypes.number,
      PropsTypes.string
    ]),
    PrioritySupport: PropsTypes.bool,
    MostPopular: PropsTypes.bool,
    MultiUser: PropsTypes.number
  }).isRequired
};
