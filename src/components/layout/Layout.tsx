import { Navbar, Banner, SearchBar,  Footer  } from "../../components";
interface Props {
    children: React.ReactNode;
}
const Layout = ({children}: Props) => {
    return(
        <div className="flex flex-col min-h-screen">
           <Navbar/>
           <Banner/>
           <div className="container mx-auto">
             <SearchBar/>
           </div>
           <div className="container mx-auto py-10 flex-1">
             {children}
           </div>
            <Footer />
        </div>
    );
}

export default Layout;
