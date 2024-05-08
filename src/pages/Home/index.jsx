import { Suspense, lazy} from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Content = lazy(() => import('../../components/Content'));
const SlideShow = lazy(() => import('../../components/SlideShow'));

function Home() {


  return (
    <div className='pt-24'>
        <Header />

        <Suspense fallback={<div>Loading...</div>}>
          <SlideShow />
          <Content />
        </Suspense>

        <Footer />
    </div>
  );
}

export default Home;