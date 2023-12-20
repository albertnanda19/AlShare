"use client"
import React, { useState } from 'react'
import UploadForm from './_components/UploadForm'
// import { app } from '../../../../utils/firebaseConfig'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDCfsq1_QkzIiTsPumR5-alVys-et2wEfg",
    authDomain: "alshare-52da0.firebaseapp.com",
    projectId: "alshare-52da0",
    storageBucket: "alshare-52da0.appspot.com",
    messagingSenderId: "1058041825735",
    appId: "1:1058041825735:web:4e8234f629e5e51f2031e2",
    measurementId: "G-20W4C4H392"
};

const app = initializeApp(firebaseConfig);

const Upload = () => {

    const [progress, setProgress] = useState();

    const storage = getStorage(app)

    const uploadFile = (file) => {
        const metadata = {
            contentType: file.type
        };
        const storageRef = ref(storage, 'file-upload/' + file?.name);
        const uploadTask = uploadBytesResumable(storageRef, file, file.type);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');

                setProgress(progress);

                progress === 100 && getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                });
            },)
    }

    return (
        <div className='p-5 px-8 md:px-28'>
            <h2 className='text-[20px] text-center m-5'>
                Start <strong className='text-primary'>Uploading</strong>  File and <strong className='text-primary'>Sharing</strong>  It.
            </h2>
            <UploadForm uploadBtnClick={(file) => uploadFile(file)} progress={progress} />
        </div>
    )
}

export default Upload