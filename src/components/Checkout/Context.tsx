import { createContext, useContext } from "react"
import { FormikHelpers } from "formik"
import useConfirmation from "@/hooks/useConfirmation"

interface IContext {
  countDown: number
  sendCode: (phoneNumber: string) => Promise<void>
  handleResend: () => Promise<void>
  handleComplete: <
    ValuesType extends {
      code: string
    }
  >(
    values: ValuesType,
    actions: FormikHelpers<ValuesType>
  ) => Promise<void>
  confirmCode: (code: string) => Promise<void>
}

const Context = createContext({} as IContext)

const ConfirmationProvider: React.FC<{ name?: string; price?: number }> = ({
  children,
  name,
  price
}) => {
  const confirm = useConfirmation(name, price)

  return <Context.Provider value={confirm}>{children}</Context.Provider>
}

export const useConfirm = () => {
  const confirmContext = useContext(Context)

  if (!confirmContext) {
    throw new Error("useConfirmation was used outside ConfirmationProvider")
  }

  return confirmContext
}

export default ConfirmationProvider
