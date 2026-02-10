import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useUser from "./features/authentication/useUser";
import { useQuery } from "@tanstack/react-query";
import { getUserMenus } from "./services/apiMenu";
import generateRoute from "./utils/generateRoute";
import Spinner from "./ui/Spinner";
function App() {
  const { user, isLoading: isLoadingUser } = useUser()
  const { data: menus, isLoading: isLoadingMenus } = useQuery({
    queryKey: ['menus'],
    queryFn: () => getUserMenus(user!.id),
    enabled: !!user?.id,

  })

  const routes = generateRoute(menus ?? [])
  const router = createBrowserRouter(routes)
  if (isLoadingUser || isLoadingMenus) return <Spinner />;
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster position='top-center' gutter={12} containerStyle={{ margin: '8px' }} toastOptions={{
        success: {
          duration: 3000,
        }, error: { duration: 5000 }, style: { fontSize: '16px', maxWidth: '500px', padding: '24px', backgroundColor: '#fff', color: 'var(-color-gray-700)' }
      }} />
    </>
  )
}
export default App;