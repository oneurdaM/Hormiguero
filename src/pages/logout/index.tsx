'use client'
import { useRouter } from "next/navigation";

import { useLogoutMutation } from "@/data/user";
import Loader from "@/components/ui/loader/loader";

function Logout() {
  const router = useRouter()
  const { isSuccess } = useLogoutMutation();

    if (isSuccess) {
      router.replace('/')
    }

  return <Loader text='Cerrando sesión' />;
}

export default Logout;
