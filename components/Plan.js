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
          <li>{getDomainNb(plans.MaxDomains)}</li>
          {plan.Features !== 0 ? <li>{plan.Features}</li> : null}
          {plan.PrioritySupport ? <li>Priority support</li> : null}
          <li>{getVPNOption(plan.MaxVPN)}</li>
        </ul>
      </div>
      
      <footer className={styles.footer}>
        <a href={`/signup?plan=${plan.Name}&cur=${plan.Currency}`} className={styles.selection}>Select</a>
      </footer>
    </div>
  )
}
