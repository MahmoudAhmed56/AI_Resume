import Navbar from "./Navbar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)  => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default Layout