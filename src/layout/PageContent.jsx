import Footer from "./Footer";
import Header from "./Header";
function PageContent({children}) {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}
export default PageContent;