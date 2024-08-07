import React, { useEffect, useState } from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';

import img1 from '../assets/banner/img1.webp';
import img1_mobile from '../assets/banner/img1_mobile.jpg';
import img2_mobile from '../assets/banner/img2_mobile.webp';
import img3_mobile from '../assets/banner/img3_mobile.jpg';
import img4_mobile from '../assets/banner/img4_mobile.jpg';
import img5_mobile from '../assets/banner/img5_mobile.png';
import img2 from '../assets/banner/img2.webp';
import img3 from '../assets/banner/img3.jpg';
import img4 from '../assets/banner/img4.jpg';
import img5 from '../assets/banner/img5.webp';

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const desktopImages = [img1, img2, img3, img4, img5];
    const mobileImages = [img1_mobile, img2_mobile, img3_mobile, img4_mobile, img5_mobile];

    const nextImage = () => {
        setCurrentImage((prev) => (desktopImages.length - 1 > prev ? prev + 1 : 0));
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev !== 0 ? prev - 1 : desktopImages.length - 1));
    };

    useEffect(() => {
        const interval = setInterval(nextImage, 4000);
        return () => clearInterval(interval);
    }, [currentImage]);

    return (
        <div className='container mx-auto px-4 rounded'>
            <div className='h-56 md:h-72 w-full bg-slate-200 relative'>
                <div className='absolute z-10 w-full h-full md:flex items-center hidden px-2'>
                    <div className='flex justify-between w-full text-2xl'>
                        <button className='bg-white shadow-md rounded-full p-1' onClick={prevImage}>
                            <FaAngleLeft />
                        </button>
                        <button className='bg-white shadow-md rounded-full p-1' onClick={nextImage}>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>

                {/* Desktop and tablet version */}
                <div className='hidden md:flex h-full w-full overflow-hidden'>
                    {desktopImages.map((imageUrl, index) => (
                        <div
                            className='w-full h-full min-w-full min-h-full transition-all'
                            key={index}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageUrl} alt={`Banner ${index + 1}`} className='w-full h-full' />
                        </div>
                    ))}
                </div>

                {/* Mobile version */}
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {mobileImages.map((imageUrl, index) => (
                        <div
                            className='w-full h-full min-w-full min-h-full transition-all'
                            key={index}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageUrl} alt={`Banner ${index + 1}`} className='w-full h-full object-cover' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerProduct;
