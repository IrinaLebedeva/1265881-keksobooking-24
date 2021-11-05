const getNounCaseByNumber = (nounNumber, caseOne, caseTwo, caseThree) => {
  const remainder100 = nounNumber % 100;
  if (remainder100 > 10 && remainder100 < 15) {
    return caseThree;
  }
  const remainder10 = nounNumber % 10;
  if (remainder10 === 1) {
    return caseOne;
  }
  if (remainder10 > 1 && remainder10 < 5) {
    return  caseTwo;
  }
  return caseThree;
};

const getNounWithPrepositionCaseByNumber = (nounNumber, caseOne, caseTwo) => {
  const remainder100 = nounNumber % 100;
  if (remainder100 === 11) {
    return caseTwo;
  }
  const remainder10 = nounNumber % 10;
  if (remainder10 === 1) {
    return caseOne;
  }
  return  caseTwo;
};

export {getNounCaseByNumber, getNounWithPrepositionCaseByNumber};
