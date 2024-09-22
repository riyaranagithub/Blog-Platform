import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, Select, RTE } from '../../components/index';
import { useForm } from 'react-hook-form';
import dataService from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) {
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const { register, handleSubmit, watch, setValue, control, getValues, reset } = useForm({
    defaultValues: {
      title: '',    
      slug: '',    
      content: '',    
      status: 'active'    
    }
  });

  // Fetch the image preview URL if a post exists
  useEffect(() => {
    if (post && post.featuredImage) {
      const fetchImagePreview = async () => {
        const imageUrl = await dataService.getImagePreview(post.featuredImage);
        setImagePreview(imageUrl); // Set the fetched image URL
      };
      fetchImagePreview();
    }
  }, [post]);

  // Function to transform title into a slug
  const transformSlug = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with dashes
        .replace(/-+/g, '-'); // Replace multiple dashes with a single dash
    }
    return '';
  }, []);

  // Populate form fields when post is loaded or updated
  useEffect(() => {
    if (post) {
      // Update form with post data, ensuring slug is generated from title if missing
      reset({
        title: post.title || '',
        slug: post.slug || transformSlug(post.title || ''),
        content: post.content || '',
        status: post.status || 'active',
      });
    }
  }, [post, reset, transformSlug]);

  const submit = async (data) => {
    if (post) {
      const file = data.image && data.image[0] ? await dataService.uploadFile(data.image[0]) : null;
      const dbPost = await dataService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
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

  // Automatically update slug based on title changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', transformSlug(value.title), { shouldValidate: true });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setValue, transformSlug]);

  return (
    <div>
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register('title', { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register('slug', { required: true })}
            onInput={(e) => {
              setValue('slug', transformSlug(e.currentTarget.value), { shouldValidate: true });
            }}
          />
          <RTE label="Content :" name="content" control={control} defaultValue={getValues('content')} />
        </div>
        <div className="w-1/3 px-2">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register('image', { required: !post })}
          />
          {post && imagePreview && (
            <div className="w-full mb-4">
              <img
                src={imagePreview}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={['active', 'inactive']}
            label="Status"
            className="mb-4"
            {...register('status', { required: true })}
          />
          <Button type="submit" bgColor={post ? 'bg-green-500' : undefined} className="w-full">
            {post ? 'Update' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
