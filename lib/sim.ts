import { logNormInv, mod } from "./math";

export interface IRiskScenario {
  uid: number
  p: number
  lb: number
  ub: number
}

export interface IResult {
  trialId: number
  losses: number
}

const ENTITY_ID = 0;
const MAX_LOSS = 25e6;

const sumReduce = (total: number, n: number) => total + n;

export function runSimulation(risks: IRiskScenario[], n: number): IResult[] {
  const trials: number[] = new Array(n).fill(0).map((_, i) => i + 1);
  const results = trials.map(trialId => ({
    trialId,
    losses: risks
      .map(risk => simulateLoss(risk, trialId))
      .reduce(sumReduce, 0)
  }));

  return results;
}

function simulateLoss(risk: IRiskScenario, trialId: number) {
  const randomProbability = getRandom(trialId, ENTITY_ID, risk.uid);
  const happened = randomProbability < risk.p;
  const loss = happened ? calculateLoss(randomProbability, risk.lb, risk.ub) : 0;

  return loss;
}

// =if(rand() < P), lognorm.inv( rand(), (ln(UB)+ln(LB)/2), (ln(UB)-ln(LB)/3.29), 0)
function calculateLoss(p: number, lb: number, ub: number,) {
  const median = (Math.log(ub) + Math.log(lb)) / 2;
  const standardDeviation = (Math.log(ub) - Math.log(lb)) / 3.29;

  const loss = logNormInv(p, median, standardDeviation);

  return Math.min(MAX_LOSS, loss);
}

// =( MOD(( MOD( MOD( 999999999999989, MOD( trialId*2499997 + (varId)*1800451 + (entityId)*2000371 + (timeId)*1796777 + (agentId)*2299603, 7450589 ) * 4658 + 7450581 ) * 383, 99991 ) * 7440893 + MOD( MOD( 999999999999989, MOD( trialId*2246527 + (varId)*2399993 + (entityId)*2100869 + (timeId)*1918303 + (agentId)*1624729, 7450987 ) * 7580 + 7560584 ) * 17669, 7440893 )) * 1343, 4294967296 ) + 0.5 ) / 4294967296
function getRandom(trialId: number, entityId: number, varId: number, timeId = 0, agentId = 0): number {
  const n1 = (trialId) * 2499997 + (varId) * 1800451 + (entityId) * 2000371 + (timeId) * 1796777 + (agentId) * 2299603;
  const n2 = (trialId) * 2246527 + (varId) * 2399993 + (entityId) * 2100869 + (timeId) * 1918303 + (agentId) * 1624729;
  return (mod((mod(
    mod(999999999999989, mod(n1, 7450589) * 4658 + 7450581) * 383, 99991) * 7440893 +
    mod(mod(999999999999989, mod(n2, 7450987) * 7580 + 7560584) * 17669, 7440893)
  ) * 1343, 4294967296) + 0.5) / 4294967296
}
