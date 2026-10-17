import Hero from '../components/Hero';
import Feature from '../components/Feature';
import Categories from '../components/Categories';

function Dashboard() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Hero />
      <Feature />
      <Categories />
    </div>
  );
}

export default Dashboard;
