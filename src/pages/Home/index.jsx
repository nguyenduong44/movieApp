import Header from '../../components/Header'
import SlideShow from '../../components/SlideShow';
import Content from '../../components/Content'
import Footer from '../../components/Footer'

function Home() {
  return (
    <div className='pt-24'>
      <Header />
      <SlideShow/>
      <Content />
      <Footer />
    </div>
  );
}

export default Home;