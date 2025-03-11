import { Grid, makeStyles } from '@material-ui/core';
import { useField } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { SingleFileUploadWithProgress } from './SingleFileUploadWithProgress';
import { UploadError } from './UploadError';
import Image from "next/image";

let currentId = 0;

function getNewId() {
    // we could use a fancier solution instead of a sequential ID :)
    return ++currentId;
}

export interface UploadableFile {
    // id was added after the video being released to fix a bug
    // Video with the bug -> https://youtube-2021-feb-multiple-file-upload-formik-bmvantunes.vercel.app/bug-report-SMC-Alpha-thank-you.mov
    // Thank you for the bug report SMC Alpha - https://www.youtube.com/channel/UC9C4AlREWdLoKbiLNiZ7XEA
    id: number;
    file: File;
    errors: FileError[];
    url?: string;
}

const useStyles = makeStyles((theme) => ({
    dropzone: {
        border: `2px dashed ${theme.palette.primary.main}`,
        borderRadius: theme.shape.borderRadius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.background.default,
        height: theme.spacing(10),
        outline: 'none',
    },
}));

export function MultipleImageUploadField({ name }: { name: string }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, __, helpers] = useField(name);
    const classes = useStyles();

    const [files, setFiles] = useState<UploadableFile[]>([]);
    const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
        const mappedAcc = accFiles.map((file) => ({ file, errors: [], id: getNewId(),url: URL.createObjectURL(file) }));
        const mappedRej = rejFiles.map((r) => ({...r, errors:[...r.errors], id: getNewId() })); //2nd Bug
        setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej]);
    }, []);

    useEffect(() => {
         helpers.setValue(files).then(r => console.log("set Value Result ",r));
        // helpers.setTouched(true);
    }, [files]);

    function onUpload(file: File, url: string) {
        setFiles((curr) =>
            curr.map((fw) => {
                if (fw.file === file) {
                    return { ...fw, url };
                }
                return fw;
            })
        );
    }

    function onDelete(file: File) {
        setFiles((curr) => curr.filter((fw) => fw.file !== file));
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept:{
            'image/*':[],//Bug Discovered
        },
        maxSize: 2000 * 1024, // 2MB
    });

    return (
        <React.Fragment >

            <Grid item>
                <div {...getRootProps({ className: classes.dropzone })}>
                    <input {...getInputProps()} />
                    <p>Drag and drop some files here, or click to select files</p>
                </div>
            </Grid>
            <Grid style={{display:'flex',marginTop:4, gap:5}} direction={'row'} spacing={2} item>
                {files && files.map(fw=><Image key={fw.id} src={fw.url as string} alt={'preview'} className={'rounded-md px-2 py-2 border-2 border-blue-900'} width={100} height={100}></Image>)}

            </Grid>
            {files.map((fileWrapper) => (
                <Grid item key={fileWrapper.id}>
                    {fileWrapper.errors.length ? (
                        <UploadError
                            file={fileWrapper.file}
                            errors={fileWrapper.errors}
                            onDelete={onDelete}
                        />
                    ) : (
                        <SingleFileUploadWithProgress
                            onDelete={onDelete}
                            onUpload={onUpload}
                            file={fileWrapper.file}
                        />
                    )}
                </Grid>

            ))}


        </React.Fragment>
    );
}