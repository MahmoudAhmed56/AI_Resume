"use client"
import { UserButton as ButtonForUser } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";

const UserButton = () => {
  return (
    <ButtonForUser appearance={{
      elements:{
        avatarBox:{
          width:35,
          height:35,
        }
      }
    }} >
      <ButtonForUser.MenuItems>
        <ButtonForUser.Link label="Billing" labelIcon={<CreditCard className="size-4"/>}
        href="/billing"
        />
      </ButtonForUser.MenuItems>
    </ButtonForUser>
  )
}

export default UserButton