const formatString = (templateString, ...args) =>
  args.reduce((resultString, currentArg, currentArgIndex) => resultString.replace(`$${currentArgIndex}`, currentArg), templateString);

export {formatString};
