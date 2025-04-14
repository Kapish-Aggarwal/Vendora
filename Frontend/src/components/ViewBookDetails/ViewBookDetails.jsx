import React, { useEffect, useState } from 'react'
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import Loader from '../Loader/Loader';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

const ViewBookDetails = () => {
    const { id } = useParams();
    const [Data, setData] = useState();
    const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn); 
    const role = useSelector((state)=> state.auth.role);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(`http://localhost:3001/api/v1/get-book-by-id/${id}`);
            setData(response.data.data);
        };
        fetch();
    }, []);
    return (
        <>
            {Data && (
                <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start">
                    <div className="w-full lg:w-3/6">
                        {" "}
                        <div className='flex flex-col lg:flex-row justify-around bg-zinc-800 p-12' rounded>
                            {" "}
                            <img src={Data.url} alt="/" className='h-[50vh] md:h-[60vh] lg:h-[70vh] rounded' />
                            {isLoggedIn === true && role=== "user" && (
                                <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0'>
                                <button className='bg-white rounded-full text-3xl p-3 mt-8 lg:mt-8 text-red-600 flex items-center justify-center'>
                                    <FaHeart />
                                    <span className='ms-4 block lg:hidden'>Favourites</span></button>
                                <button className='text-white rounded-full text-3xl p-3 mt-8 lg:mt-8 bg-blue-600 flex items-center justify-center'>
                                    <FaShoppingCart />
                                     <span className='ms-4 block lg:hidden'>Add to cart</span></button>
                            </div>
                            )}
                            {isLoggedIn === true && role=== "admin" && (
                                <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0'>
                                <button className='bg-white rounded-full text-3xl p-3 mt-8 lg:mt-8flex items-center justify-center'>
                                <FaEdit />
                                    <span className='ms-4 block lg:hidden'>Edit Book</span></button>
                                <button className='text-red-500 rounded-full text-3xl p-3 mt-8 lg:mt-8 bg-white flex items-center justify-center'>
                                <MdOutlineDelete />
                                     <span className='ms-4 block lg:hidden'>Delete Book</span></button>
                            </div>
                            )}
                        </div>
                    </div>
                    <div className="p-4 w-full lg:w-3/6">
                        <h1 className="text-4xl text-zinc-300 font-semibold">{Data.title}</h1>
                        <p className="text-zinc-400 mt-1">by {Data.author}</p>
                        <p className="text-zinc-500 mt-4 text-xl">{Data.description}</p>
                        <p className="flex mt-4 items-center justify-start text-zinc-400">
                            <GrLanguage className="me-3" /> {Data.language}
                        </p>
                        <p className="mt-4text-zinc-100 text-3xl font-semibold">
                            Price: ₹{Data.price}{""}
                        </p>
                    </div>
                    <div className="p-4"></div>
                </div>)}
            {!Data && <div className='h-screen bg-zinc-900 flex items-center justify-center'><Loader /></div>}
        </>
    );
};
export default ViewBookDetails;