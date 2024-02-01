
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SkeletonStory from "../../Skeletons/SkeletonStory";
import CardStory from "./CardStory";
import NoStories from "./NoStories";
import Pagination from "./Pagination";
import "./Stories.css"

import { useNavigate } from "react-router-dom"
import api from "../../../util/api";
import { Helmet } from 'react-helmet';
const Stories = () => {

  const search = useLocation().search
  const searchKey = new URLSearchParams(search).get('search')
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);


  useEffect(() => {
    const getStories = async () => {

      setLoading(true)
      try {

        const { data } = await api.get(`/story/getAllStories?search=${searchKey || ""}&page=${page}&limit=15`)

        if (searchKey) {
          navigate({
            pathname: '/blogs',
            search: `?search=${searchKey}${page > 1 ? `&page=${page}` : ""}`,
          });
        }
        else {
          navigate({
            pathname: '/blogs',
            search: `${page > 1 ? `page=${page}` : ""}`,
          });


        }
        setStories(data.data)
        setPages(data.pages)

        setLoading(false)
      }
      catch (error) {
        setLoading(true)
      }
    }
    getStories()
  }, [setLoading, search, page, navigate])


  useEffect(() => {
    setPage(1)
  }, [searchKey])


  return (
    <div className="max-w-[1640px] mx-auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>AI Teachers | Blogs</title>
      </Helmet>
      {loading ?

        <div className="skeleton_emp">
          {
            [...Array(6)].map(() => {
              return (
                // theme dark :> default : light
                <SkeletonStory key={uuidv4()} />
              )
            })}
        </div>

        :
        <div className="mx-3 md:mx-32">
          <div className="">
            <h1 className='mb-4 text-4xl tracking-tight font-extrabold text-center text-primary'>
              Blogs
            </h1>

            <p className=' text-secondary hidden md:block text-sm md:text-lg text-justify'>
              Welcome to the Teach Assist AI Blog, your go-to online resource for staying informed about the latest platform updates, helpful tips and tricks, and intriguing insights. As educator, we understand the importance of continuous learning and staying up to date with the latest trends in education technology. Our blog is designed to provide you with valuable resources, inspiration, and practical knowledge to enhance your teaching experience with AI teachers from Teach Assist AI. Whether you're seeking innovative ideas for lesson planning, strategies to promote student engagement with AI teachers, or guidance on utilizing AI in the classroom, our blog is here to support and inspire you on your educational journey. Stay connected, explore our articles, and discover how Teach Assist AI can transform your teaching practice.
            </p>
          </div>
          <div className="story-card-wrapper">
            {stories.length !== 0 ?
              stories?.map((story) => {
                return (
                  <CardStory key={uuidv4()} story={story} />
                )
              }) : <NoStories />
            }
            {/* <img className="bg-planet-svg" src="planet.svg" alt="planet" />
            <img className="bg-planet2-svg" src="planet2.svg" alt="planet" />
            <img className="bg-planet3-svg" src="planet3.svg" alt="planet" /> */}

          </div>

          <Pagination page={page} pages={pages} changePage={setPage} />

        </div>

      }
      <br />
    </div>

  )

};

export default Stories;