import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";

const useSignup = () => {
    const { mutate: signup, isPending: isSignupPending } = useMutation({
        mutationFn: signupApi,
        onSuccess: () => {
            toast.success(
                "Account successfully created! Please verufy the new account from the user's email address."
            )
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return { signup, isSignupPending }
}
export default useSignup