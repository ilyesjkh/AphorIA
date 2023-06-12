import Auth from '../components/Auth';
import Navbar from '../components/Navbar';

export default function AuthenticationPage() {
  return (
    <div>
        <Navbar/>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
             <Auth />
        </div>
    </div>
  );
}
