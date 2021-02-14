export const getSelectedWallet = (data) => {
  return data?.wallets?.find((el) => el.accountName === data.currentUser);
};
