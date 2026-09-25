// The arithmetic behind /calculator.
//
// Deliberately simple and conservative: one task, the hours it takes, and what
// those hours cost. No made-up productivity multipliers, no "efficiency gains".
// A number an owner can check in their head is worth more than an accurate one
// they do not believe.

export type SavingsInput = {
  /** Hours the task takes each week, across everyone who touches it. */
  hoursPerWeek: number;
  /** How many people are involved in it. */
  people: number;
  /** Average monthly cost of one of those people, in rupees. */
  monthlySalary: number;
  /** What the automation would cost to build, in rupees. */
  buildCost: number;
};

export type SavingsResult = {
  hourlyCost: number;
  hoursPerYear: number;
  yearlyCost: number;
  /** Months to pay back the build, or null if the task costs nothing. */
  paybackMonths: number | null;
  /** Working days a year handed back to the team. */
  daysPerYear: number;
  /** Deliberately pessimistic: assume only 70% of the job actually goes away. */
  conservativeYearly: number;
};

/** A standard Indian working month: 22 days, 8 hours. */
export const WORKING_HOURS_PER_MONTH = 22 * 8;
const WEEKS_PER_YEAR = 52;
/** Almost nothing is automated to zero. This is the share that realistically goes. */
export const AUTOMATED_SHARE = 0.7;

export function computeSavings({
  hoursPerWeek,
  people,
  monthlySalary,
  buildCost,
}: SavingsInput): SavingsResult {
  const hourlyCost = monthlySalary / WORKING_HOURS_PER_MONTH;
  const hoursPerYear = hoursPerWeek * people * WEEKS_PER_YEAR;
  const yearlyCost = hoursPerYear * hourlyCost;
  const conservativeYearly = yearlyCost * AUTOMATED_SHARE;
  const monthlySaving = conservativeYearly / 12;

  return {
    hourlyCost,
    hoursPerYear,
    yearlyCost,
    conservativeYearly,
    daysPerYear: hoursPerYear / 8,
    paybackMonths: monthlySaving > 0 ? buildCost / monthlySaving : null,
  };
}

/** A plain-language verdict, so the page says what the numbers mean. */
export function verdict(result: SavingsResult): string {
  const m = result.paybackMonths;
  if (m === null) return "Put some numbers in and this will tell you whether it is worth automating.";
  if (m <= 3) return "This pays for itself in under a quarter. It is the kind of job worth doing first.";
  if (m <= 12) return "This pays for itself inside a year, which is the usual test for whether a build is worth it.";
  if (m <= 24) return "This takes over a year to pay back. Worth doing if the job is also error-prone or miserable, otherwise there is probably a better candidate.";
  return "On these numbers, automating this is hard to justify. Either the task is small, or the real cost is somewhere else — errors, delays, or the person you would lose if they kept doing it.";
}
