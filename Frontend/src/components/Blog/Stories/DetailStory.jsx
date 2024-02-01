import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import "./DetailStory.css"
import Loader from '../../commons/Loader';
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import { FaRegComment } from 'react-icons/fa'
import { BsBookmarkPlus, BsThreeDots, BsBookmarkFill } from 'react-icons/bs'

// import CommentSidebar from '../Comment/CommentSidebar';
import api from '../../../util/api';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import { backend_resourse } from '../../../util/variables';
import { toast } from 'react-toastify';

const DetailStory = () => {

  const { user } = useContext(UserContext);

  const [likeStatus, setLikeStatus] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [activeUser, setActiveUser] = useState({})
  const [story, setStory] = useState({})
  const [storyLikeUser, setStoryLikeUser] = useState([])
  const [sidebarShowStatus, setSidebarShowStatus] = useState(false)
  const [loading, setLoading] = useState(true)
  const slug = useParams().slug
  const [storyReadListStatus, setStoryReadListStatus] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {

    const getDetailStory = async () => {
      setLoading(true)
      var activeUser = {}
      try {
        const { data } = await axios.get("/auth/private", {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("teachai_toke")}`,
          },
        });
        activeUser = data.user

        setActiveUser(activeUser)

      }
      catch (error) {
        setActiveUser({})
      }

      try {
        const { data } = await api.post(`/story/${slug}`, { activeUser })
        setStory(data.data)
        setLikeStatus(data.likeStatus)
        setLikeCount(data.data.likeCount)
        setStoryLikeUser(data.data.likes)
        setLoading(false)

        const story_id = data.data._id;

        if (activeUser?.readList) {

          if (!activeUser?.readList?.includes(story_id)) {
            setStoryReadListStatus(false)
          }
          else {
            setStoryReadListStatus(true)
          }

        }

      }
      catch (error) {
        setStory({})
        console.log('Error: ', error);
        navigate("/not-found")
      }

    }
    getDetailStory();

  }, [slug, setLoading])



  const handleLike = async () => {
    setTimeout(() => {
      setLikeStatus(!likeStatus)
    }, 1500)

    try {
      const { data } = await axios.post(`/story/${slug}/like`, { activeUser }, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })

      setLikeCount(data.data.likeCount)
      setStoryLikeUser(data.data.likes)

    }
    catch (error) {
      setStory({})
      localStorage.removeItem("authToken")
      navigate("/")
    }

  }

  const handleDelete = async () => {

    if (window.confirm("Do you want to delete this post")) {

      try {
        await api.delete(`/story/${slug}/delete`)
        toast("Deleted Post Successfully")
        
        setTimeout(() => {
          navigate("/blogs")
        }, 2000);

      }
      catch (error) {
        alert('error')
        console.log(error)
      }

    }

  }


  const editDate = (createdAt) => {

    const d = new Date(createdAt)
      ;
    var datestring = d.toLocaleString('eng', { month: 'long' }).substring(0, 3) + " " + d.getDate()
    return datestring
  }

  const addStoryToReadList = async () => {

    try {

      const { data } = await axios.post(`/user/${slug}/addStoryToReadList`, { activeUser }, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })

      setStoryReadListStatus(data.status)

      document.getElementById("readListLength").textContent = data.user?.readListLength
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {
        loading ? <Loader /> :
          <>

            <div className='Inclusive-detailStory-page'>

              <div className="top_detail_wrapper">
                {/* <Link to={'/'} >
                  <FiArrowLeft />
                </Link> */}
                <h5>{story.title}</h5>

                <div className='story-general-info'>

                  <ul>
                    {/* {story.author &&
                      <li className='story-author-info'>
                        <img src={`http://localhost:4000/userPhotos/${story.author.photo}`} alt={story.author.username} />
                        <span className='story-author-username'>{story.author.username}  </span>
                      </li>
                    } */}
                    <li className='story-createdAt'>
                      {
                        editDate(story.createdAt)
                      }
                    </li>
                    <b>-</b>

                    <li className='story-readtime'>
                      {story.readtime} min read
                    </li>

                  </ul>

                  {/* {
                    !activeUser?.username &&
                    <div className='comment-info-wrap'>

                      <i onClick={(prev) => {
                        setSidebarShowStatus(!sidebarShowStatus)
                      }}>
                        <FaRegComment />
                      </i>


                      <b className='commentCount'>{story.commentCount}</b>

                    </div>
                  } */}

                  {user && user?.role === 'admin' ?
                    <div className="top_story_transactions">
                      <Link className='editStoryLink' to={`/admin/dashboard/story/${story.slug}/edit`}>
                        <FiEdit />
                      </Link>
                      <span className='deleteStoryLink' onClick={handleDelete}>
                        <RiDeleteBin6Line />
                      </span>
                    </div> : null
                  }
                </div>

              </div>

              {/* <div className="CommentFieldEmp">

                <CommentSidebar slug={slug} sidebarShowStatus={sidebarShowStatus} setSidebarShowStatus={setSidebarShowStatus}
                  activeUser={activeUser}
                />

              </div> */}

              <div className='story-content' >

                <div className="story-banner-img">
                  <img src={`${backend_resourse}/storyImages/${story.image}`} alt={story.title} />
                </div>

                <div className=' prose lg:prose-xl' style={{ maxWidth: '100%'}}>
                  <div style={{ width: "100%"}} dangerouslySetInnerHTML={{ __html: (story.content) }}>
                  </div>
                </div>

              </div>

              {
                activeUser?.username &&
                <div className='fixed-story-options'>

                  <ul>
                    <li>

                      <i onClick={handleLike} >

                        {likeStatus ? <FaHeart color="#0063a5" /> :
                          <FaRegHeart />
                        }
                      </i>

                      <b className='likecount'
                        style={likeStatus ? { color: "#0063a5" } : { color: "rgb(99, 99, 99)" }}
                      >  {likeCount}
                      </b>

                    </li>


                    <li>
                      <i onClick={(prev) => {
                        setSidebarShowStatus(!sidebarShowStatus)
                      }}>
                        <FaRegComment />
                      </i>

                      <b className='commentCount'>{story.commentCount}</b>

                    </li>

                  </ul>

                  <ul>
                    <li>
                      <i onClick={addStoryToReadList}>

                        {storyReadListStatus ? <BsBookmarkFill color='#0205b1' /> :
                          <BsBookmarkPlus />
                        }
                      </i>
                    </li>

                    <li className='BsThreeDots_opt'>
                      <i  >
                        <BsThreeDots />
                      </i>

                      {user &&
                        story.author._id === user._id ?
                        <div className="delete_or_edit_story  ">
                          <Link className='editStoryLink' to={`/admin/dashboard/story/${story.slug}/edit`}>
                            <p>Edit Story</p>
                          </Link>
                          <div className='deleteStoryLink' onClick={handleDelete}>
                            <p>Delete Story</p>
                          </div>
                        </div> : null
                      }

                    </li>

                  </ul>

                </div>
              }

            </div>
          </>
      }
    </>
  )
}

export default DetailStory;
