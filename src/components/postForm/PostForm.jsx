import React, {useCallback} from 'react'
import {Button,Input,Select,RTE} from '../../components/index'
import {useForm } from 'react-hook-form'
import dataService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { data } from 'autoprefixer'
function PostForm({post}) {
  const { register, handleSubmit, watch, setValue, control, getValues}=useForm({
    defaultValues:{
      title: post?.title||"",    
      slug: post?.slug||"",    
      content: post?.content||"",    
      status: post?.status||"active"    
    }
  })
  const navigate=useNavigate()
  const userData=useSelector((state)=>state.auth.userData)
  console.log("UserData in PostForm : ", userData);
  console.log("Userid in PostForm : ", userData.userData.$id);

  const submit = async (data) => {
    console.log("submit is working");
  
    // Check if the post exists for editing, otherwise create a new one
    if (post) {
      console.log("post is getting edited");
      const file = data.image && data.image[0] ? await dataService.uploadFile(data.image[0]) : null;
      
      if (file) {
        await dataService.deleteFile(post.featuredImage);
      }
  
      const dbpost = await dataService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
  
      if (dbpost) {
        navigate(`/post/${dbpost.$id}`);
      }
    } else {
      console.log("post is getting created");
      
      if (data.image && data.image[0]) {
        const file = await dataService.uploadFile(data.image[0]);
        if (file) {
          data.featuredImage = file.$id;
        }
      }
  
      const dbPost = await dataService.createPost({
        ...data,
        userID: userData.userData.$id,
      });
  
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
  };
  

  const transformSlug=useCallback((value)=>{
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with dashes
        .replace(/-+/g, '-'); // Replace multiple dashes with a single dash
    }

      return '';
  },[])

  React.useEffect(()=>{
    const subscription = watch((value,{name})=>{
      if(name==='title'){
        setValue('slug',transformSlug(value.title),{shouldValidate:true})
      }
    })
    return ()=>{
      subscription.unsubscribe()
    }
  },[watch,transformSlug,setValue])
  return (
    <div>
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", transformSlug(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={dataService.getImagePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    </div>
  )
}

export default PostForm