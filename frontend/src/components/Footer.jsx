import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-slate-100 text-black  ">
      <div className="container mx-auto p-4">
        <p className='text-center sm:font-semibold'>
          &copy; {new Date().getFullYear()} Clone Community. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
