import { useQueryClient } from "@tanstack/react-query";
import Button from "../../ui/Button";
import useCheckout from "../check-in-out/useCheckout";

function CheckoutButton({ bookingId }) {
    const queryClient = useQueryClient()
    const { checkout, isCheckingOut } = useCheckout();
    console.log(bookingId, 'bookingId')
    return (
        <Button
            variation="primary"
            size="small"
            onClick={() => checkout({ bookingId }, {
                onSettled: () => {
                    queryClient.invalidateQueries({ queryKey: ['today-activity'] })
                }
            })}
            disabled={isCheckingOut}
        >
            Check out
        </Button>
    );
}

export default CheckoutButton;
