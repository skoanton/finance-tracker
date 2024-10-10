import { getAccountByName } from "@/services/api/accountService";

export const checkAccountExists = async (accountName: string): Promise<boolean> => {
  const account = await getAccountByName(accountName);

  if (account) {
    return true;
  } else {
    return false;
  }
};
