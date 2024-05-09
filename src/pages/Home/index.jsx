import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Content from '../../components/Content';
import SlideShow from '../../components/SlideShow';

function Home() {
  return (
    <div className='pt-24'>
        <Header />
        <SlideShow />
        <Content />
        <Footer />
    </div>
  );
}

export default Home;