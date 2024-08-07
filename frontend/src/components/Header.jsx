import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { GrSearch } from "react-icons/gr";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import SummarApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const SearchBar = ({ handleSearch, search }) => (
  <div className='hidden lg:flex items-center w-full max-w-sm border rounded-full focus-within:shadow-lg pl-2 bg-white'>
    <input type="text" placeholder='Search Products here...' className='w-full outline-none' onChange={handleSearch} value={search} />
    <div className='text-xl min-w-[50px] h-8 bg-red-400 flex items-center justify-center rounded-r-full'>
      <GrSearch />
    </div>
  </div>
);

const UserMenu = ({ user, handleLogout, menuDisplay, setMenuDisplay, cartProductCount }) => (
  <div className='flex items-center gap-7'>
    <div className='relative flex justify-center'>
      {
        user?._id && (
          <div className='text-2xl cursor-pointer' onClick={() => setMenuDisplay(prev => !prev)}>
            {user?.profilePicture ? (
              <img src={user?.profilePicture} alt={user?.name} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <FaUser />
            )}
          </div>
        )
      }

      {
        menuDisplay && (
          <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
            <nav>
              {
                user?.role === ROLE.ADMIN && (
                  <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                )
              }

              <Link to={'/order'} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Order</Link>
            </nav>
          </div>
        )
      }

    </div>
    {
      user?._id && (
        <Link to={"cart"} className='text-2xl cursor-pointer relative'>
          <FaShoppingCart />
          <div className='bg-gray-600 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-4 left-4'>
            <p className='text-xs'>{cartProductCount}</p>
          </div>
        </Link>
      )
    }



    <div>
      {user?._id ? (
        <button onClick={handleLogout} className="px-3 py-2 rounded-full text-white bg-red-500 hover:bg-red-700">Logout</button>
      ) : (
        <Link to={'/login'} className='px-3 py-2 rounded-full text-white bg-red-500 hover:bg-red-700'>Login</Link>
      )}
    </div>
  </div>
);

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery);

  const [menuDisplay, setMenuDisplay] = useState(false);

  const { cartProductCount } = useContext(Context);

  const handleLogout = async () => {
    setMenuDisplay(false)
    const fetchData = await fetch(SummarApi.logOut_user.url, {
      method: SummarApi.logOut_user.method,
      credentials: "include"
    });

    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }
    if (data.error) {
      toast.error(data.message);
    }
  }

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate('/search');
    }
  }

  return (
    <header className='w-full shadow-md py-4 bg-white fixed z-40'>
      <div className="container mx-auto flex items-center justify-between">
        <div className='w-10'>
          <Link to='/'>
            <Logo w={50} h={50} />
          </Link>
        </div>

        <SearchBar
          handleSearch={handleSearch}
          search={search}
        />

        <UserMenu
          user={user}
          handleLogout={handleLogout}
          menuDisplay={menuDisplay}
          setMenuDisplay={setMenuDisplay}
          cartProductCount={cartProductCount}
        />
      </div>
    </header>
  );
};

export default Header;
