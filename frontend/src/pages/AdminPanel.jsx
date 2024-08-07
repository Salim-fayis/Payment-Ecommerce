import React, { useEffect } from 'react';
import { FaUser } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
  const user = useSelector(state => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user || user.role !== ROLE.ADMIN) {
    return null;
  }

  return (
    <div className='min-h-[calc(100vh-150px)] md:flex hidden '>
      <aside className='bg-white w-full min-h-full max-w-60 customShadow'>
        <div className='h-32 flex justify-center items-center flex-col'>
          <div className='text-5xl cursor-pointer relative flex justify-center '>
            {user?.profilePicture ? (
              <img src={user?.profilePicture} alt={user?.name} className="mt-10 w-20 h-15 rounded-full object-cover" />
            ) : (
              <FaUser />
            )}
          </div>
          <p className='capitalize text-lg font-semibold'>{user?.name}</p>
          <p className='text-sm'>{user?.role}</p>
        </div>
        {/* navigation */}
        <div>
          <nav className='grid p-4'>
            <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100 ">All Users</Link>
            <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">All Products</Link>
            <Link to={"all-order"} className="px-2 py-1 hover:bg-slate-100">All Order</Link>
          </nav>
        </div>
      </aside>
      <main className='w-full h-full p-2'>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
