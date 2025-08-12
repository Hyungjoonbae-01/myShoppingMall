const randomStringGenerator = () => {
  const prefix = "ORD";
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${randomPart}`;
};

module.exports = randomStringGenerator;
