"use client"
import React, { useEffect, useState } from 'react'
import UploadForm from './_components/UploadForm'
import CompleteCheck from './_components/CompleteCheck'
import { app } from '../../../../utils/firebaseConfig'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useUser } from '@clerk/nextjs'
import generateRandomString from '../../../../utils/generateRandomString'

const Upload = () => {

    const { user } = useUser();

    const [progress, setProgress] = useState();
    const [uploadCompleted, setUploadCompeleted] = useState(false);

    const storage = getStorage(app);
    const db = getFirestore(app);

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
                    saveInfo(file, downloadURL);
                });
            },)
    }

    const saveInfo = async (file, fileUrl) => {
        const documentId = generateRandomString().toString();

        await setDoc(doc(db, "uploadedFile", documentId), {
            id: documentId,
            fileName: file?.name,
            fileSize: file?.size,
            fileType: file?.type,
            fileUrl: fileUrl,
            userEmail: user?.primaryEmailAddress.emailAddress,
            userName: user?.fullName,
            password: '',
            shortUrl: process.env.NEXT_PUBLIC_BASE_URL + generateRandomString()
        });
    }

    useEffect(() => {
        progress === 100 && setTimeout(() => {
            setUploadCompeleted(true)
        }, 2000);
    }, [progress == 100]);

    // useEffect(() => {
    //     uploadCompleted && setTimeout(() => {
    //         setUploadCompeleted(false);
    //         window.location.reload();
    //     }, 2000);
    // }, [uploadCompleted === true])

    return (
        <div className='p-5 px-8 md:px-28'>
            {!uploadCompleted ? (
                <div>
                    <h2 className='text-[20px] text-center m-5'>
                        Start <strong className='text-primary'>Uploading</strong>  File and <strong className='text-primary'>Sharing</strong>  It.
                    </h2>
                    <UploadForm uploadBtnClick={(file) => uploadFile(file)} progress={progress} />
                </div>
            ) : (
                <CompleteCheck />
            )}
        </div>
    )
}

export default Upload