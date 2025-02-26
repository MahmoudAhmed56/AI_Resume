"use client";
import { UserButton as ButtonForUser } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const UserButton = () => {
  const { theme } = useTheme();
  return (
    <ButtonForUser
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        elements: {
          avatarBox: {
            width: 35,
            height: 35,
          },
        },
      }}
    >
      <ButtonForUser.MenuItems>
        <ButtonForUser.Link
          label="Billing"
          labelIcon={<CreditCard className="size-4" />}
          href="/billing"
        />
      </ButtonForUser.MenuItems>
    </ButtonForUser>
  );
};

export default UserButton;
