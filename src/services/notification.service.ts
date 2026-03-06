export const sendPriceDropNotification = async (
  email: string | undefined,
  productName: string,
  oldPrice: number,
  newPrice: number,
): Promise<void> => {
  const message = `PRICE DROP DETECTED for ${productName}: ${oldPrice} -> ${newPrice}`;

  if (email) {
    // In a real application you would send an email here.
    console.log(`${message} (notification sent to ${email})`);
  } else {
    console.log(message);
  }
};

