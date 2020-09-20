import { freePlan } from '../data/free_plan';
import { additionalInfo } from '../data/additional_info';

export const requestPlans = async (currency = 'EUR') => {
  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'application/json;charset=utf-8');
  myHeaders.append('x-pm-appversion', 'Other');
  myHeaders.append('x-pm-apiversion', '3');
  myHeaders.append('Accept', 'application/vnd.protonmail.v1+json');

  const myInit = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default'
  };

  const response = await fetch(`https://api.protonmail.ch/payments/plans?Currency=${currency}`, myInit)
  const result = await response.json();

  return result.Plans;
};

export const extractPlans = async (plans = ['plus', 'professional', 'visionary'], currency = 'EUR') => {
  const allPlans = await requestPlans(currency);

  const selectedPlans = [freePlan, ...allPlans.filter(plan => plans.includes(plan.Name))];

  return selectedPlans.map(plan => {return {...plan, ...additionalInfo[plan.Name]}});
};
