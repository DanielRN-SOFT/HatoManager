import Footer from "./EcommercePartials/Footer";
import TopNavBar from "./EcommercePartials/TopNavBar";


export default function EcommerceLayout({ children }) {
    return (
        <>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            />

            <div className="flex min-h-screen flex-col bg-background text-on-background">
                <TopNavBar />

                <main className="flex-1 pt-16">{children}</main>

                <Footer />
            </div>
        </>
    );
}
