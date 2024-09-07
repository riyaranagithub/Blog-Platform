import React, {useCallback} from 'react'
import {Button,Input,Select,RTE} from '../../components/index'
import {useForm } from 'react-hook-form'
import dataService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
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

  
  const submit =async(data)=>{
    if(post){
      console.log("chala")
      const file=data.image[0]? dataService.uploadFile(data.image[0]):null
      if(file){
        dataService.deleteFile(post.featuredImage)
      }
      const dbpost = await dataService.updatePost(
        post.$id,{
          ...data,
          featuredImage:file? file.$id :undefined
        }
      )
      if(dbpost){
        navigate(`/post/${dbpost.$id}`)
      }
      else {
        console.log("ho gya")
        const file =  await dataService.uploadFile(data.image[0]);
        if(file){
          const fieldId=file.$id
          data.featuredImage=fieldId
          console.log("Data before createPost : ", data);
          const dbPost=await dataService.createPost({
            ...data,
            userId:userData.$id
          })
          if(dbPost){
            navigate(`/post/${dbPost.$id}`)
          }

        }
      }
    }
  }

  const transformSlug=useCallback((value)=>{
    if(value && typeof value === 'string')
      return value.
      trim()
      .toLowerCase()
      .replace(/^[a-zA-Z\d\s]+/g,'-')
      .replace(/\s/g,'-')

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