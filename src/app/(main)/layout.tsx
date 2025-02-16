import Navbar from "./resumes/Navbar";

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