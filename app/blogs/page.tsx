"use client"
import Head from 'next/head';
import Footer from '@/Components/Navbar/Footer/Footer';
import Header from '@/Components/Navbar/Header/Header';
import { useState,useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Placeholder data for page 2
interface BlogDetail {
  _id: string;     
  image: string;   
  imagealt: string; 
  title: string;   
  para: string;   
}

interface BlogItem {
  _id: string;      
  name: string;      
  urllink: string;   
  over: string[];    
  blogs: BlogDetail[]; 
  createdAt?: Date;  
  author?: string;   
}
const Page = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://launch-api1.vercel.app/blog');
      const data = await response.json();
      console.log("ata",data)
      setBlogs(data.data);
    };

      fetchData();
    
  }, [])
  const totalCards = blogs.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);
  
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = currentPage * cardsPerPage;
  const currentCards = blogs.slice(startIndex, endIndex);

  const goToPage = (pageNumber:number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="p-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center pt-8 mb-8">
            <div className="bg-yellow-500 w-1 h-16 mr-8"></div>
            <h1 className="text-7xl font-bold">Blogs</h1>
            <span className="text-yellow-500 text-9xl" style={{ top: '-0.2em' }}>.</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {Array.isArray(currentCards) &&  currentCards.map((blog, index) => (
              <Link href={`/blogs/${blog.urllink}`} >
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden h-[300px] shadow-lg">
                    <div>
                <div className="w-full h-48 relative">
                  <Image  src={`https://bpu-images-v1.s3.eu-north-1.amazonaws.com/uploads/${blog.blogs[0].image}`} alt={ blog.blogs[0].imagealt }      layout="fill"
        objectFit="cover"/>
</div>
                <div className="p-4">
                  <h2 className="font-bold text-lg mb-2">{blog.name}</h2>
                </div>
                </div>
              </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center space-x-4">
            {[...Array(totalPages)].map((_, pageNumber) => (
              <button
                key={pageNumber + 1}
                className={`px-4 py-2 border ${
                  currentPage === pageNumber + 1 ? 'bg-yellow-500 text-white' : 'bg-gray-700 text-yellow-500'
                }`}
                onClick={() => goToPage(pageNumber + 1)}
              >
                {pageNumber + 1}
              </button>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default Page;