"use client"
import { useState,useEffect,FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import BlogSlider from '@/Components/Blogs/Blogsslider/BlogSlider';
import Header from '@/Components/Navbar/Header/Header';
import Footer from '@/Components/Navbar/Footer/Footer';

interface Blog {
  name: string;
  over: string[];
  blogs: BlogDetail[];
  products: Product[];
}
interface Product {// Adjust the type as needed
  testimage: string;
  testimagealt: string;
  _id: string;
  name: string;
  statename: string;
  amount: number;
  urllink: string;
  badge?: string;
  // ... other properties
}
interface BlogDetail {
  _id: string;
  image: string;
  imagealt: string;
  title: string;
  para: string;
  statename: string; 
  amount: number;   
  urllink: string;  
}
interface PageProps {
  params: {
      name: string;
  }
}
interface DataProps {
  products: {
    _id: string;
    testimage: string;
    testimagealt: string;
    name: string;
    statename: string;
    amount: number;
    urllink: string;
    badge?: string;
  }[];
}
const page : FC <PageProps> = ({ params })=> {
  // State to track which activity's description is expanded
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [blog, setBlog] = useState<Blog | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  const name = params.name
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`
      https://launch-api1.vercel.app/blog/${name}`);
      const data = await response.json();
      console.log("ata",data)
      setBlog(data);
    };

    if (name) {
      fetchData();
    }
  }, [name])
  const transformBlogToDataProps = (blog: Blog): DataProps => {
    return {
      products: blog.products // Directly use the products array from Blog
    };
  };
  
  return (
    <>
     <div className='bg-black w-full'>
      <Header />
     <div className="flex  pt-20">
       <div className="bg-yellow-500 w-1 h-16 mr-8 self-center"></div> 
       {blog?.name && <h1 className="text-4xl pt-10 text-white">{blog?.name}</h1>}
       <span className="text-yellow-500 text-9xl  relative" style={{top: '-0.2em'}}>.</span> 
      </div>
       <div className="ml-9">
      {blog && blog.over && blog.over.map((over, index) => (
          <p className="text-gray-300 " key={index}  >
     {over}
     </p>
      ))} 
    </div> 
  
       {/* Activity Section */}
       {/* Activity Section */}
       <div className="bg-black py-8">
  <div className="container mx-auto px-16 grid grid-cols-2 gap-5">
  {blog && blog.blogs && blog.blogs.map((blogs, index) => (
      <div key={blogs._id} className="mb-6 shadow-lg rounded-lg overflow-hidden border border-white">
        <div className="relative h-[200px]">
          <Image
            src={`https://bpu-images-v1.s3.eu-north-1.amazonaws.com/uploads/${blogs.image}`}
            alt={blogs.imagealt}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-6 bg-black">
          <h3 className="text-2xl font-bold mb-3 text-white">{blogs.title}</h3>
          <p className={`text-white mt-4 ${expandedId !== blogs._id ? 'line-clamp-2' : ''}`}>
            {blogs.para}
          </p>
          <button
            className="text-yellow-400 hover:yellow-400 transition-colors mt-4"
            onClick={() => toggleExpanded(blogs._id)}
          >
            {expandedId === blogs._id ? 'Read Less' : 'Read More'}
          </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* BlogSlider Component */}
 {blog && <BlogSlider data={transformBlogToDataProps(blog)} />}

      <Footer />
      </div> 
    </>
  );
}
export default page;