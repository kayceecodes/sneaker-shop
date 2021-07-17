export const handleProgress = (
  state: boolean,
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  ms: number
) => {
  setState(true)

  /*When its done loading reveal SelectQuantity*/
  const timedSetLoading = (ms: number) =>
    new Promise((resolve) => {
      /*Give timeSetLoading a func signature and promise*/
      setTimeout(() => {
        setState(false)
        resolve('Resolved, Loading Stopped')
      }, ms)
    })
  timedSetLoading(ms).then(() => setState(false))
}
