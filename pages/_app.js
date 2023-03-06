import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Modals from "../components/Modals";
import StateContextProvider from "../globalState/state.context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <ErrorBoundary>
        <StateContextProvider>
          <div style={{ minHeight: "100vh" }}>
            <Header />
            <Component {...pageProps} />
          </div>
          <Footer />
          <Modals />
        </StateContextProvider>
      </ErrorBoundary>
    </div>
  );
}

export default MyApp;
