export const sendPriceAlert = async (
  email: string,
  productName: string,
  oldPrice: number,
  newPrice: number,
): Promise<void> => {
  const message = `PRICE DROP DETECTED for ${productName}: ${oldPrice} -> ${newPrice}`;

  // Placeholder email implementation
  if (email) {
    console.log(`${message} (notification sent to ${email})`);
  } else {
    console.log(message);
  }
};

