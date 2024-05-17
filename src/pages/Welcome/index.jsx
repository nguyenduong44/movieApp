import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-lime-950 to-black">
        <div className="text-center p-8 bg-white bg-opacity-50 rounded-lg shadow-lg">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to our app</h1>
          <p className="text-xl text-gray-700">We are glad to have you here!</p>
          <Link to={'/'}
            className="text-white text-xl underline underline-offset-8
              hover:text-primary
            "
          >Go to Homepage</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Welcome;