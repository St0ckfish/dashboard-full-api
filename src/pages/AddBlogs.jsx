import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { Authurization } from '../api/Api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';


const AddBlogs = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [title, setTitle] = useState('');
    const [arabicTitle, setarabicTitle] = useState('');
    const [frenchTitle, setfrenchTitle] = useState('');
    const [content, setContent] = useState('');
    const [arabicContent, setarabicContent] = useState('');
    const [frenchContent, setfrenceContent] = useState('');
    
    const handleImageChange = (e) => {
        setSelectedImages(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = { content,arabicContent,frenchContent,title,arabicTitle, frenchTitle };

        const formData = new FormData();
        
            formData.append('post', JSON.stringify(postData));

            console.log(content,arabicContent,frenchContent,title,arabicTitle, frenchTitle);
        if (selectedImages) {
            console.log("yes")
            formData.append('image', selectedImages);
        }

        if (!selectedImages) {
            console.log("nooooooo")
        }

        try {
            const response = await axios.post('https://test.vitaparapharma.com/api/v2/content/post/new', formData, {
                headers: {
                    Authorization: `Bearer ${Authurization}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data); // Handle response from the server
                setContent("")
                setfrenceContent("")
                setarabicContent("")
                setarabicTitle("")
                setTitle("")
                setfrenchTitle("")
                setSelectedImages([])
                alert("Blog Post have been added :)")
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return ( 
        <>
        <div>
            <NavBar/>
            <div className='text-white grid justify-center items-center py-20 w-[1800px] max-[1815px]:w-[800px] max-[1563px]:w-[600px] h-screen max-[628px]:w-[200px]'>

                    <div className='bg-[#1F2937] w-[1300px] max-[1815px]:translate-y-11 p-7 items-center grid translate-y-8 max-[1815px]:translate-x-[600px] max-[1626px]:translate-x-[550px] max-[1563px]:translate-x-[620px]  max-[2000px]:translate-x-24 max-[1736px]:w-[1200px]  rounded-xl border border-[#41434d] shadow-[#2c4157] max-[1536px]:w-[1000px] shadow-2xl max-[1430px]:translate-x-[500px] max-[1306px]:translate-x-[450px] max-[1278px]:w-[900px] max-[1200px]:w-[700px] max-[1056px]:translate-x-[300px] max-[964px]:translate-x-[150px] max-[854px]:translate-x-[100px] max-[764px]:translate-x-[70px] max-[724px]:w-[500px] max-[628px]:translate-x-[210px] max-[557px]:translate-x-[160px] max-[519px]:w-[400px] max-[408px]:w-[370px] max-[467px]:translate-x-[105px] max-[392px]:translate-x-[90px]'>
                        <form className='grid justify-center  gap-6 grid-cols-1' onSubmit={handleSubmit}>
                            <div>
                                <h1 className='font-bold text-[25px]'>Add Blog Post</h1>
                            </div>

                            <div className="grid justify-center items-center gap-3 max-[1815px]:grid">

                                <input placeholder='Arabic Content' className='bg-[#2b2e38] w-[1070px] max-[1536px]:w-[900px] max-[1278px]:w-[700px] max-[1200px]:w-[500px] max-[724px]:w-[300px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                    name="arabicContent"
                                    id="arabicContent"
                                    value={arabicContent}
                                    onChange={(e) => setarabicContent(e.target.value)} required />

                                <input placeholder='English Content' className='bg-[#2b2e38] w-[1070px] max-[1536px]:w-[900px] max-[1278px]:w-[700px] max-[1200px]:w-[500px] max-[724px]:w-[300px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                    name="content"
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)} required />

                                <input placeholder='French Content' className='bg-[#2b2e38] w-[1070px] max-[1536px]:w-[900px] max-[1278px]:w-[700px] max-[1200px]:w-[500px] max-[724px]:w-[300px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                    name="frenchContent"
                                    id="frenchContent"
                                    value={frenchContent}
                                    onChange={(e) => setfrenceContent(e.target.value)} required />
                            </div>

                            <div className="grid justify-center items-center gap-3 max-[1815px]:grid">

                                <input placeholder='Arabic Title' className='bg-[#2b2e38] w-[1070px] max-[1536px]:w-[900px] max-[1278px]:w-[700px] max-[1200px]:w-[500px] max-[724px]:w-[300px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                    name="arabicTitle"
                                    id="arabicTitle"
                                    value={arabicTitle}
                                    onChange={(e) => setarabicTitle(e.target.value)} required />

                                <input placeholder='English Title' className='bg-[#2b2e38] w-[1070px] max-[1536px]:w-[900px] max-[1278px]:w-[700px] max-[1200px]:w-[500px] max-[724px]:w-[300px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                    name="title"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)} required />

                                <input placeholder='French Title' className='bg-[#2b2e38] w-[1070px] max-[1536px]:w-[900px] max-[1278px]:w-[700px] max-[1200px]:w-[500px] max-[724px]:w-[300px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                    name="frenchTitle"
                                    id="frenchTitle"
                                    value={frenchTitle}
                                    onChange={(e) => setfrenchTitle(e.target.value)} required />
                            </div>


                            <div className='flex justify-center items-center gap-3 '>
                                <label className="block mb-2 text-sm font-medium text-white translate-y-1" htmlFor="images">Upload image</label>
                                <input type="file"
                                    id="images"// Restrict file types to images
                                    onChange={handleImageChange} className=" bg-slate-700 text-black text-sm file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-[#8465F2] file:hover:bg-[#5735d1] file:text-white rounded" required accept="image/*" />
                            </div>

                            <div>
                                <input value="Add Categoty" className="w-[150px] py-2 bg-[#8465F2] rounded text-white cursor-pointer" type="submit" />
                            </div>
                        </form>
                    </div>
                </div>
        </div>
        </>
    );
}

export default AddBlogs;