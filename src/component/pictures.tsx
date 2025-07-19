import React from 'react';
import Image from 'next/image';

const imagePaths = [
  '/updated/one-u.png',
  '/updated/two.jpeg',
  '/updated/three-u.png',
  '/updated/four-u.png',
];

const Pictures = () => {
  return (
    <div className="max-w-[1300px] mx-auto px-0 py-6" >
      <div className="flex flex-wrap gap-4 justify-center">
        {imagePaths.map((src, index) => (
          <div
            key={index}
            className="relative w-full sm:w-[48%] md:w-[23%] aspect-[4/4] overflow-hidden rounded-lg shadow-md"
          >
            <Image
              src={src}
              alt={`Picture ${index + 1}`}
              fill
              className=" object-top"
              style={{width:'100%', height:'100%'}}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pictures;
