import Navbar from '@/components/Navbar';
import AccountManagement from '../components/AccountManagement';


export default function ProfilePage() {
  return (
    <div>
        <Navbar/>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <AccountManagement />
    </div>
  );
}
