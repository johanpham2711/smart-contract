export const formatAccountAddress = (
  account: string,
  configFormat: { beforeSlice: number; afterSlice: number } = { beforeSlice: 5, afterSlice: 5 }
) => {
  if (account)
    return `${account.slice(0, configFormat?.beforeSlice)}...${account.slice(
      account.length - configFormat.afterSlice,
      account.length
    )}`
}
