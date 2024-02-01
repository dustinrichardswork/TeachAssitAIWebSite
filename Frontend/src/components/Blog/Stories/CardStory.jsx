import React from 'react';
import { Link } from 'react-router-dom';
import { backend_resourse } from '../../../util/variables';

const Story = ({ story }) => {

    const editDate = (createdAt) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const d = new Date(createdAt);
        var datestring = d.getDate() + " " + monthNames[d.getMonth()] + " ," + d.getFullYear()
        return datestring
    }

    function truncateString(str, limit) {
        if (str.length > limit) {
            return str.slice(0, limit) + "...";
        }
        return str;
    }

    return (

        <div className="story-card">
            <Link to={`/blog/${story.slug}`} className="story-link">

                <img className=" story-image" src={`${backend_resourse}/storyImages/${story.image}`} alt={story.title} />
                <div className="story-content-wrapper">

                    <h5 className=" text-xl md:text-2xl font-bold">

                        {story.title.length > 76 ? truncateString(story.title, 69) : story.title

                        }
                    </h5>


                    <p className="text-lg" dangerouslySetInnerHTML={{ __html: truncateString(story.content, 73) }}>
                    </p>
                    <p className="story-createdAt">{editDate(story.createdAt)}
                    </p>
                </div>
            </Link>
        </div>

    )
}

export default Story;
