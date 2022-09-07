import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import Avatar from './Avatar';
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ADD_POST, ADD_SUBSEENIT } from '../graphql/mutations';
import client from '../apollo-client';
import { GET_SUBSEENIT_BY_TOPIC, GET_ALL_POSTS } from '../graphql/queries';
import toast from 'react-hot-toast';


type FormData = {
  postTitle: string
  postBody: string
  postImage: string
  subseenit: string
}

type Props = {
  subseenit?: string
}

function PostBox({ subseenit } : Props) {
    const { data: session } = useSession()
    const [addPost] = useMutation(ADD_POST, {
      refetchQueries: [
        GET_ALL_POSTS,
        'getPostList'
      ],
    });
    const [addSubseenit] = useMutation(ADD_SUBSEENIT);

    const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);
    const {
      register,
      setValue,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<FormData>()

    const onSubmit = handleSubmit(async (formData) => {
      console.log(formData)
      const notification = toast.loading('Creating new post...')

      try {
        //query for the subreddit topic...
        const { data: { getSubseenitListByTopic } } = await client.query({
          query: GET_SUBSEENIT_BY_TOPIC,
          variables: {
            topic: subseenit || formData.subseenit
          }
        })

        const subseenitExists = getSubseenitListByTopic.length > 0;

        if (!subseenitExists) {
          //create subseenit...
          console.log('Subseen it is new! -> creating a new Subseenit!')

          const { data: { insertSubseenit: newSubseenit } } = await addSubseenit({
            variables: {
              topic: formData.subseenit
            }
          })

          console.log('Creating post....', formData);

          const image = formData.postImage || ''

          const { data: { insertPost: newPost } } = await addPost({
            variables: {
              body: formData.postBody,
              image: image,
              subseenit_id: newSubseenit.id,
              title: formData.postTitle,
              username: session?.user?.name,
            }
          })

          console.log('New post added', newPost);

        } else {
          // use existing subseenit...
          console.log('Using exiting subseenit');
          console.log(getSubseenitListByTopic)

          const image = formData.postImage || ''

          const { data : {insertPost: newPost} } = await addPost({
            variables: {
              body: formData.postBody,
              image: image,
              subseenit_id: getSubseenitListByTopic[0].id,
              title: formData.postTitle,
              username: session?.user?.name,
            }
          })

          console.log('New post added', newPost);
        }
      
      // after the post has been added... reset fields
      setValue('postBody','')
      setValue('postImage','')
      setValue('postTitle','')
      setValue('subseenit','')

      toast.success('New Post Created!', {
        id: notification //for updating the toast already created 
      })

      } catch (error) {
        toast.error('Whoops something went wrong!', {
          id: notification
        })
      }
    })

  return (
    <form onSubmit={onSubmit} className='sticky top-16 z-50 border border-gray-300 bg-white p-2'>
        <div className='flex items-center space-x-3'>
            <Avatar />

            <input 
                {...register('postTitle', {required: true})}
                disabled={!session} 
                className='flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none' 
                type='text' 
                placeholder={session ? subseenit ? `Create a post in r/${subseenit}`:'Create a post by entering a title!': 'Sign in to post'}
            />

            <PhotographIcon
            onClick={()=> setImageBoxOpen(!imageBoxOpen)} 
            className={`h-6 text-gray-300 cursor-pointer ${imageBoxOpen && 'text-blue-300'}`} />
            <LinkIcon className='h-6 text-gray-300'/>
        </div>

        {!!watch('postTitle') //if truthy or falsy (double !! converts value to boolean)
        && 
        (<div className='flex flex-col py-2'>
          {/* Body */}
          <div className='flex items-center px-2'>
            <p className='min-w-[90px]'>Body</p>
            <input 
            className = 'm-2 flex-1 bg-blue-50 p-2 outline-none'
            {...register('postBody')} 
            type='text' 
            placeholder='Text (optional)' />
          </div>
          
          {/* Subseenit */}
          {!subseenit && (
          <div className='flex items-center px-2'>
            <p className='min-w-[90px]'>Subseenit:</p>
            <input 
            className = 'm-2 flex-1 bg-blue-50 p-2 outline-none'
            {...register('subseenit', {required: true})} 
            type='text' 
            placeholder='i.e. cats' />
          </div>)}

          {imageBoxOpen && (
            <div className='flex items-center px-2'>
              <p className='min-w-[90px]'>Image URL:</p>
              <input 
              className = 'm-2 flex-1 bg-blue-50 p-2 outline-none'
              {...register('postImage')} 
              type='text' 
              placeholder='Optional...' />
          </div>
          )}

          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className='space-y-2 p-2 text-red-500'>
              {errors.postTitle?.type === 'required' && (
                <p>-A Post Title is required</p>
              )}

              {errors.subseenit?.type === 'required' && (
                <p>-A Subseenit is required</p>
              )}
            </div>
          )}

          {!!watch('postTitle') && (
            <button
              type='submit'
              className='w-full rounded-full bg-blue-400 text-white'
            >
                Create Post
            </button>
          )}
          </div>)}
    </form>
  )
}

export default PostBox